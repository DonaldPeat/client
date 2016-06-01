import * as _ from 'lodash';
import * as d3 from 'd3';
import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';
import { Vote } from '../models/vote';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { SimulationState } from '../reducers/sim.reducer';
import { RcvActions } from '../actions';
import { PollData, Poll } from '../models/poll';
import { mutable } from '../common/mutability';


@Injectable()
export class Simulation {


  private state$: Observable<SimulationState>;

  private pollData$: Observable<Poll>;

  constructor(private _store: Store<SimulationState>, private actions: RcvActions) {
    this.state$ = this._store.select<SimulationState>( 'sim' );
    this.pollData$ = this.state$.map( state => state.poll );
  }

  public load(id: string): void {
    this._store.dispatch( this.actions.loadPollData( id ) );
  }

  public nextRound(): void {
    this._store.dispatch( this.actions.nextRound() );
  }

  public prevRound(): void {
    this._store.dispatch( this.actions.prevRound() );
  }

  public skipToStart(): void {
    this._store.dispatch( this.actions.skipToStart() );
  }

  public removeCandidate(id: string): void {
    this._store.dispatch(this.actions.candRemoved(id));
  }


  public get round$(): Observable<number> {
    return this.state$.map( state => state.round );
  }

  /**
   * A stream of the IDs of candidates that the user has manually removed from the election
   */

  public get removed$(): Observable<string[]> {
    return this.state$.map( state => state.removed );
  }

  /**
   * The number of eliminated candidates should be exactly one less than the number of the current round. Obviously, which n-1
   * candidates should be removed in round n is purely a function of the choice preferences specified in the votes. So, here we
   * map the stream of what round we're on to the result of a reduction that runs findLoser() n-1 times:
   *
   */
  public get eliminated$(): Observable<string[]> {
    return this.round$.withLatestFrom( this.pollData$,
        (round, poll)=> {
          return _.range( 1, round )
                  .reduce( (result, num)=> result.concat( findLoser( poll.votes, result ) ), <string[]>[] )
        } ).startWith( [] );
  }

  public get votes$(): Observable<{[id: string]: Vote[]}> {
    return this.eliminated$.withLatestFrom( this.pollData$, this.removed$,
        (elims, poll, removeds)=> {
          return distributeVotes( poll.votes, _.union( elims, removeds ) );
        } );
  }

  public get totalVotes$(): Observable<number> {
    return this.votes$.map( idVotesMap => {
      return _.reduce( idVotesMap, (sum = 0, votes, id)=> sum + votes.length, 0 )
    } );
  }


  public get candidates$(): Observable<Candidate[]> {
    return this.votes$.withLatestFrom( this.pollData$, this.eliminated$, this.removed$,
        (votes, poll, elims, removeds) => {
          return poll.candidates.map( cand => ({
            name      : cand.name,
            id        : cand.id,
            photo     : cand.photo,
            votes     : votes[ cand.id ] || [],
            score     : (votes[ cand.id ] || []).length,
            color     : cand.color,
            eliminated: _.includes( elims, cand.id ),
            removed   : _.includes( removeds, cand.id ),
          }) )
        }
    );

  }


}


/************   HELPER FUNCTIONS  *******************/


/**
 * @param votes: a set of votes
 * @param eliminated: a set of ID's of eliminated candidates
 * @returns {{[id:string]: IVote[]}} a map of candidate IDs to the arrays of votes held by that candidate
 */
function distributeVotes(votes: Vote[], eliminated: string[]): {[candId: string]: Vote[]} {

  const isEliminated                    = (id: string) => _.includes( eliminated, id ),
        ids                             = _.uniq( _.flatMap( votes, vote => vote.choices ) ), // TODO be way more efficient than this
        initial: {[id: string]: Vote[]} = ids.reduce( (result, id)=> {
          result[ id ] = [];
          return result;  //can't wait for object spread
        }, {} );

  return votes.reduce( (resultMap, vote)=> {
    for (let i = 0; i < vote.choices.length; i++) {
      if (!isEliminated( vote.choices[ i ] )) {
        resultMap[ vote.choices[ i ] ].push( vote );
        return resultMap;
      }
    }
    return resultMap;
  }, initial );

}


/**
 * @param votes: a set of votes (each specifying choices as an ordered set of candidate IDs )
 * @param eliminated: a set of id's of already-eliminated candidates
 * @returns {string} the ID of the next candidate to be eliminated
 */
function findLoser(votes: Vote[], eliminated: string[]): string {
  const isEliminated = (id: string) => _.includes( (eliminated || []), id ),
        ids          = _.uniq( _.flatMap( votes, vote => vote.choices ) ),  // TODO be way more efficient than this
        scores       = distributeVotes( votes, eliminated ),
        score        = (id: string) => scores[ id ] || 0,
        actives      = ids.filter( id => !isEliminated( id ) );

  return _.minBy( actives, id => score( id ) );
}


/**
 * @param cands: an array of candidates, hydrated with votes
 * @returns {boolean} whether or not we have a winner
 */
function isGameOver(cands: Candidate[]): boolean {
  //TODO donald

  let tot = cands.filter( cand => !(cand.eliminated || cand.removed) ).reduce( (sum, cand) => {
    return sum + cand.score;
  }, 0 );

  return _.reduce( cands, (result, cand) => {
    return cand.score >= tot * 0.5;
  } );
}

