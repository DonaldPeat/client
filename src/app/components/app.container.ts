import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy} from "angular2/core";
import {RouterLink, ROUTER_DIRECTIVES} from "angular2/router";
import {AsyncPipe} from "angular2/common";
import {Devtools} from '@ngrx/devtools';
import {NavComponent} from "./nav/nav.component";
import { MenuComponent } from './menu/menu.component';
import { AppService } from '../state/app.service';

@Component({
  selector   : "rcv-app",
  styles  : [ require( './app.scss') ],
  directives : [ NavComponent, RouterLink, MenuComponent, Devtools ],
  encapsulation: ViewEncapsulation.None,
  providers: [AppService],
  template: `
     <div layout="column" layout-fill class="app-wrapper">
       <rcv-nav [menuOpen]="state.menuOpen$ | async" (toggleMenu)="state.toggleMenu()"></rcv-nav>
        <div layout="row" layout-align="start stretch" flex>
          <rcv-menu [isOpen]="state.menuOpen$ | async"></rcv-menu>
          <route-view></route-view>
        </div>  
      </div>
      <ngrx-devtools style="font-size:0.5em;"></ngrx-devtools>
      
  `,
})
export class AppContainer implements OnInit {
  private helloWorldMsg: string;
  constructor(private state: AppService){
  }
  
  ngOnInit() {

  }
}

