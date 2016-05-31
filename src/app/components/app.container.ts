import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from '../state/app.service';


@Component( {
  selector     : "rcv-app",
  styles       : [ require( './app.scss' ) ],
  encapsulation: ViewEncapsulation.None,
  providers    : [ AppService ],
  template     : ` <route-view></route-view>`,
} )
export class AppContainer {
}


