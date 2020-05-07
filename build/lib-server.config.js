const AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const path = require("path");
const ContainerPlugin = require("webpack/lib/container/ContainerPlugin");
const config = require('./common.conf');

const mfe1ServerConfig = {
    entry: ["./projects/mfe1/src/polyfills.ts", "./projects/mfe1/src/main.ts"],
    resolve: {
        mainFields: ["browser", "module", "main"]
    },
    target: 'async-node',
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
            library: {type: "commonjs2"},
            overridables: ["@angular/core", "@angular/common", "@angular/router"]
        }),
        new AngularCompilerPlugin({
            skipCodeGeneration: false,
            tsConfigPath: "./projects/mfe1/tsconfig.app.json",
            directTemplateLoading: true,
            entryModule: path.resolve(__dirname, "../projects/mfe1/src/app/app.module#AppModule")
        })
    ],
    output: {
        filename: "[name].js",
        path: `${config.distDir}/mfe1/server`,
        chunkFilename: "[id].[chunkhash].js",
        libraryTarget: "commonjs2"
    },
    mode: "production"
};

module.exports = mfe1ServerConfig;
