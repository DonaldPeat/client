import { Component, Input, OnInit } from 'angular2/core';
import { Poll } from '../models/poll';
import {Candidate} from '../models/candidate';
import { Vote } from '../models/vote';
import { OrderedSet } from "immutable";

/**
 * This is the "dumb component" - it's "dumb" because it doesn't know anything about the rest of the application. It just 
 * knows it's going to get a poll as an input, and 
 */

@Component({
  selector: 'results-inner',
  template: `
     <div class="results-wrapper"><span><Button (click)="getPrevRound();">Previous Round</Button></span><Button (click)="getNextRound();" >Next Round</Button></div>
      <div>The total number of votes: {{getTotalVotes()}}</div>
    <div *ngFor="#cand of poll.candidates; #i = index">
      <div >{{cand.name}}: <span>{{candVotes[i]}}</span> </div>
    </div>

  `
})
export class ResultsDumbComponent implements OnInit {
  @Input() poll: Poll;

  private votes: Vote[];
  private candVotes: number[];
  private candNames: string[];
  private resultHistory: Object[];

  ngOnInit(){
    let cands = this.poll.candidates.toJS(),
        votes = this.poll.votes.toJS();

    this.votes = this.poll.votes.toJS();

    this.candNames = new Array(cands.length);

    for (let i = 0 ; i < cands.length ; i++) {
      this.candNames[i] = cands[i].id;
    }

    this.candVotes = this.getVotes(this.candNames);

    this.resultHistory = [];

    debugger;
  }

  getVotes(candIds: string[]): number[] {
    var sum = new Array(candIds.length).fill(0);

    for ( let userVotes of this.votes ) {
      var userChoices: OrderedSet<String> = userVotes.choices;

      for ( let n of userChoices ) {
        let number = candIds.indexOf(n);
        if ( number != -1 ) {
          sum[number] += 1;
          break;
        }
      }

    }

    return sum;
  }

  getNextRound() {
    this.resultHistory.push({
      NameArray: this.candNames,
      VoteArray: this.candVotes
    });
    console.log(this.resultHistory);

    var minValue = Math.min.apply(Math,this.candVotes.filter( x => { return x !== 0; }));

    for( let i = 0 ; i < this.candVotes.length ; i++ ) {
      if (this.candVotes[i] == minValue || this.candVotes[i] == 0) {
        this.candNames[i] = null;
      }
    }

    this.candVotes = this.getVotes(this.candNames);

  }

  getPrevRound() {
    if (this.resultHistory.length != 0) {
      var prevRound = this.resultHistory.pop();
      this.candNames = prevRound.NameArray;
      this.candVotes = prevRound.VoteArray;
      console.log("test2",this.resultHistory);
    }
  }

  getTotalVotes() {
    return this.votes.length;
  }
  
}