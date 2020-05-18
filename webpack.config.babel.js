const path = require('path');
const webpack = require("webpack");
var pro = process.env.NODE_ENV === "production"
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require('./config/common');
const CopyWebpackPlugin = require("copy-webpack-plugin");

//开发环境端口号
//更改本地测试环境的地址，可以写localhost，或者写你本地的ip方便手机测试

//不同环境加载不同的插件
let plg = [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '/src/index.ejs'), // Load a custom template
        title: config.webpack.title,
        ip: config.webpack.ip,
        dev_port: config.webpack.dev_port
    }), new MiniCssExtractPlugin({
        filename: "[name].css",
    }), new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, './public'),
            to: path.resolve(__dirname, './dist'),
        }
    ])
];
if (!pro) {
    plg = plg.concat([new webpack.HotModuleReplacementPlugin()])
}


module.exports = {
    entry: {
        index: ['babel-polyfill', './src/index.js']
    },
    optimization: pro ? {
        runtimeChunk: {
            name: 'manifest'
        },
        //minimizer: true, // [new UglifyJsPlugin({...})]
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                },
            }
        }
    } : {},
    plugins: plg,
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
        // modules: [
        //     path.resolve(__dirname, 'node_modules'),
        //     path.join(__dirname, './src')
        // ],
        alias: {
            "@actions": path.resolve(__dirname, "src/actions"),
            "@components": path.resolve(__dirname, "src/components"),
            "@containers": path.resolve(__dirname, "src/containers"),
            "@page": path.resolve(__dirname, "src/page"),
            "@utils": path.resolve(__dirname, "src/utils")
        }
    },
    output: {
        filename: pro ? '[name].[hash].js' : '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: pro ? './' : `http://${config.webpack.ip}:${config.webpack.dev_port}/`
    },

    devtool: pro ? "cheap-module-source-map" : "source-map",
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader?cacheDirectory=true',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader?importLoaders=1',
                options: {
                    minimize: true //css压缩
                }
            }, "postcss-loader", "sass-loader"]
        }, {
            test: /\.(less|css)$/,
            use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader?importLoaders=1',
                options: {
                    minimize: true //css压缩
                }
            }, {loader: 'less-loader', options: {javascriptEnabled: true}}]
        }, {
            test: /\.(png|jpg|gif|md)$/,
            use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: ['url-loader?limit=10000&mimetype=images/svg+xml']
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    },
    devServer: {//webpack-dev-server配置热更新以及跨域
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true,//实时刷新
        host: config.webpack.ip,
        port: config.webpack.dev_port,
        hot: true,
        proxy: {}
    }
};
