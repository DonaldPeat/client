/**
 * Created by moore on 4/27/2016.
 */

import { Component } from '@angular/core';
import { Poll } from '../models/poll';
import { Observable } from 'rxjs/Observable';
import { Polls } from '../models/polls';
import { ResultsDumbComponent } from './results.component';

/**
 * "Smart component" - it's aware of the rest of the application, and  
 * 
 */

@Component({
  selector: 'results',
  directives: [ ResultsDumbComponent],
  host: {
    'layout-fill': ''
  },
  template: `
    
    <results-inner [poll]="poll$ | async">
    
      
    </results-inner>

  `
})
export class ResultsContainer {
  poll$: Observable<Poll>;
  constructor(private polls: Polls){
    let pollId = "asdf"; //in the finished app, we'll be getting this value from the URL
    this.poll$ = polls.load(pollId);
    
    

  }
  
}