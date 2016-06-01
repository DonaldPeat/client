import { Component, ViewEncapsulation } from '@angular/core';


@Component( {
  selector     : "rcv-app",
  styles       : [ require( './../app.scss' ) ],
  encapsulation: ViewEncapsulation.None,
  template     : ` <route-view></route-view>`,
} )
export class AppContainer {
}


