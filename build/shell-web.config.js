const AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ContainerReferencePlugin = require("webpack/lib/container/ContainerReferencePlugin");
const config = require('./common.conf');

const shellConfig = {
    entry: ["./projects/shell/src/polyfills.ts", "./projects/shell/src/main.ts"],
    resolve: {
        mainFields: ["browser", "module", "main"]
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: "@ngtools/webpack"}
        ]
    },
    plugins: [
        new ContainerReferencePlugin({
            remoteType: 'var',
            remotes: {mfe1: "mfe1"},
            overrides: ["@angular/core", "@angular/common", "@angular/router"]
        }),
        new AngularCompilerPlugin({
            skipCodeGeneration: false,
            tsConfigPath: "./projects/shell/tsconfig.app.json",
            directTemplateLoading: true,
            entryModule: path.resolve(__dirname, "../projects/shell/src/app/app.module#AppModule")
        }),
        new HtmlWebpackPlugin({
            template: "./projects/shell/src/index.html"
        })
    ],
    output: {
        filename: "[id].[name].js",
        path: `${config.distDir}/shell`,
        chunkFilename: "[id].[chunkhash].js"
    },
    mode: config.mode
};


module.exports = shellConfig;
