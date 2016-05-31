declare var hot, cold, expectObservable, expectSubscriptions;

import {beforeEachProviders, async, inject} from "@angular/core/testing";
import {TestComponentBuilder} from "@angular/compiler/testing"
import {Component} from "@angular/core";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {provideStore} from "@ngrx/store";
import { SimComponent } from './sim.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Poll } from '../models/poll';
import { mockPoll } from '../models/poll.mocks';


import '../../../tools/marble-testing/marble-testing';
import '../../../tools/marble-testing/test-helper';


describe( 'ResultsComponent', ()=> {


  it( 'should work',
      inject( [ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
        tcb.createAsync( TestCmpWrapper )
           .then( (root: any) => {
             /**
              * element is actual root element in the compiled HTML for our component
              */
             let element                  = root.debugElement.children[ 0 ].nativeElement,
                 /* resultsCmp is a reference to the component itself - we can use that to test that its state (variable values, etc)
                  * is what we expect it to be after different things happen */
                 resultsCmp: SimComponent = <SimComponent>root.debugElement.children[ 0 ].componentInstance;

             let DOM  = getDOM(), // DOM is a "simulated" DOM
                 prev = DOM.querySelectorAll( element, '#prev' ), // query the element for element's with id prev
                 next = DOM.querySelectorAll( element, '#next' ); //query the element for element's with id next


             expect( prev.length ).toBe(1); //expect that there is exactly one 
             expect( prev.length ).toBe(1);



         /*    At the moment, I can't get marble testing and angular's TestComponentBuilder to work together in the same test :-(
               You can use the marble testing tools in tests WITHOUT TCB - just make sure you do NOT import { it } from @angular/core
               (don't hesitate to ask for help here )

             let events      = {
                   n: -1,
                   p: 1
                 }, states   = {},
                 eventSeq    = '--n--n--n---n-----n--n-p---n-n--n',
                 stateSeq    = '--1--2--3---4-----5--6-5---6-7--8',
                 clickEvents = hot( eventSeq, events );

             clickEvents.subscribe( val => {
               console.log( JSON.stringify( val ) );
               resultsCmp.roundClicks$.next( val );

             } );

             expectObservable( resultsCmp.round$ ).toBe( stateSeq, { a: true, b: false } );

*/


           } );
      } ) );
} );

@Component({
             selector  : 'test',
             template  : `<results-inner [poll]="dummyPoll$ | async"></results-inner>`,
             directives: [ SimComponent ]
           })
class TestCmpWrapper {
  private dummyPoll$: Observable<Poll> = Observable.of(mockPoll);

}
