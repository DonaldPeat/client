import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
 * This is the "dumb component" - it's "dumb" because it doesn't know anything about the rest of the application. It just
 * knows it's going to get a poll as an input, and
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
   * streams and codify the causal relationships between them into our "reactive architecture"
   */
  ngOnInit(){
    /**
     * https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/scan.md
     * Given current round is 3, user clicks previous: result = 3, change = -1, so round becomes 3 + -1 = 2
     * start with 0
     */
    const round$ = this.roundClicks$.scan((result, change)=> result + change , 0);

    /**
     * The number of eliminated candidates should always be one less than the current round #. So, we map  to changes
     * in the round number and
     * number changes,
     */
    const eliminated$ = round$.map(round => {
      return Array(round-1).fill(0).reduce((elims, i)=>{  // Array(round-1)...reduce() == "for i in range(0, round-1)...reduce()"
        return elims.concat([this.findLoser(this.poll.candidates, this.poll.votes, elims).id]);
      }, []);
    });

    /**
     * TODO - stream of "manual-removals" of candidates by the user
     */
    const removed$: Observable<string[]> = Observable.of([]);

    /**
     * The "vote distribution stream" - who has which votes at any given point - is purely a function of which candidates have
     * been eliminated and removed. So, we watch for changes in either of those (combineLatest...), and execute a pure
     * function that distributes the votes
     */
    const votes$: Observable<{[id: string]:Vote[]}> = Observable.combineLatest(
        eliminated$, removed$,
        (elims, removeds) => {
          let inactives = _.union(elims, removeds),
              isActive = (id: string) => !_.includes(inactives, id),
              init =  this.poll.candidates.reduce((dict, cand)=> { dict[cand.id]=[]; return dict;}, {});

          return <{[id: string]:Vote[]}>this.poll.votes.reduce((dict, vote) => {
            for (let i = 0; i < vote.choices.length; i++){
              if (isActive(vote.choices[i])){
                dict[vote.choices[i]].push(vote);
                break;
              }
            }
            return dict;
          }, init);
        }
    );

    /**
     * Purely a convenience stream, calculates the total number of votes contained in each vote distribution
     * (note that this is necessary because the total number of votes will decrease as votes are exhausted)
     */
    const totalVotes$: Observable<number> =
              votes$.map(dict => <number>_.values(dict).reduce((sum: number, arr: Array<any>) => sum + arr.length, 0));

    /**
     * This is essentially a convenience stream too, coalescing values obtained from the other streams into a single  
     * "state" construct that can be passed around / referenced in templates more easily. 
     */
    const cands$: Observable<Candidate[]> = Observable.combineLatest(
        eliminated$,
        removed$,
        votes$,
        (elims, removeds, votes) => {
          let isRemoved = (id: string) => _.includes(removeds, id),
              isEliminated = (id: string) => _.includes(elims, id),
              toReturn = mutable(this.poll).candidates.map(cand => {
                            return {
                              score: votes[cand.id].length,
                              eliminated: isEliminated(cand.id),
                              removed: isRemoved(cand.id),
                              name: cand.name,
                              id: cand.id,
                              photo: cand.photo
                            };
                          });
          return <Candidate[]> immutable(toReturn);
        }
    );

    this.round$ = round$;
    this.totalVotes$ = totalVotes$;
    this.cands$ = cands$;

/*  Use these for testing
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


  private findLoser(cands: Candidate[], votes: Vote[], elims: string[]){
    let isEliminated = (id: string) => _.includes((elims || []), id),
        scores = this.calcScores(cands, votes, elims),
        score = (id: string) => scores[id] || 0,
        loScore = Math.min(...cands.filter(cand => ! isEliminated(cand.id))
                                   .map(cand => score(cand.id)));
    return cands.filter(cand => !isEliminated(cand.id))
                .filter(cand => score(cand.id) == loScore)[0]; //TODO randomize
  }

  private calcScores(cands: Candidate[], votes: Vote[], eliminated: string[]): {[candId:string]: number}{
    let ret: {[candId:string]: number} = {},
        isEliminated = (id:string) => _.includes((eliminated || []), id);

    votes.forEach(vote => {
      for (let i = 0; i < vote.choices.length; i++){
        if (!isEliminated(vote.choices[i])) {
          if (ret[vote.choices[i]] == undefined) ret[vote.choices[i]] = 0;
          ret[vote.choices[i]] += 1;
          break;
        }
      }
    });
    return ret;
  }
}