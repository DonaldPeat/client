

//angular
import {provide, PLATFORM_DIRECTIVES} from "@angular/core";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, APP_BASE_HREF, PathLocationStrategy } from '@angular/common';



//vendor
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
  provideStore({ app }),
  provideRouter(ROUTES),
  usePreMiddleware(actionLog),
  usePostMiddleware(stateLog),
  instrumentStore(),
]);
