const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.[contenthash:8].js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "template.html"),
            filename: "index.html"
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                delete: ['dist']
                }
            }
        })
    ],
    devServer: {
        watchFiles: path.join(__dirname, "src"),
        port: 2701
    }
};