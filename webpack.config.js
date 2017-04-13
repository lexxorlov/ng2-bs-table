/**
 * Adapted from angular2-webpack-starter
 */

const webpack = require('webpack');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.js']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            }
        ]
    },

    entry: './index',

    output: {
        path: __dirname + '/bundles',
        publicPath: '/',
        filename: 'ng2-bs-table.umd.js',
        libraryTarget: 'umd',
        library: 'ng2-bs-table'
    },

    // require those dependencies but don't bundle them
    externals: [/^\@angular\//, /^rxjs\//],

    module: {
        rules: [{
            enforce: 'pre',
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: [__dirname + '/ node_modules']
        }, {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader?declaration=false',
            exclude: [/\.e2e\.ts$/]
        }]
    },
    exclude: [ 'node_modules/**/*spec.js' ],
    plugins: [
        // fix the warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname + '/src'
        ),
    ],
};