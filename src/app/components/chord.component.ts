/**
 * Created by Donald on 5/23/16.
 */

import * as _ from 'lodash';
import { Directive, Input, OnInit, ElementRef, Renderer, HostListener, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Candidate, allyVotes } from '../models/candidate';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as d3 from 'd3';
import { Selection } from 'd3';
import { mutable } from '../models/mutability';

@Directive( {
  selector: 'rcv-chord'
} )
export class ChordComponent implements OnInit, AfterViewInit {

  @Input() cands$: Observable<Candidate[]>;
  @Input() totalVotes$: Observable<number>;
  @Input() hoveredCand$: Observable<string>;


  @Output() candHovered$: Observable<string>;

  private width;
  private height;
  private svg: Selection<any>;
  private chord: any;
  private g: any;
  private screenWidth$: Subject<number> = BehaviorSubject.create();
  private candHovers$: Subject<string> = BehaviorSubject.create();

  @HostListener( "window:resize", [ '$event' ] )
  private onResize(event) {

    this.height = this.element.nativeElement.ownerDocument.body.clientHeight - 100;
    this.width = this.element.nativeElement.clientWidth;

    this.screenWidth$.next( this.width );
  }

  constructor(private element: ElementRef, private renderer: Renderer) {
    this.candHovered$ = this.candHovers$.asObservable().debounceTime( 25 );
  }

  ngOnInit() {

    this.screenWidth$.next( this.element.nativeElement.clientWidth );

    this.height = this.element.nativeElement.ownerDocument.body.clientHeight - 100;
    this.width = this.element.nativeElement.clientWidth;

    this.screenWidth$.next( this.width );
    this.svg = d3.select( this.element.nativeElement )
                 .append( 'svg' )
                 .attr( 'width', `${this.width}` ) //set svg size
                 .attr( 'height', `${this.height}` )
                 .append( 'g' )
                 .attr( "transform", `translate(${this.width / 2 },${this.height / 2})` ); //reposition diagram

    this.chord = d3.layout.chord()
                   .padding( .05 );

    let last_chord = {};

    /**
     * We want to redraw/update the graphic every time the data changes, OR the size of the screen changes.
     * Observable.combineLatest says: "Anytime either of these changes, fire a new event with the latest value of each"
     * So, we subscribe to that and run our viz update logic each time it fires.
     */
    Observable.combineLatest( this.cands$, this.screenWidth$, this.totalVotes$, this.hoveredCand$ ).subscribe(
        ([cands, width, totalVotes, hoveredCand]) => {
          let tot         = cands.reduce( (sum, cand) => sum + cand.score, 1 ), //the total # of active votes
              ids         = mutable( cands ).map( cand =>cand.id ).sort(),

              initMatrix  = ids.map( (id, idx)=> {
                let ret = Array( ids.length ).fill( 0 );
                ret[ idx ] = Math.max( cands[ idx ].score, 5 );
                return ret;
              } ),

              voteMatrix  = cands.reduce( (resultArr, cand) => {
                let allies: {[id: string]: number} = allyVotes( cand ),
                    rowIdx                         = ids.indexOf( cand.id );
                _.keys( allies ).forEach( candId => {
                  resultArr[ rowIdx ][ ids.indexOf( candId ) ] = allies[ candId ];
                } );
                return resultArr
              }, initMatrix ),
              idToIdx     = (id: string)=> cands.map( cand => cand.id ).indexOf( id ),
              idxToId     = (idx: number) => cands[ idx ].id,
              innerRadius = Math.min( this.width, this.height ) * .42,  //outer arc blocks for labels & mouse selection
              outerRadius = innerRadius * 1.07,
              fill        = (idx: number) => cands[ idx ].color,
              fade        = (opacity)=> {
                return (g, i) => {
                  this.svg.selectAll( ".chord path" )
                      .filter( function (d) { return d.source.index != i && d.target.index != i; } )
                      .transition()
                      .style( "opacity", opacity );
                }
              };

          this.chord.matrix( voteMatrix );

          console.log( voteMatrix );


          //the arcs that form the outer circle
          let arcs         = this.svg.selectAll( '.cand-arc' ).data( this.chord.groups ),
              enteringArcs = arcs.enter(),
              exitingArcs  = arcs.exit();


          //applied only for new (i.e. not-yet-drawn) arcs
          enteringArcs.append( 'path' )
                      .attr( 'class', 'cand-arc' )
                      .style( 'stroke', '#999' )
                      .style( 'stroke-width', 0.4 )
                      .style( "fill", d => fill( d.index ) )
                      .on( 'mouseover', d=> {
                        this.candHovers$.next( idxToId( d.index ) )
                      } )
                      .on( 'mouseout', d=> {
                        this.candHovers$.next( '' )
                      } );


          //applied for all arcs
          arcs.transition().duration( 200 ).attr( "d", d3.svg.arc().innerRadius( innerRadius ).outerRadius( outerRadius ) )
            .style( 'opacity', 1 );


          if (!!hoveredCand){
            arcs.filter( d => idxToId( d.index ) !== hoveredCand).transition().duration(100).style('opacity', 0.2);
          }


          let chords         = this.svg.selectAll( '.chord' ).data( this.chord.chords ),
              enteringChords = chords.enter(),
              exitingChords  = chords.exit();

          // chords.remove();
          // You were close here donald, remind me to explain why this needed to change
          let chordPaths = enteringChords
              .append( "path" )
              .attr( 'class', 'chord' )
              .attr( "d", d3.svg.chord().radius( innerRadius ) )
              .style( 'stroke', '#999' )
              .style( 'stroke-width', 0.5 )
              .style( "fill", d=> fill( d.target.index ) )
              .on( 'mouseover', d=> {this.candHovers$.next( idxToId( d.index ) )} )
              .on( 'mouseout', d=> { this.candHovers$.next( '' )} );

          chords.filter( d => d.source.index == d.target.index ).remove();

          if (!!hoveredCand) {
            let idx = idToIdx(hoveredCand);
            chords.filter( d => d.source.index !== idx).transition().duration( 100 ).style( 'opacity', 0.2 );
          } else {
          chords.transition().duration( 100 ).style( 'opacity', 1 );
          }


          chords.transition().duration( 250 ).delay( 50 ).attr( "d", d3.svg.chord().radius( innerRadius ) );



          // todo:clear svg before updating data
          // todo:adjust shading & color scheme to match pie


        } )
  }

  ngAfterViewInit() {
    this.screenWidth$.next( this.width );

  }

}


