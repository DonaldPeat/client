import { Component, Input, OnInit } from 'angular2/core';
import { Poll } from '../models/poll';
import { Candidate } from '../models/candidate';
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
        <div>{{cand.name}}: <span>{{candVotes[i]}} {{printOtherVotes(cand)}}</span></div>
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
  private candOtherVotes: Array[];
  private candNames: string[];

  ngOnInit(){
    let cands = this.poll.candidates.toJS(),
        votes = this.poll.votes.toJS();

    //setup

    // Holds all the candidates' ids, the positions actually matter
    // because it holds a specific candidate's information, and
    // their positions must not be changed. However, we can
    // modify the value at any positions.
    this.candIds = cands.map(cand => cand.id);
    // Holds all the candidates' ids, but won't be modified at all.
    this.originalCandIds = cands.map(cand => cand.id);

    // Again, candIds and originalCandIds have the same position throughout
    // the entire program, and their positions must not be changed.

    //All the vote objects from the current poll
    this.votes = this.poll.votes.toJS();

    // An Array of Arrays; the outer array's positions correspond to the candidates in
    // originalCand, the inner array positions correspond to the candidate's
    // ally votes and those positions correspond to the votes from the candidates
    // in originalCand.
    this.candOtherVotes = cands.map(cand=>cand.otherVotes);

    //All the candidates' names
    this.candNames = cands.map(cand=>cand.name);

    //An array of votes that corresponds to the candidates in originalCand
    this.candVotes = this.getVotes(this.candIds);

    //A log to keep track of different progresses
    this.progressHistory = [];

  }

  /* @Param Takes in Candidate Id's
   * @Return An array of number of votes corresponding to the array of Candidate Ids
   */
  getVotes(candIds: string[]): number[] {

    //Reset ally votes to remove interconnectedness between rounds
    //Each round should be unique and isolated from other rounds
    this.candOtherVotes = this.candOtherVotes.map(x=> new Array(this.originalCandIds.length).fill(0));

    var candVoteResult = new Array(candIds.length).fill(0);

    for ( let userVote of this.votes ) {
      var userVoteChoices: OrderedSet<String> = userVote.choices;
      //Counter to keep track of the rank of choice
      var i = 0;
      for ( let choice of userVoteChoices ) {
        let cand = candIds.indexOf(choice);
        //Check if its the first choice, if so, save this candidate position.
        if ( i== 0 ) {
          var firstChoiceCand = this.originalCandIds.indexOf(choice);
        }
        //Check if the candidate is still in the race
        if ( cand != -1 ) {
          //Check if the candidate is not their first choice
          if ( i > 0 ) {
            this.candOtherVotes[cand][firstChoiceCand] += 1 ;
          }
          //The candidate's total votes
          candVoteResult[cand] += 1;
          break;
        }
        i++;
      }
    }
    return candVoteResult;
  }

  //Print the candidate's ally votes, iff they have them.
  printOtherVotes(candidate: Candidate): string {
    var result = "";

    //Selects the candidate from the position in originalCandIds
    var cand = this.originalCandIds.indexOf(candidate.id);

    //Counter to check if there's more than one candidate printed, this is just a style of printing.
    var k = 0;
    for ( let j = 0 ; j < this.candOtherVotes[cand].length ; j++ ) {
      //If there's ally votes from this candidate
      if ( this.candOtherVotes[cand][j] != 0 ) {
        if ( k== 0) {
          result = " has " + this.candOtherVotes[cand][j] + " vote(s) ";
          result += "from " + this.candNames[j];
          k++;
        } else {
          result += " , " + this.candOtherVotes[cand][j] + " vote(s) ";
          result += "from " + this.candNames[j];
        }
      }
    }

    return result;

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
      this.candVotes = this.getVotes(this.candIds);
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