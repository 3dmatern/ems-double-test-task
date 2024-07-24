const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.ts"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.[contenthash:8].js",
        assetModuleFilename: path.join("images", "[name].[contenthash][ext]")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true, // Не проверять типы в ts-loader
                        }
                    },
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // вместо "style-loader"
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.svg$/,
                type: "asset/resource",
                generator: {
                    filename: path.join("icons", "[name].[contenthash][ext]")
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            filename: "index.html"
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist']
                },
                onEnd: {
                    copy: [
                        {
                            source: path.join("public"),
                            destination: "dist"
                        }
                    ]
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        })
    ],
    devServer: {
        watchFiles: path.join(__dirname, "src"),
        port: 2701
    }
};