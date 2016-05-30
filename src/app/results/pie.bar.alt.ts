/**
 * Created by moore on 5/4/2016.
 */

import { Directive, Input, AfterViewInit, OnInit, ElementRef, Renderer, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Candidate } from '../models/candidate';
import * as d3 from 'd3';
import { Selection } from 'd3';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { mutable } from '../common/mutability';


@Directive( {
  selector: 'pie-bar'
} )
export class PieBarComponent implements OnInit, AfterViewInit {

  @Input() cands$: Observable<Candidate[]>;

  private BAR_HEIGHT = 75;
  private svg: Selection<any>;
  private g: any;
  private screenWidth$: Subject<number> = BehaviorSubject.create();

  @HostListener( "window:resize", [ '$event' ] )
  private onResize( event ) {
    this.screenWidth$.next( event.target.innerWidth );
  }


  constructor( private element: ElementRef, private renderer: Renderer ) {
  }

  ngOnInit() {
    /**
     * We want to redraw/update the graphic every time the data changes, OR the size of the screen changes.
     * Observable.combineLatest says: "Anytime either of these changes, fire a new event with the latest value of each"
     * So, we subscribe to that and run our viz update logic each time it fires.
     */
    Observable.combineLatest( this.cands$, this.screenWidth$ ).subscribe(
        ( [cands, width] ) => {
          debugger;
          this.svg.attr( 'width', width ); // update the screen width - if it hasn't changed, this has no effect

          let actives = mutable( cands ).filter( cand => cand.isActive ), // don't include eliminated candidates
              tot     = actives.reduce( ( sum, cand ) => sum + cand.score, 0 ), //the total # of active votes
              wid     = d3.scale.linear()
                          .domain( [ 0, tot ] ) // scale from 0 to 100% of the votes
                          .range( [ 0, width || 0 ] ), //mapped to 0 to full width of screen
              scores  = actives.map( cand => +cand.score ).sort( ( x, y )=> y - x ),
              ids     = mutable( cands ).map( cand => cand.id ).sort(), // sort alphabetically so each cand's color stays the same
              color   = d3.scale.category20b().domain( ids );

          let updates = this.g.selectAll( '.bar' ).data( actives, ( d ) => d.id ), // use id to determine equality
              enters  = updates.enter(), // elements we're drawing for the first time
              exits   = updates.exit(); // elements that are being removed

          enters.append( 'rect' )
                .attr( 'class', 'bar' )
                .attr( 'height', `${this.BAR_HEIGHT}px` )
                .attr( 'fill', d => color( d.id ) );

          updates.attr( 'width', d => wid( d.score ) )
                 .attr( 'x', d => {
                   let sumOfHigherScores = scores.filter( score => score > d.score )
                                                 .reduce( ( sum, next )=> sum + next, 0 );
                   return wid( sumOfHigherScores );
                 } );

            exits.remove();
            exits.attr('opacity', 0);
          this.redrawFinishLine( width );

        } );

  }

  ngAfterViewInit() {
    /**
     * This only runs once, creating
     */
    let initWidth = this.element.nativeElement.clientWidth;
    this.svg      = d3.select( this.element.nativeElement )
                      .append( 'svg' )
                      .attr( 'width', initWidth )
                      .attr( 'height', `${this.BAR_HEIGHT + 10}px` );


    this.g = this.svg.append( 'g' );

    this.screenWidth$.next( initWidth );
  }

  private redrawFinishLine( wid ) {
    let midPt = wid / 2;

    this.svg.select( '.finish-line' ).remove();

    this.svg.append( 'line' )
        .attr( 'class', 'finish-line' )
        .attr( 'x1', `${midPt}px` )
        .attr( 'x2', `${midPt + 2}px` )
        .attr( 'y1', 0 )
        .attr( 'y2', `${this.BAR_HEIGHT + 9}px` )
        .attr( 'stroke', '#23a22b' )
        .attr( 'stroke-width', '2' )
        .style( "stroke-dasharray", "3, 3" );

  }

}