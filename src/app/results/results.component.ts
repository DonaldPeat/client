import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import 'rxjs/Rx';
import { Poll } from '../models/poll';
import { Candidate } from '../models/candidate';
import { Vote } from '../models/vote';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { mutable, immutable } from '../common/mutability';
import { CandidateBarComponent } from './candidate.bar.ts';



/**
 * This component is "dumb" because it knows nothing about the rest of the application around it, just that it's going  
 * to be handed a Poll as an input. What it DOES know (but the "smart" components do not) is how to render a poll to the 
 * screen. 
 */

@Component({
  selector: 'results-inner',
  directives: [CandidateBarComponent],
  template: `
     <div>
        <span>
            <button (click)="progressToStart();">From Start</button>
            <button (click)="roundClicks$.next(-1);">Previous Round</button>
            <strong>{{round$ | async}}</strong>
            <button (click)="roundClicks$.next(1);" >Next Round</button>
            <button (click)="progressToWinner();">End Result</button>
        </span>
     </div>
     
      <div>The total number of votes: {{totalVotes$ | async}}</div>
      <div *ngFor="#cand of cands$ | async">
        <candidate-bar [candidate]="cand"></candidate-bar>
    </div>

  `
})
export class ResultsDumbComponent implements OnInit, AfterViewInit {
  @Input() poll: Poll;

  private cands$: Observable<Candidate[]>;
  private round$: Observable<number>;
  private totalVotes$: Observable<number>;

  private roundClicks$: Subject<number> = BehaviorSubject.create();

  /**
   * The goal here is to specify the entire execution of the application declaratively, vis a vis our definitions of
   * streams of user input and resultant streams of application state. The design challenge, then, is to identify these
   * streams and codify the causal relationships between them into our "reactive architecture".
   *
   */
  ngOnInit(){
    /**
     * The stream (i.e. sequence of values) at the center of our application is the number of the current round.
     * Everything else about the application's state can be derived as a pure function of what round we're in and the
     * original input - and that's exactly what we do in this class.
     *
     * What round we're in is determined entirely by how many times the user has clicked "next round" and "prev round" .
     * In other words, the stream of what round we're in is a function of the stream of user clicks on those buttons -
     * so that's how we model it.
     *
     * Observable.scan works like reduce - it executes the given function each time the source observable emits,
     * and emits each result.
     *
     * e.g. Current round is 3, user clicks "previous": (result = 3, change = -1) => 3 + (-1) = 2
     * 2 is emitted as the current round
     * https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/scan.md

     */
    const round$ = this.roundClicks$.scan((result, change)=> result + change , 0);

    /**
     * The number of eliminated candidates should always be one less than the current round, and which candidates have
     * been eliminated must (for domain reasons) be a pure function of the choices specified in the votes and what round
     * it is. So, with each new round, we take the original (immutable) data and run it through a pure function that
     * determines the eliminate
     *
     * You'd be correct in pointing out that we're doing (many times) more computation this way than we would be if we
     * cached the results in some sort of "current state" array or other data structure. However, the computational cost
     * is negligible here even for very large polls, and if it wasn't we could optimize in any number of ways (including
     * caching results). Much more importantly, abandoning imperative manipulation of mutable local state in favor of
     * defining the flow of the application declaratively makes it far easier to reason about (read: less prone to bugs)
     * and more readable (once you get the hang of observables).
     *
     */
    const eliminated$ = round$.map( round =>
            Array( round - 1 ).fill( 0 ).reduce( ( elims, i ) => // "for i in range(0, round-1), given an array of eliminated cands,"
               elims.concat( [ this.findLoser( elims ).id ] ) // find next cand to eliminate and add them to the array
                , [] ) // starting with an empty array  
                // return the array, i.e. emit the array as the set of currently eliminated candidates.
    );

    /**
     * TODO - stream of "manual-removals" of candidates by the user
     */
    const removed$: Observable<string[]> = Observable.of([]);

    /**
     * Who has what votes at any given point is a pure function of the votes and which candidates have been eliminated
     * or removed. So that's how we moddle it:
     *
     * FILL IN THE BLANK
     *
     */
    const votes$: Observable<{[id: string]: Vote[]}> = Observable.combineLatest(
        eliminated$, removed$,
        ( elims, removeds ) => this.distributeVotes(_.union(elims, removeds))
    );

    /**
     * Purely a convenience stream, calculates the total number of votes contained in each vote distribution
     * (note that this is necessary because the total number of votes will decrease as votes are exhausted)
     */
    const totalVotes$: Observable<number> =
              votes$.map(dict => {
                return _.reduce(dict, (sum = 0, votes, candId)=>{
                  return sum + votes.length;
                }, 0);
              });

    
    
    /**
     * This is essentially a convenience stream too, coalescing values obtained from the other streams into a single
     * "state" construct that can be passed around / referenced in templates more easily.
     */
    const cands$: Observable<Candidate[]> = Observable.combineLatest(
        eliminated$,
        removed$,
        votes$,
        ( elims, removeds, votes ) =>
            <Candidate[]> immutable(
                mutable( this.poll ).candidates.map( cand => ({
                  score     : votes[ cand.id ].length,
                  eliminated: _.includes( elims, cand.id ),
                  removed   : _.includes( removeds, cand.id ),
                  name      : cand.name,
                  id        : cand.id,
                  photo     : cand.photo
                }) )
            )
    );

    this.round$ = round$;
    this.totalVotes$ = totalVotes$;
    this.cands$ = cands$;

/* Use these for testing
    votes$.subscribe(x => {console.info('votes'); console.info(x);});
    eliminated$.subscribe(x => {console.info('elim'); console.info(x);});
    round$.subscribe(x => console.info(`ROUND ${x}`));
    cands$.subscribe(x => {console.info('CANDS'); console.info(x);}); */
  }

  ngAfterViewInit(){
    /**
     * this call sets everything in motion
     */
    this.roundClicks$.next(1);
  }


  private findLoser(alreadyEliminated: string[]){
    let isEliminated = (id: string) => _.includes((alreadyEliminated || []), id),
        scores = this.calcScores(this.poll.candidates, this.poll.votes, alreadyEliminated),
        score = (id: string) => scores[id] || 0;

    let loScore = Math.min(...this.poll.candidates.filter(cand => ! isEliminated(cand.id))
                                   .map(cand => score(cand.id)));

    return this.poll.candidates.filter(cand => !isEliminated(cand.id))
                .filter(cand => score(cand.id) == loScore)[0]; //TODO randomize
  }

  
  
  private distributeVotes(eliminated: string[]): {[candId:string]: Vote[]} {
    let isEliminated = (id: string) => _.includes(eliminated, id),
        initial =  <{[id: string]: Vote[]}> this.poll.candidates
                                                .reduce((dict, cand)=> { dict[cand.id]=[]; return dict;}, {});

    return this.poll.votes.reduce((dict, vote)=>{
      for (let i = 0; i < vote.choices.length; i++){
        if (! isEliminated(vote.choices[i])) {
          dict[vote.choices[i]].push(vote);
          return dict;
        }
      }
      // if we get here, then the vote is exhausted, so leave it with the (eliminated) last choice. (or.... ? )
      dict[vote.choices[0]].push(vote);
      return dict;
    }, initial);

  }
  
  private calcScores(cands: Candidate[], votes: Vote[], eliminated: string[]): {[candId:string]: number}{
    return <{[candId:string]: number}> _.transform(this.distributeVotes(eliminated), (result, votes, candId)=> {(
      result[candId] = votes.length
    )}
    );
  }
}