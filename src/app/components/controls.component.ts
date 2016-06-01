import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component( {
  selector  : 'rcv-controls',
  directives: [  ],
  styles    : [ `` ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template  : `
    <div layout="row" class="control-bar">
          <button md-button (click)="start.emit();">From Start</button>
          <button md-button  (click)="prev.emit();"  id="next">Previous Round</button>
          <div><strong>{{round}}</strong></div>
          <button md-button (click)="next.emit();"  id="prev">Next Round</button>
          <button md-button (click)="end.emit();">End Result</button>
        </div>
    `
} )
export class ControlsComponent implements OnChanges{
  @Input() round: number;
  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();
  @Output() start = new EventEmitter();
  @Output() end = new EventEmitter();

  ngOnChanges(){
    console.log( 'change' );
  }

}