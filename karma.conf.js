var webpackConfig = require('./webpack.config.test.js');
webpackConfig.plugins =[];
module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],

        reporters: ['progress', 'mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        autoWatchBatchDelay: 300,

        files: [
            'spec-bundle.js'
        ],

        preprocessors: {
            'spec-bundle.js': ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        }
    });
}