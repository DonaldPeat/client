// This file is to bundle all dependencies into a single file apart from the actual app, using webpack



//angular
import '@angular/core';
import '@angular/common';
import '@angular/compiler';
import '@angular/http';
import '@angular/router';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';

//rx
import 'rxjs/Rx';

//ngrx
import '@ngrx/store';
import '@ngrx/devtools';
import '@ngrx/router';

//material2
import { MdButton, MdAnchor } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdRadioGroup, MdRadioButton, MdRadioDispatcher } from '@angular2-material/radio';
import { MdProgressBar } from '@angular2-material/progress-bar';
import { MdSpinner, MdProgressCircle } from '@angular2-material/progress-circle';
import { MdToolbar } from '@angular2-material/toolbar';

/*
 * we are grouping the module so we only need to manage the imports in simple location
 */
export const MATERIAL_DIRECTIVES = [
  ...MD_SIDENAV_DIRECTIVES,
  ...[
    MdAnchor,
    MdButton,
    MdToolbar,
    MdCheckbox,
    MdRadioButton,
    MdRadioGroup,
    MdIcon,
    MdSpinner,
    MdProgressBar,
    MdProgressCircle
  ],
  ...MD_INPUT_DIRECTIVES,
  ...MD_LIST_DIRECTIVES,
  ...MD_CARD_DIRECTIVES
];

export const MATERIAL_PROVIDERS = [
  MdRadioDispatcher
];


//misc
import 'lodash';
import 'd3';
import 'seamless-immutable';
import 'moment';


