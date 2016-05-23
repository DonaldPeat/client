import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Devtools } from '@ngrx/devtools';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { AppService } from '../state/app.service';


@Component({
  selector   : "rcv-app",
  styles  : [ require( './app.scss') ],
  directives : [ NavComponent, MenuComponent, Devtools ],
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
      
  `,
})
export class AppContainer implements AfterViewInit {

  constructor(private state: AppService){

  }
  
  ngAfterViewInit() {

        
  };
}


