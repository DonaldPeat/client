// This file is to bundle all dependencies into a single file apart from the actual app, using webpack

//polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');

import 'ts-helpers';


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

//misc
import 'lodash';
import 'd3';
import 'seamless-immutable';
import 'moment';


