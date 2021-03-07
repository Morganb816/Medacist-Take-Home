const path = require('path')

module.exports = {
    entry: './api/index.js',
    target: 'node',
    output: {
        library: 'api',
        libraryTarget: 'umd',
        filename: 'build.js',
        path: path.resolve(__dirname, 'functions/build'),
    },
    node: {
        __dirname: true
    },
    mode: 'development'
};