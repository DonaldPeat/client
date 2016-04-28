import {
    Component,
    OnInit,
    ComponentMetadata,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy
} from "angular2/core";


/**
 *
 *
 **/

const NavMetadata: ComponentMetadata = new ComponentMetadata({
  selector       : 'rcv-nav',
  styles         : [ require( './navbar.scss') ],
  template       : `
    <div layout="row" layout-align="space-between stretch" class="nav-wrapper">
        <div md-button (click)="toggleMenu.emit()" layout="column" layout-align="center" class="menu-toggle-button" [class.open]="menuOpen">
           <div layout layout-align="center center" class="inner" >
             <i md-icon class="small-icon" *ngIf="menuOpen">menu</i>
             logo
             <!--img [src]="logoSrc" class="logo">-->
           </div>
        </div>
      <div style="align-items: center" flex></div>
    </div>
  `
});
@Component(NavMetadata)
export class NavComponent implements OnInit {
  @Input() menuOpen: boolean;
  @Output() toggleMenu = new EventEmitter();

  constructor() {



  }

  private get logoSrc(): string {
    return this.menuOpen ? '/assets/img/logo-light.png' : '/assets/img/logo-dark.png';
  }

  ngOnInit() { }

}
