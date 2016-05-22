"use strict";
//angular
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
//vendor
var store_1 = require('@ngrx/store');
var router_1 = require('@ngrx/router');
var devtools_1 = require('@ngrx/devtools');
//app
var app_container_1 = require("./app/components/app.container");
var middleware_1 = require("./app/common/middleware");
var routes_1 = require('./app/routes');
var app_reducer_1 = require('./app/state/app.reducer');
var polls_1 = require('./app/models/polls');
platform_browser_dynamic_1.bootstrap(app_container_1.AppContainer, [
    http_1.HTTP_PROVIDERS,
    polls_1.Polls,
    core_1.provide(common_1.APP_BASE_HREF, { useValue: '/' }),
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.PathLocationStrategy }),
    store_1.provideStore({ app: app_reducer_1.app }),
    router_1.provideRouter(routes_1.ROUTES),
    store_1.usePreMiddleware(middleware_1.actionLog),
    store_1.usePostMiddleware(middleware_1.stateLog),
    devtools_1.instrumentStore(),
]);
//# sourceMappingURL=boot.browser.js.map