/**
 * Created by moore on 4/27/2016.
 */

import { Component } from '@angular/core';
import { Poll, IPoll } from '../models/poll';
import { Observable } from 'rxjs/Observable';
import { Polls } from '../models/polls';
import { SimComponent } from './sim.component';

/**
 * "Smart component" - it's aware of the rest of the application, and
 *
 */

@Component( {
  selector  : 'rcv-sim-container',
  directives: [ SimComponent ],
  host      : {
    'layout-fill': ''
  },
  template  : `
    
    <sim-inner [poll]="pollSync">
    
      
    </sim-inner>

  `
} )
export class RcvSimContainer {
  poll$: Observable<Poll>;
  pollSync: IPoll;

  constructor(private polls: Polls) {
    let pollId = "asdf"; //in the finished app, we'll be getting this value from the URL
    // this.poll$ = polls.load(pollId);
    this.pollSync = polls.loadSync( 'sadf' );
  }

}