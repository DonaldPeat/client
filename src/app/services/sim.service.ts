import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';
import { Vote } from '../models/vote';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { SimulationState } from '../reducers/sim.reducer';
import { RcvActions } from '../actions';
import { Poll } from '../models/poll';


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
    this._store.dispatch( this.actions.candRemoved( id ) );
  }


  /**
   * The sequence of values at the center of our application is the stream of what round we're in - all other streams in the
   * application state are ultimately derived from this stream of numbers.
   *
   * What round we are in is purely a function of the sequence of clicks the user has made on the four navigational buttons:
   * next, previous, end, and start.  This is a natural use-case for a reducer function, so we use scan(), which is something like an
   * "async equivalent" of reduce() that emits an event for each result of the reducer function.

   * e.g. Current round is 3, user clicks previous: (curr = 3, move = -1) => 3 + (-1) = 2 :: 2 is emitted as the current round
   * https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/scan.md
   */

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

  /**
   * Which candidates hold what votes at any given time is purely a function of the choice preferences specified in the votes and
   * which candidates have been eliminated or removed. We model it thusly.
   */
  public get votes$(): Observable<{[id: string]: Vote[]}> {
    return this.eliminated$.withLatestFrom( this.pollData$, this.removed$,
        (elims, poll, removeds)=> {
          return distributeVotes( poll.votes, _.union( elims, removeds ) );
        } );
  }

  /**
   * Simple convenience stream of the total number of unexhausted votes, mapped from the stream of vote distributions
   */
  public get totalVotes$(): Observable<number> {
    return this.votes$.map( idVotesMap => {
      return _.reduce( idVotesMap, (sum = 0, votes, id)=> sum + votes.length, 0 )
    } );
  }

  /**
   * This is a convenience stream, wrapping the three streams above and returning their combined state as a single stream that can
   * be easily passed around referenced in templates.
   */
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

