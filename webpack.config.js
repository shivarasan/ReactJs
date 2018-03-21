const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ["es2015", "stage-0", "react"]
                        // presets: ['es2015']
                }
            },
            // {
            //     test: /\.css$/,
            //     exclude: /node_modules/,
            //     use: [
            //         { loader: 'style-loader' },
            //         { 
            //             loader: 'css-loader',
            //             options: {
            //                 importLoaders: 1,
            //                 modules: true,
            //                 localIdentName: '[name]__[local]__[hash:base64:5]'
            //             }
            //          },
            //          { 
            //              loader: 'postcss-loader',
            //              options: {
            //                  ident: 'postcss',
            //                  plugins: () => [
            //                      autoprefixer({
            //                          browsers: [
            //                             "> 1%",
            //                             "last 2 versions"
            //                          ]
            //                      })
            //                  ]
            //              }
            //           }
            //     ]
            // },
            // {
            //     test: /\.(png|jpe?g|gif)$/,
            //     loader: 'url-loader?limit=8000&name=images/[name].[ext]'
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/public/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    devServer: {
        historyApiFallback: true
    }
};






// const webpack = require('webpack');
// var path = require('path');

// module.exports = {
//     entry: './src/app.js',
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'public')
//     },
//     // watch: true,
//     module: {
//         rules: [{
//             test: /\.jsx$/,
//             loader: "babel-loader", // Do not use "use" here
//             // loader: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015'],
//             options: {
//                 presets: ["es2015", "stage-1", "react"]
//                     // presets: ['es2015']
//             }
//         }],
//     },
//     mode: 'development'
// }