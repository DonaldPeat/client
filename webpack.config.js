var webpack = require('webpack');
var path = require('path');
var jasminePlugin = require('jasmine-webpack-plugin');
var tsConfPath = path.join(__dirname, 'tsconfig.json');
var ignorePlugin = new webpack.IgnorePlugin(/src\/app\/*.(js|map)$/);

module.exports = {
    /*
     The entry point for the bundle.
     If you pass a string: The string is resolved to a module which is loaded upon startup.
     If you pass an array: All modules are loaded upon startup. The last one is exported.
     */
    entry: {
        app: './src/boot.ts',
        vendor: './src/vendor.ts'
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/js/',
        filename: 'app.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'deps.js'),
        ignorePlugin

    ],
    resolve: {
        extensions: ['', '.js', '.ts', '.scss', '.json']
    },
    module: {
        loaders: [
            { test: /\.ts$/, exclude: /\.spec\.ts$/, loader: 'awesome-typescript-loader?tsconfig=' + tsConfPath },
            { test: /\.json$/, loader: 'raw-loader' },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.css$/, loader: 'raw-loader' },
            { test: /\.scss$/, loader: 'raw-loader!sass' }
        ],
        noParse: [
            path.join(__dirname, 'node_modules', 'angular2', 'bundles')
        ]
    },

    devServer: {
        contentBase: 'src/',
        historyApiFallback: true,
        noInfo: true
    },

    node: {
        global: true,
        console: true
    }
};
