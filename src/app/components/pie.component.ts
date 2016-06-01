/**
 * Created by Jeffrey on 5/14/2016.
 */



import { Directive, Input, Output, AfterViewInit, OnInit, ElementRef, Renderer, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Candidate } from '../models/candidate';
import * as d3 from 'd3';
import { Selection } from 'd3';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { mutable } from '../common/mutability';

@Directive( {
  selector: 'rcv-pie'
} )
export class PieComponent implements OnInit, AfterViewInit {

  @Input() cands$: Observable<Candidate[]>;
  @Input() totalVotes$: Observable<number>;
  @Output() removals$: Subject<string[]> = BehaviorSubject.create();
  @Output() hoverCand$: Subject<string> = BehaviorSubject.create();

  private height;
  private width;

  private arc;
  private innerCircleArc;
  private radius = () => Math.min( this.width, this.height ) / 5;
    //outer circle ratios, change these ratios to change the size of the outer and inner circle
  private outerCirInnerRadius = 0.35;
  private outerCirOuterRadius = 2.25;
  private svg: Selection<any>;
  private g: any;
  private screenWidth$: Subject<number> = BehaviorSubject.create();

  @HostListener( "window:resize" )
  private onResize(event) {
    this.width = this.element.nativeElement.clientWidth;
    this.height = this.element.nativeElement.ownerDocument.body.clientHeight - 100;

    this.screenWidth$.next( this.width );
  }


  constructor(private element: ElementRef, private renderer: Renderer) {

  }


  ngOnInit() {

    /**
     * We want to redraw/update the graphic every time the data changes, OR the size of the screen changes.
     * Observable.combineLatest says: "Anytime either of these changes, fire a new event with the latest value of each"
     * So, we subscribe to that and run our viz update logic each time it fires.
     */
    Observable.combineLatest( this.cands$, this.screenWidth$, this.totalVotes$ ).subscribe(
        ([cands, width, totalVotes]) => {
          console.log( 'WIDTH: ' + width );
          this.svg.attr( 'width', width ); // update the screen width - if it hasn't changed, this has no effect
          this.g.attr( "transform", `translate(${this.width / 2 },${this.height / 2})` );

          let actives       = mutable( cands ).filter( cand => cand.isActive ), // don't include eliminated candidates
              tot           = actives.reduce( (sum, cand) => sum + cand.score, 0 ), //the total # of active votes
              numVotes      = [ tot, totalVotes - tot ],
              colorInner    = d3.scale.category10(),
              percentFormat = d3.format( ".0%" ),
              outerPie      = d3.layout.pie().value( d => d.isActive ? d.score : 0 ), // Jeff/donald disregard this warning - inaccuracy in the typedef
              innerPie      = d3.layout.pie(),
              angle         = (d) => {
                let i = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                return i > 90 ? i - 180 : i;
              };

          //A single selection for each candidate; bind every elements to this single selection
          let candGs      = this.g.selectAll( '.cand-g' ).data( outerPie( cands ), d => d.data.id ),
              candGEnters = candGs.enter(), // elements we're drawing for the first time
              candGExits  = candGs.exit(); // elements that are being removed

          let enterGs = candGEnters
              .append( 'g' ).attr( 'class', 'cand-g' );

          /*JEFF: take a close look at this refactor. The biggest thing to note is that, rather than creating a separate selection
           * for every type of element we want to add for each candidate, we add a SINGLE selection for each candidate, bind that
           * selection to a g, and then add append the necessary elements for each candidate to "their" g. This makes it more
           * readable and easier to maintain, and makes it trivial to move / remove or otherwise alter all the elements for a candidate
           * at once (which is only somewhat helpful for us here, but in other use-cases is hugely helpful)
           *
           * */
          enterGs.append( "path" )
                 .attr( 'class', 'arc' )
                 .attr( "d", this.arc )
                 .attr( "fill", d => d.data.color )
                 .each( d => outerAngles[ d.data.id ] = d ) //stores the current outerAngles in ._current //
                 .on( "click", d => this.removals$.next( d.data.id ) );

          enterGs // Jeff: we can filter here so those labels are never placed (see comment on https://github.com/RCVSim/client/commit/9d5042d72c86f0e1da9e38737d8bfdd8abf8d703#diff-1b3d57e760bc62d6198570b6b2cc9ad4R110
              .append( "text" )
              .attr( "class", "txt" )
              .attr( "dy", ".35em" )
              .attr( "text-anchor", "middle" )
              .attr( "transform", d => {
                d.outerRadius = this.radius() * this.outerCirOuterRadius - this.outerCirOuterRadius * 0.2;
                d.innerRadius = this.radius() * this.outerCirInnerRadius - this.outerCirInnerRadius * 0.2;
                return `translate(${this.arc.centroid( d )}) rotate(${angle( d )})`;
              } )
              .style( "fill", "white" )
              .text( d => percentFormat( d.value / tot ) )
              .on( "click", d => this.removals$.next( d.data.id ) );

          //Draws inner circle
          let innerCircle        = this.g.selectAll( '.innerCircle-g' ).data( innerPie( numVotes ) ),
              innerCircleGEnters = innerCircle.enter(),
              innerCircleGExits  = innerCircle.exit();

          let innerCircleGs = innerCircleGEnters.append( 'g' ).attr( 'class', 'innerCircle-g' );

          //Draws inner arcs
          innerCircleGs.append( "path" )
                       .attr( "class", "innerCircleArc" )
                       .attr( "d", this.innerCircleArc )
                       .attr( "fill", d => colorInner( d.data ) )
                       .each( d => {
                         let which       = d.value < totalVotes / 2 ? 'active' : 'exhausted';
                         innerAngles[ which ] = d;
                       });//stores current outerAngles as ._currentAng

          //Draws Inner Circle Labels
          innerCircleGs
              .append( "text" )
              .attr( "class", "innerTxt" )
              .attr( "dy", "-0.10em" )
              .attr( "text-anchor", "middle" )
              .attr( "transform", d => {
                d.outerRadius = this.radius() * this.outerCirInnerRadius;
                return `translate(${this.innerCircleArc.centroid( d )}) rotate(${0})`;
              } )
              .style( "fill", "white" )
              .style( "font-size", "18px" )
              .text( d => percentFormat( d.value / totalVotes ) );

          let arcs              = candGs.select( '.arc' ),
              scoreLabels       = candGs.select( '.txt' ),
              innerCircleArcs   = innerCircle.select( '.innerCircleArc' ),
              innerCircleLabels = innerCircle.select( '.innerTxt' );

          //Removes a eliminated candidate from our visualization elements
          let setAllGsOpacity = (value) => {
            //Little Hack; filter the ones that are too small to see to opacity 0, else their opacity is the value
            arcs.filter( d => !d.data.eliminated ).style( "opacity", value );
            scoreLabels.filter( d => d.data.eliminated || d.endAngle - d.startAngle < .2 ).style( "opacity", 0 );
            scoreLabels.filter( d => !d.data.eliminated && d.endAngle - d.startAngle > .2 ).style( "opacity", value );
            innerCircleArcs.style( "opacity", value );
          };

          setAllGsOpacity( 1 ); // set visible elements' opacity to 1

          arcs.on( "mouseover", d => {
            let opacityValue = 0.3;

            setAllGsOpacity( opacityValue ); // set every visible elements' opacity to this opacityValue

            arcs.filter( t => t.data.id == d.data.id ).style( "opacity", 1 ); //set this arc's opacity to 1
            scoreLabels.filter( t => t.data.id == d.data.id ).style( "opacity", 1 ); //set this scoreLabel's opacity to 1

            this.hoverCand$.next( d.data.id ); //Send a string to hoverCand$ stream
          } )
              .on( "mouseout", () => {
                setAllGsOpacity( 1 ); //normalize every visible elements' opacity
              } );

          //Updates the outerCircle with one less candidate
          arcs
              .transition().duration( 650 )
              .attrTween( "d", d => {
                let interpolate = d3.interpolate( outerAngles[d.data.id], d );
                outerAngles[ d.data.id ] = interpolate( 0 );
                return t => this.arc( interpolate( t ) )
              } );

          //Updates the outer circle labels with one less candidate
          scoreLabels
              .transition().duration( 650 )
              .attr( "transform", d => {
                d.outerRadius = this.radius() * this.outerCirOuterRadius - this.outerCirOuterRadius * 0.2;
                d.innerRadius = this.radius() * this.outerCirInnerRadius - this.outerCirInnerRadius * 0.2;
                return `translate(${this.arc.centroid( d )}) rotate(${angle( d )})`;
              } )
              .text( d => percentFormat( d.value / tot ) );

          //Updates the inner Circle with one less candidate
          innerCircleArcs
              .on( "mouseover", d => {
                  innerCircleLabels.filter( d => d.endAngle - d.startAngle > .2 )
                      .transition()
                      .duration(350)
                      .style( "opacity", 1);
              })
              .on ( "mouseout", d => {
                  innerCircleLabels.transition()
                      .duration(650)
                      .style( "opacity", 0);
              })
              .transition().duration( 650 )
              .attrTween( "d", d => {
                let which = d.value < totalVotes / 2 ? 'active' : 'exhausted',
                    interpolate = d3.interpolate( innerAngles[which], d );
                innerAngles[ which ] = interpolate( 0 );
                return t => this.innerCircleArc( interpolate( t ) )
              } );

          //Updates the inner circle labels with one less candidate.
          innerCircleLabels
              .style( "opacity", 0)
              .on( "mouseover", d => {
                  innerCircleLabels.filter( d => d.endAngle - d.startAngle > .2 )
                      .transition()
                      .duration(350)
                      .style( "opacity", 1);
              })
              .on ( "mouseout", d => {
                  innerCircleLabels.transition()
                      .duration(650)
                      .style( "opacity", 0);
              })
              .attr( "transform", d => {
                d.outerRadius = this.radius() * this.outerCirInnerRadius;
                return `translate(${this.innerCircleArc.centroid( d )}) rotate(${0})`;
              } )
              .text( d => percentFormat( d.value / totalVotes ) );

        } );

  }

  ngAfterViewInit() {
    /**
     * This only runs once, creating
     */

    this.width = this.element.nativeElement.clientWidth;
    this.height = this.element.nativeElement.ownerDocument.body.clientHeight - 100;
    this.svg = d3.select( this.element.nativeElement )
                 .append( 'svg' )
                 .attr( 'width', `${this.width}` )
                 .attr( 'height', `${this.height}` );

    this.g = this.svg.append( 'g' )
                 .attr( "transform", `translate(${this.width / 2 },${this.height / 2})` );

    this.arc = d3.svg.arc()
                 .innerRadius( this.radius() * this.outerCirInnerRadius )
                 .outerRadius( this.radius() * this.outerCirOuterRadius );

    this.innerCircleArc = d3.svg.arc()
                            .innerRadius( 0 )
                            .outerRadius( this.radius() * this.outerCirInnerRadius );

    this.screenWidth$.next( this.width );
  }

}


const outerAngles: {[id: string]: any} = {};
const innerAngles = { 
  active: null,
  exhausted: null
};