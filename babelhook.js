'use strict';

require('babel-register')({
    ignore: false,
    extensions: ['.jsx', '.js', '.es.js'],
    only: /\.es\.js$|\.jsx$/,
    presets: [
        'babel-preset-es2015'
    ].map(require.resolve),
    plugins: [
        'babel-plugin-transform-object-rest-spread',
        'babel-plugin-transform-es2015-modules-commonjs'
    ].map(require.resolve)
});
