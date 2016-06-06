/**
 * Created by moore on 5/4/2016.
 */

import { Component, Input, AfterViewInit, OnInit, ElementRef, Renderer, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Candidate } from '../models/candidate';
import * as d3 from 'd3';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { mutable } from '../models/mutability';


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
        transition: 250ms linear all;
        cursor: pointer;
     }
     
     .entry.focused { 
     font-weight: 600;
     }
     
     .entry.unfocused { 
        font-weight: 100;
     }
     
     .entry.removed {
        color: red;
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
        transition: 300ms linear all;
     }
     
     .cand-name.small {
        font-size: 0.8em;
     }
    
  ` ],
  template: `
      <div layout="row" layout-align="space-between center">
        <div *ngFor="let bar of bars$ | async" class="entry"  layout="column" layout-align="start center"  
             [class.focused]="bar.isFocused" [class.unfocused]="bar.isUnfocused"  [class.removed]="bar.isRemoved" (click)="candClicked(bar)" flex >
        
        
            <div [style.background-color]="bar.color" class="bar" ></div>
          <div class="cand-name">{{bar.name}}</div>
        </div>
      </div>
  `
} )
export class LegendComponent implements OnInit, AfterViewInit {

  @Input() cands$: Observable<Candidate[]>;
  @Input() hoveredCand$: Observable<string>;
  @Output() unremoved$ = new EventEmitter<string>();

  private bars$: Observable<Bar[]>;

  private screenWidth$: Subject<number> = BehaviorSubject.create();
  private wid: (val: number) => number;
  private color: (id: string) => string;
  private isHovered$: Observable<boolean>;
  private widthFxn: Observable<(val: number)=> number>;

  @HostListener( 'window:resize', [ '$event' ] )
  private onResize($event) {
    this.screenWidth$.next( this.element.nativeElement.clientWidth )
  }

  constructor(private element: ElementRef, private renderer: Renderer) {

  }

  ngOnInit() {
    
    this.bars$ = Observable.combineLatest( this.screenWidth$, this.cands$, this.hoveredCand$,
        (width, cands, hovered) => {
          let actives = cands.filter( cand => cand.isActive ), // don't include eliminated candidates
              tot     = actives.reduce( (sum, cand) => sum + cand.score, 0 ), //the total # of active votes
              wid     = d3.scale.linear()
                          .domain( [ 0, tot ] ) // scale from 0 to 100% of the votes
                          .range( [ 0, width || 0 ] ),
              name = (cand)=> hovered && hovered === cand.id ? cand.name : cand.name.split( ' ' )[ 1 ]; //mapped to 0 to full width of screen

          return mutable( cands ).map( cand=>
              ( <Bar>{
                width: wid( cand.score ),
                color: cand.color,
                id: cand.id,
                label: cand.name,
                icon : cand.photo,
                name : name(cand),
                isRemoved: cand.removed,
                isFocused: hovered && hovered === cand.id,
                isUnfocused: hovered && hovered !== cand.id
              }) ).sort( (x, y)=> x.width - y.width );

        }
    );

  }

  private candClicked(cand){
    debugger;
    if (cand.isRemoved){
      this.unremoved$.emit( cand.id );
    }
  }



  ngAfterViewInit() { //TODO  do this through renderer to be platform-safe
    this.screenWidth$.next( this.element.nativeElement.clientWidth );
  }

  onResize(event) {
    this.screenWidth$.next( event.target.innerWidth );
  }


}