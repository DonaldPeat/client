/**
 * Created by moore on 5/4/2016.
 */

import { Component, Input, AfterViewInit, OnInit, ElementRef, Renderer } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Candidate } from '../models/candidate';
import * as d3 from 'd3';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { mutable, mutate } from '../common/mutability';


type Bar = {
  color: string;
  width: number;
  label: string;
  icon: string;
}

@Component( {
  selector: 'pie-bar',
  styles  : [ `
    .bar {
      height: 75px;
      transition: 500ms linear all;
    }
  ` ],
  template: `
    <div layout="row" layout-align="start stretch" (window:resize)="onResize($event)">
      <div *ngFor="let bar of bars$ | async" [style.width.px]="bar.width" [style.background-color]="bar.color" class="bar"></div>
    </div>
  `
} )
export class PieBarComponent implements OnInit, AfterViewInit {

  @Input() cands$: Observable<Candidate[]>;

  private bars$: Observable<Bar[]>;

  private screenWidth$: Subject<number> = BehaviorSubject.create();
  private wid: ( val: number ) => number;
  private color: ( id: string ) => string;

  constructor( private element: ElementRef, private renderer: Renderer ) {

  }

  ngOnInit() {


    this.bars$ = Observable.combineLatest( this.screenWidth$, this.cands$,
        ( width, cands ) => {
          let actives = cands.filter( cand => cand.isActive ), // don't include eliminated candidates
              tot     = actives.reduce( ( sum, cand ) => sum + cand.score, 0 ), //the total # of active votes
              wid     = d3.scale.linear()
                          .domain( [ 0, tot ] ) // scale from 0 to 100% of the votes
                          .range( [ 0, width || 0 ] ), //mapped to 0 to full width of screen
              ids     = mutable( cands ).map( cand => cand.id ).sort(), // sort alphabetically so each cand's color stays the same
              color   = d3.scale.category20b().domain( ids );

          return mutable(cands).map( cand=>
              ( <Bar>{
            width: wid( cand.score ),
            color: color( cand.id ),
            label: cand.name,
            icon : cand.photo,
          }) ).sort( ( x, y )=> y.width - x.width );

        }
    );

  }

  ngAfterViewInit() { //TODO  do this through renderer to be platform-safe
    this.screenWidth$.next( this.element.nativeElement.clientWidth );
  }

  onResize( event ) {
    this.screenWidth$.next( event.target.innerWidth );
  }


}