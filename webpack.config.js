const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');


module.exports = {
  output: {
    publicPath: "http://localhost:4200/",
    uniqueName: 'parentApp'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...mf.shareScopes(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'parentApp',
      remotes: {
        childApp1: 'childApp1@http://localhost:4201/remoteEntry.js',
        childApp2: 'childApp1@http://localhost:4202/remoteEntry.js',
        childApp3: 'childApp1@http://localhost:4203/remoteEntry.js',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      },
    }),
    mf.SharedMappings.build(),
  ]
};
