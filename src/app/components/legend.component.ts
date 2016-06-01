/**
 * Created by moore on 5/4/2016.
 */

import { Component, Input, AfterViewInit, OnInit, ElementRef, Renderer, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Candidate } from '../models/candidate';
import * as d3 from 'd3';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { mutable } from '../common/mutability';


type Bar = {
  color: string;
  width: number;
  label: string;
  icon: string;
}

@Component( {
  selector: 'rcv-legend',
  host    : {
    'layout': 'column'
  },
  styles  : [ `
    :host { 
        height: 75px;
    
    }
    .entry { 
        position: relative;
        white-space: nowrap;;
        height: 70px;
     }
    .bar {
      height: 20px;
      transition: 500ms linear all;
      overflow: hidden;
    }
    
    .entry .bar {
        width: 100%;    
    }
    
    .cand-name{ 
        overflow: visible;
        margin: 5px 0;
     }
     
     .cand-name.small {
        font-size: 0.8em;
     }
     
     .invisible .cand-name{ 
        visibility: hidden;
     }
     
     .invisible:hover .cand-name{ 
        visibility: visible;
     }
    
  ` ],
  template: `
      <div layout="row" layout-align="space-between center">
        <div *ngFor="let bar of bars$ | async" class="entry" layout="column" layout-align="start center" flex>
            <div [style.background-color]="bar.color" class="bar"></div>
          <div class="cand-name">{{bar.name}}</div>
        </div>
      </div>
  `
} )
export class LegendComponent implements OnInit, AfterViewInit {

  @Input() cands$: Observable<Candidate[]>;

  private bars$: Observable<Bar[]>;

  private screenWidth$: Subject<number> = BehaviorSubject.create();
  private wid: (val: number) => number;
  private color: (id: string) => string;

  @HostListener( 'window:resize', [ '$event' ] )
  private onResize($event) {
    this.screenWidth$.next( this.element.nativeElement.clientWidth )
  }

  constructor(private element: ElementRef, private renderer: Renderer) {

  }

  ngOnInit() {


    this.bars$ = Observable.combineLatest( this.screenWidth$, this.cands$,
        (width, cands) => {
          let actives = cands.filter( cand => cand.isActive ), // don't include eliminated candidates
              tot     = actives.reduce( (sum, cand) => sum + cand.score, 0 ), //the total # of active votes
              wid     = d3.scale.linear()
                          .domain( [ 0, tot ] ) // scale from 0 to 100% of the votes
                          .range( [ 0, width || 0 ] ); //mapped to 0 to full width of screen

          return mutable( cands ).map( cand=>
              ( <Bar>{
                width: wid( cand.score ),
                color: cand.color,
                label: cand.name,
                icon : cand.photo,
                name : cand.name.split(' ')[1]
              }) ).sort( (x, y)=> y.width - x.width );

        }
    );

  }

  ngAfterViewInit() { //TODO  do this through renderer to be platform-safe
    this.screenWidth$.next( this.element.nativeElement.clientWidth );
  }

  onResize(event) {
    this.screenWidth$.next( event.target.innerWidth );
  }


}