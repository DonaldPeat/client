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
  selector: 'pie-sunburst'
} )
export class PieSunBurstComponent implements OnInit, AfterViewInit {

  @Input() cands$: Observable<Candidate[]>;
  @Input() totalVotes$: Observable<number>;
  @Output() removals$: Subject<string[]> = BehaviorSubject.create();

  private height;
  private width;

  private arc;
  private innerCircleArc;
  private radius = () => Math.min( this.width, this.height ) / 5;
  private svg: Selection<any>;
  private g: any;
  private screenWidth$: Subject<number> = BehaviorSubject.create();

  @HostListener( "window:resize")
  private onResize(event) {
    this.width = this.height = this.element.nativeElement.clientWidth;

    this.screenWidth$.next(  this.width);
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
              allyVotes     = actives.reduce( (result, cand) => {
                result[ cand.id ] = cand.getInboundAllyVotes();
                return result
              }, {} ),
              wid           = d3.scale.linear()
                                .domain( [ 0, tot ] ) // scale from 0 to 100% of the votes
                                .range( [ 0, width || 0 ] ), //mapped to 0 to full width of screen
              numVotes      = [ tot, totalVotes - tot ],
              scores        = actives.map( cand => +cand.score ).sort( (x, y)=> y - x ),
              ids           = mutable( cands ).map( cand => cand.id ).sort(), // sort alphabetically so each cand's color stays the same
              color         = d3.scale.category20b().domain( ids ),
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
                 .attr( "fill" , d => color(d.data.id))
                 .each( d => this.element.nativeElement._current = d) //stores the current angles in ._current //
                 .on("click", d => this.removals$.next(d.data.id) );

          enterGs // Jeff: we can filter here so those labels are never placed (see comment on https://github.com/RCVSim/client/commit/9d5042d72c86f0e1da9e38737d8bfdd8abf8d703#diff-1b3d57e760bc62d6198570b6b2cc9ad4R110
                 .append( "text" )
                 .attr( "class", "txt" )
                 .attr( "dy", ".35em" )
                 .attr( "text-anchor", "middle" )
                 .attr( "transform", d => {
                   d.outerRadius = this.radius() * 1.8;
                   d.innerRadius = this.radius() * 0.9;
                   return `translate(${this.arc.centroid( d )}) rotate(${angle( d )})`;
                 } )
                 .style( "fill", "white" )
                 .text( d => percentFormat( d.value / tot ) )
                 .on("click" , d => this.removals$.next(d.data.id) );
          //  .each( d => this.element.nativeElement._text = d.value ); //stores the current value in ._text // <-- Jeff: Why?

          let enterCandLabelGs = enterGs
              .append( 'g' ).attr( 'class', 'candLabel-g' );

          //black dot for candLabel
          enterCandLabelGs.append( "circle" )
                 .attr( "class" , "label-dot" )
                 .attr( { x: 0, y : 0, r : 2, fill: "#000", } )
                 .attr( "transform", d => {
                     let c = this.arc.centroid( d );
                     return `translate(${c[ 0 ] * 1.30},${c[ 1 ] * 1.30})`;
                 });

            ///Draw candLabel for first time
          enterCandLabelGs
                 .append( "text" )
                 .attr( "class" , "label-text" )
                 .attr( "x", d => {
                     let c = this.arc.centroid( d ),
                     midAngle = Math.atan2(c[1], c[0]),
                     x = Math.cos(midAngle) * this.radius() * 1.95,
                     sign = x > 0 ? 1 : -1;
                     return d.x = x + ( 5 * sign );
                 } )
                 .attr( "y", d => {
                   let c = this.arc.centroid( d ),
                   midAngle = Math.atan2(c[1] , c[0]),
                   y =  Math.sin(midAngle) * this.radius() * 1.95;
                   d.y = y;
                   return y;
                  })
                 .attr( "text-anchor", d => {
                     let c = this.arc.centroid( d ),
                     midAngle = Math.atan2(c[1], c[0]),
                     x = Math.cos(midAngle) * this.radius();
                     return x > 0 ? "start" : "end";
                 })
                 .style( "fill", "black" )
                 .text( d => d.data.name.split(" ")[1] )
                 .on("click", d => this.removals$.next(d.data.id) );

            enterCandLabelGs.append( "line" )
                .attr( "class" , "label-line")
                .attr( { x1: d => this.arc.centroid(d)[0] * 1.3,
                    y1: d => this.arc.centroid(d)[1] * 1.3,
                    x2: d => d.x,
                    y2: d => d.y,
                })
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("fill", "none");

           //Jeff: I haven't touched the innerCircle stuff - can you refactor this the way I did the outer?

           //Draws inner circle
           let innerCircle = this.g.selectAll( '.innerCircle-g' ).data( innerPie( numVotes ) ),
                innerCircleGEnters = innerCircle.enter(),
                innerCircleGExits  = innerCircle.exit();

           let innerCircleGs = innerCircleGEnters.append('g').attr('class','innerCircle-g');

           //Draws inner arcs
           innerCircleGs.append( "path" )
               .attr( "class", "innerCircleArc" )
               .attr( "d", this.innerCircleArc )
               .attr( "fill", d => colorInner( d.data ) )
               .each( d => this.element.nativeElement._currentAng = d );//stores current angles in ._currentAng

           //Draws Inner Circle Labels
           innerCircleGs
                .append( "text" )
                .attr( "class", "innerTxt" )
                .attr( "dy", "-0.10em" )
                .attr( "text-anchor", "middle" )
                .attr( "transform", d => {
                    d.outerRadius = this.radius() * 0.9;
                    return `translate(${this.innerCircleArc.centroid( d )}) rotate(${0})`;
                } )
                .style( "fill", "white" )
                .style( "font-size", "18px" )
                .text( d => percentFormat( d.value / totalVotes ) );

            let arcs        = candGs.select( '.arc' ),
                scoreLabels = candGs.select( '.txt' ), // Jeff, you should make this name more descriptive, mayble score-label
                candLabelDots  = candGs.select( '.label-dot' ),
                candLabelLabels  = candGs.select( '.label-text' ),
                candLabelLines  = candGs.select( '.label-line' ),
                innerCircleArcs = innerCircle.select('.innerCircleArc'),
                innerCircleLabels = innerCircle.select('.innerTxt');

            //Removes a eliminated candidate from our visualization elements
            arcs.filter( d => d.data.eliminated ).style("opacity",0);
            arcs.filter( d => !d.data.eliminated ).style("opacity",1);
            scoreLabels.filter( d => d.data.eliminated ).style("opacity",0);
            scoreLabels.filter( d => !d.data.eliminated ).style("opacity",1);
            candLabelDots.filter( d => d.data.eliminated ).style("opacity",0);
            candLabelDots.filter( d => !d.data.eliminated ).style("opacity",1);
            candLabelLabels.filter( d => d.data.eliminated ).style("opacity",0);
            candLabelLabels.filter( d => !d.data.eliminated ).style("opacity",1);
            candLabelLines.filter( d => d.data.eliminated ).style("opacity",0);
            candLabelLines.filter( d => !d.data.eliminated ).style("opacity",1);

            //Little Hack; filter the ones that are too small to see to opacity 0, else opacity to 1
            candLabelDots.filter( d => d.endAngle - d.startAngle < .2 )
                .style("opacity",0);

            candLabelDots.filter( d => d.endAngle - d.startAngle > .2 )
                .style("opacity",1);

            candLabelLabels.filter( d => d.endAngle - d.startAngle < .2 )
                .style("opacity",0);

            candLabelLabels.filter( d => d.endAngle - d.startAngle > .2 )
                .style("opacity",1);

            candLabelLines.filter( d => d.endAngle - d.startAngle < .2 )
                .style("opacity",0);

            candLabelLines.filter( d => d.endAngle - d.startAngle > .2 )
                .style("opacity",1);

            scoreLabels.filter( d => d.endAngle - d.startAngle < .2 )
                .style("opacity",0);

            scoreLabels.filter( d => d.endAngle - d.startAngle > .2 )
                .style("opacity",1);

            innerCircleLabels.filter( d => d.endAngle - d.startAngle < .2 )
                .style("opacity",0);

            innerCircleLabels.filter( d => d.endAngle - d.startAngle > .2 )
                .style("opacity",1);

          //Updates the outerCircle with one less candidate
          arcs
              .transition().duration( 650 )
              .attrTween( "d", d => {
                let interpolate = d3.interpolate( this.element.nativeElement._current, d );
                this.element.nativeElement._current = interpolate( 0 );
                return t => this.arc( interpolate( t ) )
              } );

          //Updates the outer circle labels with one less candidate
          scoreLabels
              .transition().duration( 650 )
              .attr( "transform", d => {
                d.outerRadius = this.radius() * 1.8;
                d.innerRadius = this.radius() * 0.9;
                return `translate(${this.arc.centroid( d )}) rotate(${angle( d )})`;
              } )
              .text( d => percentFormat( d.value / tot ) );

          //Updates the candidates' dot with one less candidate
          candLabelDots
              .transition().duration( 650 )
              .attr( "transform", d => {
                  let c = this.arc.centroid( d );
                  return `translate(${c[ 0 ] * 1.30},${c[ 1 ] * 1.30})`;
              });

          //Updates the candidates' name with one less candidate
          candLabelLabels
              .transition().duration( 650 )
              .attr( "x", d => {
                  let c = this.arc.centroid( d ),
                      midAngle = Math.atan2(c[1] , c[0] ),
                      x = Math.cos(midAngle) * this.radius() * 1.95,
                      sign = x > 0 ? 1 : -1;
                  d.x = x + 5 * sign;
                  return d.x;
              } )
              .attr( "y", d => {
                  let c = this.arc.centroid( d ),
                      midAngle = Math.atan2(c[1] , c[0] ),
                      y =  Math.sin(midAngle) * this.radius() * 1.95,
                      dx = Math.pow(d.x - this.arc.centroid(d)[0] * 1.3 , 2),
                      dy = Math.pow(y - this.arc.centroid(d)[1] * 1.3 , 2);
                  d.y = y;
                  if ( Math.sqrt(dx+dy) < 35 && d.endAngle - d.startAngle > .2 ) {
                      return Math.sin(midAngle) * this.radius() * 2.10;
                  }
                  return y;
              }); //Jeff, you'll never need to change the name

            //Updates the candidates' line with one less candidate
            candLabelLines
                .transition().duration( 650 )
                .attr( { x1: d => this.arc.centroid(d)[0] * 1.3,
                    y1: d => this.arc.centroid(d)[1] * 1.3,
                    x2: d => d.x - d.x * 0.03,
                    y2: d => d.y - d.y * 0.03,
                });

           //Updates the inner Circle with one less candidate
           innerCircleArcs
               .transition().duration( 650 )
               .attrTween( "d", d => {
                   let interpolate = d3.interpolate( this.element.nativeElement._currentAng, d );
                   this.element.nativeElement._currentAng = interpolate( 0 );
                   return t => this.innerCircleArc( interpolate( t ) )
                } );


           //Updates the inner circle labels with one less candidate.
           innerCircleLabels
               .transition().duration( 650 )
               .attr( "transform", d => {
                   d.outerRadius = this.radius() * 0.9;
                   return `translate(${this.innerCircleArc.centroid( d )}) rotate(${0})`;
                } )
                .text( d => percentFormat( d.value / totalVotes ) );

        } );

  }

  ngAfterViewInit() {
    /**
     * This only runs once, creating
     */

    this.width = this.height = this.element.nativeElement.clientWidth;
    this.svg = d3.select( this.element.nativeElement )
                 .append( 'svg' )
                 .attr( 'width', `${this.width}` )
                 .attr( 'height', `${this.height}` );

    this.g = this.svg.append( 'g' )
                 .attr( "transform", `translate(${this.width /2 },${this.height/2})` );

    this.arc = d3.svg.arc()
                 .innerRadius( this.radius() * 0.9 )
                 .outerRadius( this.radius() * 1.8 );

    this.innerCircleArc = d3.svg.arc()
                       .innerRadius( 0 )
                       .outerRadius( this.radius() * 0.9 );

    this.screenWidth$.next( this.width );
  }

}