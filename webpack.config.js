const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
//const { webpack } = require('webpack')

const ruleForStyle = {
    test: /\.css$/,
    use: ['style-loader','css-loader']
}

const ruleForJS = {
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic'
                }
            ]
        ]
    }
}

const rules = [ruleForJS, ruleForStyle]

module.exports = (env, argv) => {


    return {
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'app')
        },
        plugins:[
            new webpack.DefinePlugin({
                VERSION: "'v1.0.0'"
            }),
            new CopyPlugin({
                patterns:[
                    { from: path.resolve(__dirname, 'manifest.json'), to: path.resolve(__dirname, 'app/manifest.json')},
                    { from: path.resolve(__dirname, 'src/utils/Background.js'), to: path.resolve(__dirname, 'app/Background.js')}
                    { from: path.resolve(__dirname, 'src/utils/Storage.js'), to: path.resolve(__dirname, 'app/Storage.js')}
                ]                
            }),
            new HtmlWebpackPlugin({template:'src/index.html'})
        ],
        module:{
            rules
        }
    }
}