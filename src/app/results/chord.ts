/**
 * Created by Donald on 5/23/16.
 */

import * as _ from 'lodash';
import { Directive, Input, OnInit, ElementRef, Renderer, HostListener, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Candidate } from '../models/candidate';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as d3 from 'd3';
import { Selection } from 'd3';

@Directive( {
  selector: 'chord'
} )
export class ChordDiagramComponent implements OnInit, AfterViewInit {

  @Input() cands$: Observable<Candidate[]>;
  @Input() totalVotes$: Observable<number>;

  private width;
  private height;
  private svg: Selection<any>;
  private g: any;
  private screenWidth$: Subject<number> = BehaviorSubject.create();

  @HostListener( "window:resize", [ '$event' ] )
  private onResize(event) {
    this.screenWidth$.next( event.target.innerWidth );
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
          let tot         = cands.reduce( (sum, cand) => sum + cand.score, 1 ), //the total # of active votes
              ids         = cands.map( cand =>cand.id ).sort(),

              initMatrix  = ids.map( (id, idx)=> {
                let ret = Array( ids.length ).fill( 0 );
                ret[ idx ] = cands[ idx ].score;
                return ret;
              } ),

              voteMatrix  = cands.reduce( (resultArr, cand) => {
                let allyVotes: {[id: string]: number} = cand.getInboundAllyVotes(),
                    rowIdx                            = ids.indexOf( cand.id );
                _.keys( allyVotes ).forEach( candId => {
                  resultArr[ rowIdx ][ ids.indexOf( candId ) ] = allyVotes[ candId ];
                } );
                return resultArr
              }, initMatrix ),

              innerRadius = Math.min( this.width, this.height ) * .41,  //outer arc blocks for labels & mouse selection
              outerRadius = innerRadius * 1.1,
              fill        = d3.scale.category20b().domain( ids ),

              fade        = (opacity)=> {
                return (g, i) => {
                  this.svg.selectAll( ".chord path" )
                      .filter( function (d) { return d.source.index != i && d.target.index != i; } )
                      .transition()
                      .style( "opacity", opacity );
                }
              },

              chord       = d3.layout.chord()
                              .padding( .05 )
                              .sortSubgroups( d3.descending )
                              .matrix( voteMatrix );


          //the arcs that form the outer circle
          let arcs         = this.svg.selectAll( '.cand-arc' ).data( chord.groups ),
              enteringArcs = arcs.enter(),
              exitingArcs  = arcs.exit();


          //applied only for new (i.e. not-yet-drawn) arcs
          enteringArcs.append( 'path' )
                      .attr( 'class', 'cand-arc' )
                      .style( "fill", function (d) { return fill( d.index );} ) //from d.index
                      .style( "stroke", function (d) { return fill( d.index ); } )
                      .on( "mouseover", fade( .1 ) ) //fade out unselected relationships
                      .on( "mouseout", fade( 1 ) );  //display all relationships when none selected

          //applied for all arcs
          arcs.attr( "d", d3.svg.arc().innerRadius( innerRadius ).outerRadius( outerRadius ) );


          let chords         = this.svg.selectAll( '.chord' ).data( chord.chords ),
              enteringChords = chords.enter(),
              exitingChords  = chords.exit();


          enteringChords.append('g')
                        .attr('class', 'chord')
                        .selectAll("path")
                        .data(chord.chords)
                        .enter().append("path")
                        .attr("d", d3.svg.chord().radius(innerRadius))
                        .style("fill", function(d) { return fill(d.target.index); })
                        .style("opacity", 1);

          // note: each candidate has a self-referential chord - you want to hide that.


          // Method for fading unselected candidates' data


        } )
  }

  ngAfterViewInit() {
    this.screenWidth$.next( this.element.nativeElement.clientWidth );


    this.width = this.height = this.element.nativeElement.clientWidth;
    this.svg = d3.select( this.element.nativeElement )
                 .append( 'svg' )
                 .attr( 'width', `${this.width}` )
                 .attr( 'height', `${this.height}` )
                 .append( 'g' )
                 .attr( "transform", `translate(${this.width / 2 },${this.height / 2})` );


    this.screenWidth$.next( this.width );


  }

}



