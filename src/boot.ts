//angular
import {provide, PLATFORM_DIRECTIVES} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import { LocationStrategy, APP_BASE_HREF, PathLocationStrategy } from 'angular2/platform/common';



//vendor
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {provideStore, usePostMiddleware, usePreMiddleware} from '@ngrx/store';
import {instrumentStore} from '@ngrx/devtools';


//app
import {AppContainer} from "app/container/app.container.ts";
import {actionLog, stateLog} from "./app/common/middleware";
import {core} from "./app/core/store/core.reducer";




bootstrap(AppContainer, [
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(LocationStrategy, { useClass: PathLocationStrategy }),
  provide(PLATFORM_DIRECTIVES, { useValue: MATERIAL_DIRECTIVES, multi: true }),
  provideStore({ core }),
  usePreMiddleware(actionLog),
  usePostMiddleware(stateLog),
  instrumentStore(),
]);
