// This file is to bundle all dependencies into a single file apart from the actual app, using webpack

//angular
import 'angular2/bundles/angular2-polyfills';

import 'angular2/platform/browser';
import 'angular2/core';
import 'angular2/http';
import 'angular2/router';

//rx
import 'rxjs/Rx';

//ngrx
import '@ngrx/store';
import '@ngrx/devtools';
import '@ngrx/router';

//misc

import 'ng2-material/all';
import 'lodash';
import 'd3';
import 'immutable';
import 'moment';


