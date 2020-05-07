const AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ContainerPlugin = require("webpack/lib/container/ContainerPlugin");
const config = require('./common.conf');

const mfe1WebConfig = {
    entry: ["./projects/mfe1/src/polyfills.ts", "./projects/mfe1/src/main.ts"],
    resolve: {
        mainFields: ["browser", "module", "main"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist/mfe1"),
        port: 3000
    },
    module: {
        rules: [{test: /\.ts$/, loader: "@ngtools/webpack"}]
    },
    plugins: [
        new ContainerPlugin({
            name: "mfe1",
            filename: "remoteEntry.js",
            exposes: {
                Component: './projects/mfe1/src/app/app.component.ts',
                Module: './projects/mfe1/src/app/flights/flights.module.ts'
            },
            library: {type: "var", name: "mfe1"},
            overridables: ["@angular/core", "@angular/common", "@angular/router"]
        }),

        new AngularCompilerPlugin({
            skipCodeGeneration: false,
            tsConfigPath: "./projects/mfe1/tsconfig.app.json",
            directTemplateLoading: true,
            entryModule: path.resolve(
                __dirname,
                "../projects/mfe1/src/app/app.module#AppModule"
            )
        }),
        new HtmlWebpackPlugin({
            template: "./projects/mfe1/src/index.html"
        })
    ],
    output: {
        publicPath: "http://localhost:3000/",
        filename: "[name].js",
        path: `${config.distDir}/mfe1`,
        chunkFilename: "[id].[chunkhash].js"
    },
    mode: config.mode
};

module.exports = mfe1WebConfig;
