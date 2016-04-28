///<reference path="../node_modules/angular2/typings/browser.d.ts"/>


//angular
import {provide, PLATFORM_DIRECTIVES} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {HTTP_PROVIDERS } from 'angular2/http';
import { LocationStrategy, APP_BASE_HREF, PathLocationStrategy } from 'angular2/platform/common';



//vendor
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {provideStore, usePostMiddleware, usePreMiddleware} from '@ngrx/store';
import {provideRouter} from '@ngrx/router';
import {instrumentStore} from '@ngrx/devtools';


//app
import {AppContainer} from "./app/components/app.container";
import {actionLog, stateLog} from "./app/common/middleware";
import { ROUTES } from './app/routes';
import { app } from './app/state/app.reducer';
import { Polls } from './app/models/polls';




bootstrap(AppContainer, [
  HTTP_PROVIDERS,
  Polls,
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(LocationStrategy, { useClass: PathLocationStrategy }),
  provide(PLATFORM_DIRECTIVES, { useValue: MATERIAL_DIRECTIVES, multi: true }),
  provideStore({ app }),
  provideRouter(ROUTES),
  usePreMiddleware(actionLog),
  usePostMiddleware(stateLog),
  instrumentStore(),
]);
