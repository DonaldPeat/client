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
import { mutable } from '../models/mutability';

@Directive( {
  selector: 'rcv-pie'
} )
export class PieComponent implements OnInit, AfterViewInit {

  @Input() cands$: Observable<Candidate[]>;
  @Input() totalVotes$: Observable<number>;
  @Input() hoveredCand$: Observable<string>;
  @Output() removals$: Subject<string[]> = BehaviorSubject.create();
  @Output() candHovered$: Observable<string>;


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
  private candMouseOvers$: Subject<string> = BehaviorSubject.create();
  private candMouseOuts$: Subject<string> = BehaviorSubject.create();

  private outerAngles: {[id: string]: any} = {};

  @HostListener( "window:resize" )
  private onResize(event) {
    this.width = this.element.nativeElement.clientWidth;
    this.height = this.element.nativeElement.ownerDocument.body.clientHeight - 100;

    this.screenWidth$.next( this.width );
  }


  constructor(private element: ElementRef, private renderer: Renderer) {


    this.candHovered$ = this.candMouseOvers$.debounceTime(50);

    this.candHovered$.subscribe( x => {
      console.log( 'hov' );
      console.log( x )
    } )
  }


  ngOnInit() {



    /**
     * We want to redraw/update the graphic every time the data changes, OR the size of the screen changes.
     * Observable.combineLatest says: "Anytime either of these changes, fire a new event with the latest value of each"
     * So, we subscribe to that and run our viz update logic each time it fires.
     */
    Observable.combineLatest( this.cands$, this.screenWidth$, this.totalVotes$, this.hoveredCand$ ).subscribe(
        ([cands, width, totalVotes, hoveredCandidate]) => {
          console.log( 'WIDTH: ' + width );
          this.svg.attr( 'width', width ); // update the screen width - if it hasn't changed, this has no effect
          this.g.attr( "transform", `translate(${this.width / 2 },${this.height / 2})` );

          const actives       = mutable( cands ).filter( cand => !(cand.eliminated || cand.removed) ), // don't include eliminated candidates
                tot           = actives.reduce( (sum, cand) => sum + cand.score, 0 ), //the total # of active votes
                numVotes      = [ tot, totalVotes - tot ],
                colorInner    = d3.scale.category10(),
                percentFormat = d3.format( ".0%" ),
                outerPie      = d3.layout.pie().value( d => !(d.eliminated || d.removed) ? d.score : 0 ), // Jeff/donald disregard this warning - inaccuracy in the typedef
                innerPie      = d3.layout.pie(),
                angle         = (d) => {
                  let i = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                  return i > 90 ? i - 180 : i;
                },
                overFxn       = ()=> {
                  /*This */
                  const over$ = this.candMouseOvers$;
                  return d => {
                    //NOTE, we DO NOT have lexically-scoped this here!!  
                    over$.next( d.data.id ); //Send a string to candMouseOvers$ stream
                  }
                },
                outFxn        = ()=> {
                  const out$ = this.candMouseOvers$;
                  return d => {
                    out$.next('')
                  }
                },

                arcTween = (id)=> {
                  const _cId = id;
                };


          //A single selection for each candidate; bind every elements to this single selection
          let candGs      = this.g.selectAll( '.cand-g' ).data( outerPie( cands ), d => d.data.id ),
              candGEnters = candGs.enter(), // elements we're drawing for the first time
              candGExits  = candGs.exit(); // elements that are being removed

          let enterGs = candGEnters
              .append( 'g' ).attr( 'class', 'cand-g' );

          enterGs.append( "path" )
                 .attr( 'class', 'arc' )
                 .attr( "d", this.arc )
                 .attr( "fill", d => d.data.color )
                 .each( d => this.outerAngles[ d.data.id ] = d ) //stores the current outerAngles in ._current //
                 .on( "click", d => this.removals$.next( d.data.id ) )
                 .on( "mouseover", overFxn() )
                 .on( "mouseout", outFxn() );

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
              .text( d => percentFormat( d.value / tot ) )
              .on( "click", d => this.removals$.next( d.data.id ) );

          let arcs = candGs.select( '.arc' ),
              scoreLabels = candGs.select( '.txt' );

          arcs.transition().duration( 650 )
              .attrTween( "d", d => {
                let interpolate = d3.interpolate( this.outerAngles[ d.data.id ], d );
                this.outerAngles[ d.data.id ] = interpolate( 0 );
                return t => this.arc( interpolate( t ) )
              } ).style( 'opacity', (d)=> {
            if(hoveredCandidate && hoveredCandidate !== d.data.id) {
              return 0;
            } else return 1;
          } );



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
                         let which = d.value < totalVotes / 2 ? 'active' : 'exhausted';
                         innerAngles[ which ] = d;
                       } );//stores current outerAngles as ._currentAng

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

          let innerCircleArcs   = innerCircle.select( '.innerCircleArc' ),
              innerCircleLabels = innerCircle.select( '.innerTxt' );



/* Jeff, I get what you were going for here, and I support it 100%: In general, any time you find yourself writing the same code
  over and over again, your instinct to wrap it in a function and reuse it is spot on. However, when doing that you've got to be
  make sure that that function only does what you expect it to, based on the name. Also (sortof implied), it's important that functions
  - especially little utility ones like this - do ONE THING: It be more lines of code to break it into several functions and call
  them separately, but (unless you're 100% sure that they'll always need to be done together) those are good extra lines of code.
   */

          let hideEliminatedCandidates = (value) => {
            //Little Hack; filter the ones that are too small to see to opacity 0, else their opacity is the value
            arcs.filter( d => !d.data.eliminated ).style( "opacity", value );
            innerCircleArcs.style( "opacity", value );
          };

          //Updates the outer circle labels with one less candidate
          scoreLabels
              .transition().duration( 150 )
              .attr( "transform", d => {
                d.outerRadius = this.radius() * this.outerCirOuterRadius - this.outerCirOuterRadius * 0.2;
                d.innerRadius = this.radius() * this.outerCirInnerRadius - this.outerCirInnerRadius * 0.2;
                return `translate(${this.arc.centroid( d )}) rotate(${angle( d )})`;
              } )
              .text( d => percentFormat( d.value / tot ) );

          scoreLabels.filter( d => d.data.eliminated || d.endAngle - d.startAngle < .2 ).style( "opacity", 0 );


          //Updates the inner Circle with one less candidate
          innerCircleArcs
              .on( "mouseover", d => {
                innerCircleLabels.filter( d => d.endAngle - d.startAngle > .2 )
                                 .transition()
                                 .duration( 150 )
                                 .style( "opacity", 1 );
              } )
              .on( "mouseout", d => {
                innerCircleLabels.transition()
                                 .duration( 150 )
                                 .style( "opacity", 0 );
              } )
              .transition().duration( 150 )
              .attrTween( "d", d => {
                let which       = d.value < totalVotes / 2 ? 'active' : 'exhausted',
                    interpolate = d3.interpolate( innerAngles[ which ], d );
                innerAngles[ which ] = interpolate( 0 );
                return t => this.innerCircleArc( interpolate( t ) )
              } );

          //Updates the inner circle labels with one less candidate.
          innerCircleLabels
              .style( "opacity", 0 )
              .on( "mouseover", d => {
                innerCircleLabels.filter( d => d.endAngle - d.startAngle > .2 )
                                 .transition()
                                 .duration( 150 )
                                 .style( "opacity", 1 );
              } )
              .on( "mouseout", d => {
                innerCircleLabels.transition()
                                 .duration( 150 )
                                 .style( "opacity", 0 );
              } )
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


const innerAngles = {
  active   : null,
  exhausted: null
};