import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy} from "angular2/core";
import {RouterLink, ROUTER_DIRECTIVES} from "angular2/router";
import {AsyncPipe} from "angular2/common";
import {MenuComponent} from "./menu/menu.component.ts";
import {CoreState} from "../store/core.state";
import {NavComponent} from "./nav/nav.component.ts";

//noinspection TypeScriptUnresolvedFunction
@Component({
  selector   : "rcv-app",
  template: `
    
    <div layout="column" layout-fill class="app-wrapper">
      <rcv-nav [menuOpen]="state.menuOpen$ | async" (toggleMenu)="state.toggleMenu()"></rcv-nav>
      
  
    </div>
  `,
  styles  : [ require( './app.scss') ],
  directives : [ NavComponent, MenuComponent, RouterLink, ROUTER_DIRECTIVES ],
  providers: [CoreState],
  encapsulation: ViewEncapsulation.None,
  pipes: [AsyncPipe]
})
export class AppContainer implements OnInit {
  private helloWorldMsg: string;
  
  constructor(private state: CoreState){
    this.helloWorldMsg = "RCV is sd!";
  }
  
  ngOnInit() {

  }
}

