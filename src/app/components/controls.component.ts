import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component( {
  selector       : 'rcv-controls',
  directives     : [],
  styles         : [ `
md-icon {
    font-size: 40px;
} 

.next { color: green }
.prev { color: red; transform: rotate(180deg)}

` ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template       : `
    <div layout="row" class="control-bar">
          <button md-button (click)="start.emit();"><md-icon>skip_previous</md-icon></button>
          <button md-button  (click)="prev.emit();" class="prev"><md-icon>play_arrow</md-icon></button>
          <div><strong>{{round}}</strong></div>
          <button md-button (click)="next.emit();"  class="next"><md-icon>play_arrow</md-icon></button>
          <button md-button (click)="end.emit();"><md-icon>skip_next</md-icon></button>
        </div>
    `
} )
export class ControlsComponent implements OnChanges {
  @Input() round: number;
  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();
  @Output() start = new EventEmitter();
  @Output() end = new EventEmitter();

  ngOnChanges() {
    console.log( 'change' );
  }

}