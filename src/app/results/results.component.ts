import { Component, Input, OnInit } from 'angular2/core';
import { Poll } from '../models/poll';
import { Candidate } from '../models/candidate';
import { Vote } from '../models/vote';
import { OrderedSet } from "immutable";

/**
 * This is the "dumb component" - it's "dumb" because it doesn't know anything about the rest of the application. It just 
 * knows it's going to get a poll as an input, and 
 */

@Component({
  selector: 'results-inner',
  template: `
      <div>We have a total vote of: {{getTotalVotes()}}</div>
    <div *ngFor="#cand of poll.candidates">
      <div>{{cand.name}}: <span>{{getVotes(cand)}}</span> </div>
    </div>

  `
})
export class ResultsDumbComponent implements OnInit {
  @Input() poll: Poll;

  private votes: Vote[];

  ngOnInit(){
    let cands = this.poll.candidates.toJS(),
        votes = this.poll.votes.toJS();

    this.votes = this.poll.votes.toJS();

    debugger;
  }

  getVotes(candidate: Candidate): number {
    var sum = 0;

    for ( let userVotes of this.votes ) {
      var userChoices:OrderedSet<String> = userVotes.choices;

      userChoices.forEach((voteId) => {
        if (voteId == candidate.id) {
          sum = sum + 1;
        }
        return true;
      });
    }
    return sum;
  }

  getTotalVotes() {
    console.log("test2");
    return this.votes.length;
  }
  
}