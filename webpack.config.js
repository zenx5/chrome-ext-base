const webpack = require('webpack')
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
            new HtmlWebpackPlugin({template:'src/index.html'})
        ],
        module:{
            rules
        }
    }
}