const {AngularCompilerPlugin, PLATFORM} = require('@ngtools/webpack');
const path = require("path");
const ContainerReferencePlugin = require("webpack/lib/container/ContainerReferencePlugin");
const config = require('./common.conf');

const shellConfig = {
    entry: ["./projects/shell/server.js"],
    resolve: {
        mainFields: ["server", "module", "main"]
    },
    target: 'async-node',
    optimization: {minimize: false},
    module: {
        rules: [
            {test: /\.ts$/, loader: "@ngtools/webpack"}
        ]
    },
    externals: ["enhanced-resolve"],
    plugins: [
        // ContainerReferencePlugin for Host allows to statically import shared libs
        new ContainerReferencePlugin({
            remoteType: 'commonjs2',
            remotes: {mfe1: `${config.distDir}/mfe1/server/remoteEntry.js`},
            overrides: ["@angular/core", "@angular/common", "@angular/router"]
        }),

        // OR:

        // new ModuleFederationPlugin({
        //   name: "mfe1",
        //   library: { type: "commonjs2" },
        //   filename: "remoteEntry.js",
        //   remotes: {
        //     mfe1: path.resolve(__dirname, 'dist/mfe1/server/remoteEntry.js')
        //   },
        //   shared: ["@angular/core", "@angular/common", "@angular/router"]
        // }),

        new AngularCompilerPlugin({
            skipCodeGeneration: false,
            tsConfigPath: "./projects/shell/tsconfig.server.json",
            directTemplateLoading: true,
            platform: PLATFORM.Server,
            entryModule: path.resolve(
                __dirname,
                "../projects/shell/src/app/app.server.module#AppServerModule"
            )
        })
    ],

    output: {
        filename: "[name].js",
        path: `${config.distDir}/shell/server`,
        chunkFilename: "[id].[chunkhash].js",
        libraryTarget: "commonjs2",
    },
    mode: config.mode
};

module.exports = shellConfig;
