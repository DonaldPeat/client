import {it, describe, expect, beforeEachProviders, inject, async} from "@angular/core/testing";
import {TestComponentBuilder} from "@angular/compiler/testing"
import {Component} from "@angular/core";
import {provideStore} from "@ngrx/store";
import {AppContainer} from "./app.container";


describe('AppContainer', ()=> {

  /*
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
    }));*/
  

});


@Component({
  selector  : 'test-ecc',
  template  : '<rcv-app></rcv-app>',
  directives: [ AppContainer ]
})
class TestECC {
}
