import { Component, Input, OnInit } from 'angular2/core';
import { Poll } from '../models/poll';

/**
 * This is the "dumb component" - it's "dumb" because it doesn't know anything about the rest of the application. It just 
 * knows it's going to get a poll as an input, and 
 */

@Component({
  selector: 'results-inner',
  template: `
    <div *ngFor="#cand of poll.candidates">
      <div>{{cand.name}}</div>
    </div>

  `
})
export class ResultsDumbComponent implements OnInit {
  @Input() poll: Poll;
    
  
  ngOnInit(){
    let cands = this.poll.candidates.toJS(),
        votes = this.poll.votes.toJS();
    
    debugger;
  }
  
}