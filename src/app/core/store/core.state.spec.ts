declare var describe, it, expect, hot, cold, expectObservable, expectSubscriptions, console, beforeEach;

import {Observable} from "rxjs/Observable";
import {provideStore} from "@ngrx/store";
import {Injector} from "angular2/core";
import {core} from "./core.reducer.ts";
import {CoreState} from "./core.state.ts";


describe('CoreStateService', ()=> {
  let svc: CoreState;

  beforeEach(()=> {
    svc = Injector.resolveAndCreate([
      provideStore({ core }),
      CoreState
    ]).get(CoreState);
  });

  it('should be defined and provide a menuOpen$ observable', ()=> {
    expect(svc).toBeDefined();
    expect(svc.menuOpen$).toBeAnInstanceOf(Observable);
  });

  it('should be immutable', ()=> {
    expect(()=> {svc.menuOpen$ = null}).toThrow();
    expect(svc.menuOpen$).not.toEqual(null);
  });

  it('should publish the expected menuOpen$ observable', ()=> {

    const callSequence = '--a--b---a-b----a',
      stateSequence = 'b-a--b---a-b----a',
      vals = { a: true, b: false },
      toggles = hot(callSequence);

    toggles.subscribe(val=> svc.toggleMenu());

    expectObservable(svc.menuOpen$).toBe(stateSequence, vals)

  });

  //it('')


});
