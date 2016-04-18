import {Component, OnInit, ViewEncapsulation} from "angular2/core";
import {RouterLink, ROUTER_DIRECTIVES} from "angular2/router";
import {AsyncPipe} from "angular2/common";
import {MenuComponent} from "./menu/epub.menu.component";
import {NavComponent} from "./nav/nav.component";

//noinspection TypeScriptUnresolvedFunction
@Component({
  selector   : "rcv-app",
  template: `
    
    <div layout="column" layout-fill class="app-wrapper">
      <rcv-nav [menuOpen]="!(state?.menuOpen$ | async)" (toggleMenu)="state.toggleMenu()"></rcv-nav>
      <div layout="row" layout-align="start stretch" flex>
        <rcv-menu [isOpen]="state?.menuOpen$ | async"></rcv-menu>
        <div class="stage">
          {{helloWorldMsg}}
        </div>
      </div>
        <!--<rcv-controlbar [isOpen]="state.controlBarOpen$ | async">
          <route-view name="controlbar"></route-view>
        </rcv-controlbar>-->
  
    </div>
  `,
  styles  : [ require('./app.scss') ],
  directives : [ NavComponent, MenuComponent, RouterLink, ROUTER_DIRECTIVES ],
  encapsulation: ViewEncapsulation.None,
  pipes: [AsyncPipe]
})
export class AppContainer implements OnInit {
  private helloWorldMsg: string;
  constructor(){
    this.helloWorldMsg = "RCV is cool!";
  }
  
  ngOnInit() {

  }
}

