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
     <div>
        <span>
            <button (click)="progressToPrevRound();">Previous Round</button>
            <button (click)="progressToNextRound();" >Next Round</button>
            <button (click)="progressToWinner();">End Result</button>
        </span>
     </div>
     
      <div>The total number of votes: {{getTotalVotes()}}</div>
      <div *ngFor="#cand of poll.candidates #i = index">
        <div>{{cand.name}}: <span>{{candVotes[i]}}</span> </div>
    </div>

  `
})
export class ResultsDumbComponent implements OnInit {
  @Input() poll: Poll;

  private votes: Vote[];
  private candVotes: number[];
  private candIds: string[];
  private progressHistory: {candIdsArray: string[], candVotesArray: number[]}[];
  private originalCandIds: string[];

  ngOnInit(){
    let cands = this.poll.candidates.toJS(),
        votes = this.poll.votes.toJS();

    this.candIds = cands.map(cand => cand.id);
    this.originalCandIds = cands.map(cand => cand.id);

    this.votes = this.poll.votes.toJS();

    this.candVotes = this.getVotes(this.candIds);

    this.progressHistory = [];

  }

  getVotes(candIds: string[]): number[] {
    var candVoteResult = new Array(candIds.length).fill(0);

    for ( let userVote of this.votes ) {
      var userVoteChoices: OrderedSet<String> = userVote.choices;

      for ( let choice of userVoteChoices ) {
        let cand = candIds.indexOf(choice);
        if ( cand != -1 ) {
          candVoteResult[cand] += 1;
          break;
        }
      }

    }
    return candVoteResult;
  }

  progressToNextRound() {
    var highestVoteValue = Math.max.apply(Math,this.candVotes);

    if ( this.getTotalVotes()*0.5 > highestVoteValue ) {

      //Clone-ing the object here, otherwise it would just modify the object.
      this.progressHistory.push(JSON.parse(JSON.stringify({
        candIdsArray: this.candIds,
        candVotesArray: this.candVotes
      })));

      var lowestVoteValue = Math.min.apply(Math, this.candVotes.filter(x => {return x !== 0;}));

      for (let i = 0; i < this.candVotes.length; i++) {
        if (this.candVotes[i] == lowestVoteValue || this.candVotes[i] == 0) {
          this.candIds[i] = null;
        }
      }

      //Recount the votes for all the candidates
      this.candVotes = this.getVotes(this.candIds);

    }


  }

  progressToPrevRound() {
    if (this.progressHistory.length != 0) {
      var prevRound = this.progressHistory.pop();
      this.candIds = prevRound.candIdsArray;
      this.candVotes = prevRound.candVotesArray;

    }
  }

  progressToWinner() {
    var maxValue = Math.max.apply(Math,this.candVotes);
    while ( this.getTotalVotes()*0.5 > maxValue ) {
      console.log(this.getTotalVotes()*0.5, maxValue);
      this.progressToNextRound();
      debugger;
    }
  }

  getTotalVotes(): number {
    return this.votes.length;
  }
  
}