declare var hot, cold, expectObservable, expectSubscriptions;

import {beforeEachProviders, async, inject} from "@angular/core/testing";
import {TestComponentBuilder} from "@angular/compiler/testing"
import {Component} from "@angular/core";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {provideStore} from "@ngrx/store";
import { ResultsDumbComponent } from './results.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Poll } from '../models/poll';
import { mockPoll } from '../models/poll.mocks';

describe( 'ResultsComponent', ()=> {

  beforeEachProviders(()=> [
    TestComponentBuilder
  ]);

  it('should work', inject( [ TestComponentBuilder ], ( tcb: TestComponentBuilder ) => {
    return tcb.createAsync( TestCmpWrapper ).then( root => {
      // don't worry about understanding what's above this, just focus on below

      /* element is a reference to the actual HTML element - we can use it to test whether the elements on screen are
       * what we expect them to be, and can "artificially" trigger events on these elements (button clicks, etc.)  */
      let element = root.debugElement.children[ 0 ].nativeElement,
          /* resultsCmp is a reference to the component itself - we can use that to test that its state (variable values, etc)
           * is what we expect it to be after different things happen */
          resultsCmp: ResultsDumbComponent = <ResultsDumbComponent>root.debugElement.children[ 0 ].componentInstance;

      let DOM = getDOM(),
          prev = DOM.querySelectorAll(element, '#prev')[0],
          next = DOM.querySelectorAll(element, '#next')[0];

      expect(prev).toBeDefined();
      expect(next).toBeDefined();


      let events = {
            n: -1,
            p: 1
          }, states = {

          },
          eventSeq = '--n--n--n---n-----n--n-p---n-n--n',
          stateSeq = '--1--2--3---4-----5--6-5---6-7--8',
          clickEvents = hot(eventSeq, events);

      clickEvents.subscribe(val => {
        console.log(JSON.stringify(val));
        resultsCmp.roundClicks$.next(val);
        
      });

      expectObservable(resultsCmp.round$).toBe(stateSeq, {a: true, b: false});

      expect(true).toBe(true);


      //expect that the number of elements with class .cand-name matches the number of candidates in the poll
      expect( getDOM().querySelectorAll( element, '.results-wrapper' ).length ).toEqual( 1 );






      //TODO more tests here

      /* generally, you'd want to split these into multiple it(...) with specific descriptions, When we're testing 
        components though, there's a lot of overhead in creating them so I tend to break that rule and do a single 
        'should work' block. 
        */
    })
  }));

});

@Component({
             selector  : 'test',
             template  : `<results-inner [poll]="dummyPoll$ | async"></results-inner>`,
             directives: [ ResultsDumbComponent ]
           })
class TestCmpWrapper {
  private dummyPoll$: Observable<Poll> = Observable.of(mockPoll);

}
