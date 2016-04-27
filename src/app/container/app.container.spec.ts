import {it, describe, expect, TestComponentBuilder, beforeEachProviders, inject, async} from "angular2/testing";
import {Component} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {provideStore} from "@ngrx/store";
import {AppContainer} from "./app.container.ts";
import {core} from "../store/core.reducer";

describe('AppContainer', ()=> {
  beforeEachProviders(()=> [
    provideStore({core}),
    TestComponentBuilder
  ]);

  
    it('should work',
    inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TestECC)
                .then(rootTC => {
                  rootTC.detectChanges();
                  let appDOMEl = rootTC.debugElement.children[ 0 ].nativeElement;
                  let cmpInstance = rootTC.debugElement.children[ 0 ].componentInstance,
                    domEl = rootTC.debugElement.children[ 0 ].nativeElement;
                  expect(DOM.querySelectorAll(domEl, '.app-wrapper').length).toEqual(1);
                });
    }));
});


@Component({
  selector  : 'test-ecc',
  template  : '<rcv-app></rcv-app>',
  directives: [ AppContainer ]
})
class TestECC {
}
