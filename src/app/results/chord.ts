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

  private width = 500;
  private height = 500;
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
          let tot                   = cands.reduce( (sum, cand) => sum + cand.score, 1 ), //the total # of active votes
              ids                   = cands.map( cand =>cand.id ),
              initMatrix = ids.map((id, idx)=> {
                let ret = Array(ids.length).fill(0);
                ret[idx] = cands[idx].score;
                return ret;
              }),

              allyVotes: number[][] = cands.reduce( (resultArr, cand) => {
                let allyVotes: {[id: string]: number} = cand.getInboundAllyVotes(),
                    rowIdx                            = ids.indexOf( cand.id );
                _.keys( allyVotes ).forEach( candId => {

                  let colIdx = ids.indexOf( candId ),
                      val    = allyVotes[ candId ];
                  resultArr[ rowIdx ][ colIdx ] = val;
                } );
                return resultArr
              }, initMatrix );

          console.log( JSON.stringify(allyVotes) );
          /*
           function getDataMatrix(dict) {
           var outerArray = [];
           for (var key in dict) {
           for (var innerKey in dict[key]){
           var innerArray=[];
           innerArray.push(dict[key][innerKey]);
           }
           outerArray.push(innerArray);
           }
           return outerArray
           };

           let testMatrix = getDataMatrix(allyVotes);
           console.log(testMatrix);
           */
          /*                let matrix =

           [ //dummy data matrix for chord diagram to be replaced with candidates' votes/
           [10000,  250, 500, 2500,23],
           [ 5000, 300, 0, 2500,12],
           [ 2500, 0, 0, 0,25],
           [ 2500,  0,  0, 0,34],[529, 343, 232, 132, 455]
           ];
           */


          /*
           let matrix =

           [ //dummy data matrix for chord diagram to be replaced with candidates' votes/
           [0,  33, 0, 0,0],
           [ 0, 27, 0, 0,0],
           [ 0, 0, 25, 0,0],
           [ 0,  0,  0, 0,0],[0, 0, 0, 0, 0]
           ],

           */


          let matrix      = allyVotes,
              chord       = d3.layout.chord()
                              .padding( .05 )
                              .sortSubgroups( d3.descending )
                              .matrix( matrix ),

              height      = 500,
              innerRadius = Math.min( this.width, this.height ) * .41,  //outer arc blocks for labels & mouse selection
              outerRadius = innerRadius * 1.1,

              /*
               updates = this.g.selectAll( '.chord' ).data( matrix ),
               enters  = updates.enter(), // elements we're drawing for the first time
               exits   = updates.exit(); // elements that are being removed

               enters.append(  )

               } );
               */

              fill        = d3.scale.ordinal()
                              .domain( [ d3.range( cands.length ).toString() ] )          //dom & range to be changed to #candidates/votes
                              .range( [ "#000000", "#FFDD89", "#957244", "#F26223", "#000099", "#FEDD89", "#357244", "#F26283",
                                        "#340000", "#DFDD89", "#956244", "#F46223", "#043000", "#FDDD89", "#959244",
                                        "#F26273" ] ),

              svg         = d3.select( this.element.nativeElement )
                              .append( "svg" )
                              .attr( "width", width )
                              .attr( "height", height )
                              .append( "g" )
                              .attr( "transform", "translate(" + width / 2 + "," + height / 2 + ")" );

          svg.append( "g" ).selectAll( "path" )
             .data( chord.groups )
             .enter().append( "path" )
             .style( "fill", function (d) { return fill( d.index );} ) //from d.index
             .style( "stroke", function (d) { return fill( d.index ); } )
             .attr( "d", d3.svg.arc().innerRadius( innerRadius ).outerRadius( outerRadius ) )
             .on( "mouseover", fade( .1 ) ) //fade out unselected relationships
             .on( "mouseout", fade( 1 ) );  //display all relationships when none selected

          let ticks = svg.append( "g" ).selectAll( "g" )
                         .data( chord.groups )
                         .attr('class', 'asdf')
                         .enter().append( "g" ).selectAll( "g" )
                         .data( getCandVoteAngles )
                         .enter().append( "g" )
                         .attr( "transform", function (d) {
                           return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                                  + "translate(" + outerRadius + ",0)";

                         } );

          svg.append( "g" )
             .attr( "class", "chord" )
             .selectAll( "path" )
             .data( chord.chords )
             .enter().append( "path" )
             .attr( "d", d3.svg.chord().radius( innerRadius ) )
             .style( "fill", function (d) { return fill( d.target.index ); } )
             .style( "opacity", 1 );


          // Returns an array of angles and votecount labels, given candidate
          function getCandVoteAngles(d) {
            var k = (d.endAngle - d.startAngle) / d.value;
            return d3.range( 0, d.value, 1000 ).map( function (v, i) {
              return {
                angle: v * k + d.startAngle,
                label: i % 5 ? null : v / 1000 + "k"
              }
            } )
          };

          // Method for fading unselected candidates' data
          function fade(opacity) {
            return function (g, i) {

              svg.selectAll( ".chord path" )
                 .filter( function (d) { return d.source.index != i && d.target.index != i; } )
                 .transition()
                 .style( "opacity", opacity );
            }
          };
        } )
  }

  ngAfterViewInit(){
    this.screenWidth$.next( this.element.nativeElement.clientWidth );

  }

}



