import { Component, OnInit, AfterContentInit, Inject, AfterViewInit } from 'angular2/core';
import { Polls } from '../models/polls';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs/Observable';
import { Poll } from '../models/poll';
import { Candidate } from '../models/candidate';
import { Vote } from '../models/vote';

@Component({
  selector: 'vote-input',
  directives: [],  
  template: `
    <div *ngFor="#cand of candidates$ | async">
      <div>{{cand.name}}</div>
    </div>
`
})
export class VoteInputContainer implements AfterViewInit {
  poll$: Observable<Poll>;
  candidates$: Observable<string[]>;
  constructor(private polls: Polls){
    this.poll$ = this.polls.load("asdf").take(1);
    this.candidates$ = this.poll$.map(poll => poll.candidates);

    this.poll$.subscribe(poll => {
      
      //.toJS() just converts from immutable collections to plain JS arrays so it's easy to play with them
      let cands: Candidate[] = poll.candidates.toJS(),
          votes: Vote[] = poll.votes.toJS();

      debugger;
    });

  }



  ngAfterViewInit() {



  };
}