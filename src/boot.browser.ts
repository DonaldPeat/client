//angular
import { provide, PLATFORM_DIRECTIVES } from "@angular/core";
import { bootstrap } from "@angular/platform-browser-dynamic";
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, APP_BASE_HREF, PathLocationStrategy } from '@angular/common';


//vendor
import { provideStore, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { provideRouter } from '@ngrx/router';
import { runEffects } from '@ngrx/effects';

import { MATERIAL_DIRECTIVES } from "./vendor";

import { MdIconRegistry } from '@angular2-material/icon';

const PlatformDirectives = [
  ...MATERIAL_DIRECTIVES
];

//app
import { AppContainer } from "./app/components/app.container";
import { ROUTES } from './app/routes';
import { Polls } from './app/models/polls'
import { RcvActions } from './app/actions';
import { sim } from './app/reducers/sim.reducer';
import { SimulationEffects } from './app/effects';


bootstrap( AppContainer, [
  HTTP_PROVIDERS,
  Polls,
  RcvActions,
  provide( APP_BASE_HREF, { useValue: '/' } ),
  provide( LocationStrategy, { useClass: PathLocationStrategy } ),
  MdIconRegistry,
  { provide: PLATFORM_DIRECTIVES, multi: true, useValue: PlatformDirectives },
  provideStore( compose(
      storeLogger(),
      combineReducers
  )( { sim } ) ),
  provideRouter( ROUTES ),
  runEffects( SimulationEffects )
] );
