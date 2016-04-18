

import {Component, HostBinding, Input, OnInit, ChangeDetectionStrategy} from "angular2/core";
@Component({
  selector: 'rcv-menu',
  template: `
    <div>menu stuff</div>
  `,
  styles: [require('./menu.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  @Input() isOpen: boolean;
  @HostBinding('attr.layout') layout = 'column';
  @HostBinding('attr.layout-align') layoutAlign = 'space-between stretch';
  @HostBinding('class.open') get open() {return this.isOpen};

  ngOnInit(){
  }

}