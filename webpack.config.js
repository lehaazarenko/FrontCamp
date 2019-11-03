const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: ['./app/app.js', './app/src/scss/index.scss'],
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: [/node_modules/, /\.scss$/],
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }),
                exclude: [/node_modules/, /build/],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.scss'],
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    devServer: {
        contentBase: './app',
    },
    plugins: [
        new extractTextPlugin('style.css')
    ],
};
