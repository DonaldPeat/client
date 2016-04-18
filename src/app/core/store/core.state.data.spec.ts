import {it, describe, expect, beforeEach} from "angular2/testing";
import {CoreStateDataRecord} from "./core.state.data.ts";


describe('CoreState', ()=> {
  let state: CoreStateDataRecord;

  beforeEach(()=> {
    state = new CoreStateDataRecord();
  });

  it('should initially return false for menuOpen', ()=> {
    expect(state.menuOpen).toBe(false);
  });

  it('should be immutable', ()=> {
    expect(()=> {state.menuOpen = true}).toThrow();
  });

  it('should return new instances with expected menuOpen values on calls to withMenuOpen()', ()=> {
    let toggled = state.toggleMenu();
    expect(toggled.menuOpen).toBe(true);

    toggled = toggled.toggleMenu();
    expect(toggled.menuOpen).toBe(false);

    toggled = toggled.toggleMenu();
    expect(toggled.menuOpen).toBe(true);
    
    expect(state.menuOpen).toBe(false);
  })

});
