import { Component, Input, OnInit } from 'angular2/core';
import { Poll } from '../models/poll';
import { Vote } from '../models/vote';
import { OrderedSet } from "immutable";
import * as _ from 'lodash';

/**
 * This is the "dumb component" - it's "dumb" because it doesn't know anything about the rest of the application. It just 
 * knows it's going to get a poll as an input, and 
 */

@Component({
  selector: 'results-inner',
  template: `
     <div>
        <span>
            <button (click)="progressToStart();">From Start</button>
            <button (click)="progressToPrevRound();">Previous Round</button>
            <button (click)="progressToNextRound();" >Next Round</button>
            <button (click)="progressToWinner();">End Result</button>
        </span>
     </div>
     
      <div>The total number of votes: {{getTotalVotes()}}</div>
      <div *ngFor="#cand of poll.candidates #i = index">
        <div>{{cand.name}}: <span>{{candVotes[i]}}</span></div>
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

    //setup

    //Holds all the candidates' ids
    this.candIds = cands.map(cand => cand.id);
    //Holds all the candidates' ids, but won't be modified
    this.originalCandIds = cands.map(cand => cand.id);

    //All the vote objects from the current poll
    this.votes = this.poll.votes.toJS();

    //An array of votes (number) corresponding to the array of candIds
    this.candVotes = this.getVotes(this.candIds);

    //A log to keep track of different progresses
    this.progressHistory = [];

  }

  /* @Param Takes in Candidate Id's
   * @Return An array of number of votes corresponding to the array of Candidate Ids
   */
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

  /*
   * eliminates candidate(s) according to the votes
   * from this.candVotes,and updates the votes at the end
   */
  progressToNextRound() {
    var highestVoteValue = Math.max(...this.candVotes);

    //Checks if we have found a winner
    if ( this.getTotalVotes()*0.5 > highestVoteValue ) {

      //Clone-ing the object here, otherwise it would just modify the object.
      this.progressHistory.push(JSON.parse(JSON.stringify({
        candIdsArray: this.candIds,
        candVotesArray: this.candVotes
      })));

      var lowestVoteValue = Math.min(...this.candVotes.filter(x => {return x !== 0;}));

      for (let i = 0; i < this.candVotes.length; i++) {
        //Checks if there are repeating lowest vote value
        if (this.candVotes[i] == lowestVoteValue || this.candVotes[i] == 0) {
          this.candIds[i] = null;
        }
      }

      //Recount the votes for all the candidates
      this.candVotes = this.getVotes(this.candIds);

    }

  }

  /* Using progressHistory to load the previous
   * this.candIds and this.candVotes
   */
  progressToPrevRound() {
    if (this.progressHistory.length != 0) {
      var prevRound = this.progressHistory.pop();
      this.candIds = prevRound.candIdsArray;
      this.candVotes = prevRound.candVotesArray;
    }
  }

  //Call progressToNextRound until it finds a winner
  progressToWinner() {
    var highestVoteValue = Math.max(...this.candVotes);
    while ( this.getTotalVotes()*0.5 > highestVoteValue ) {
      this.progressToNextRound();
      highestVoteValue = Math.max(...this.candVotes);
    }
  }

  //Restarts the simulation
  progressToStart() {
    //reset everything
    this.candIds = _.clone(this.originalCandIds);
    this.candVotes = this.getVotes(this.candIds);
    this.progressHistory = [];
  }

  //Returns the total number of votes
  getTotalVotes(): number {
    return this.votes.length;
  }
  
}