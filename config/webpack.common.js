const
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
      helpers = require('./helpers');

module.exports = {
    entry: {
        polyfills: './src/polyfills.ts',
        vendor: './src/vendor.ts',
        app: './src/boot.browser.ts'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: /\.spec\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[ext]'
            },
            {
                // this applies to app-wide css
                test: /\.(scss|css)$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap')
            },
            {
                // this applies
                test:/\.(scss|css)$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader!sass'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new webpack.IgnorePlugin(/\.(js?\.map)$/),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};