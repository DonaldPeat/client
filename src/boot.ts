//angular
import {provide, PLATFORM_DIRECTIVES} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {
    ROUTER_PROVIDERS, LocationStrategy, APP_BASE_HREF,
    PathLocationStrategy
} from "angular2/router";


//vendor
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {provideStore, usePostMiddleware, usePreMiddleware} from '@ngrx/store';
import {instrumentStore} from '@ngrx/devtools';


//app
import {AppContainer} from "./app/core/components/app.container.ts";


/*

 // testing systemjs setup

 import * as _ from 'lodash';
 import {Record, List} from 'immutable';

 let a = _.reduce(['asdf', 'asdf'], (x)=>{console.log('weeeeeeeeeeeeee');console.log(x);}),
 B = Record<any>({foo: 'bar', baz: 'foo'}),
 b = new B(),
 c: Reducer<any> = (state: any, action: Action) => {return state}

 console.log(b.baz);

 */

bootstrap(AppContainer, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(LocationStrategy, { useClass: PathLocationStrategy }),
  provide(PLATFORM_DIRECTIVES, { useValue: MATERIAL_DIRECTIVES, multi: true }),
  instrumentStore(),
]);
