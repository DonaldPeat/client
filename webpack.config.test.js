var webpack = require('webpack'),
    path = require('path'),
    merge = require('webpack-merge'),
    JasminePlugin = require('jasmine-webpack-plugin'),
    defaultConfig = require('./webpack.config');

module.exports = merge(defaultConfig, {
    entry: ['./src/spec.ts'],
    output: {
        path: path.resolve(__dirname, "tmp"),
        publicPath: '/js/',
        filename: 'spec.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'deps.js'),
        new JasminePlugin({filename:'./SPEC_RUNNER.html'})
    ]
});
