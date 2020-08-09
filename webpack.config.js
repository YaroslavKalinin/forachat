const path = require("path");
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const html = ['index']

const htmlArray = html.map(name => {
    return new HtmlWebPackPlugin({
        filename: `${name}.html`,
        template: `${__dirname}/public/${name}.html`,
        templateParameters: () => {
            return { 'title': process.env.NODE_ENV == 'production' ? 'chat' : 'dev' }
        },
        hash: true,
        inject: true,
        chunks: [name]
    })
})
module.exports = {
    devtool: 'cheap-module-source-map',
    stats: {
        /*all: false,*/
        timings: true,
        cached: true
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 3,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: './public',
        port: 19006
    },
    entry: {
        index: ['./src/client/index']
    },
    output: {
        path: path.resolve(__dirname, "./dist/client"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
                // 'cache-loader' , 
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                },
            ]
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            use: [
                // 'cache-loader',
                {
                    loader: 'file-loader?name=./image/[hash].[ext]'
                },

            ]
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        ...htmlArray
    ]
}