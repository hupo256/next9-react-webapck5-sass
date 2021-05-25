const path = require('path')
const { withModuleFederation } = require('@module-federation/nextjs-mf')

module.exports = {
  pageExtensions: ['jsx', 'js'],
  // trailingSlash: true,
  sassOptions: { includePaths: [path.join(__dirname, 'styles')] },
  future: { webpack5: true },
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options
    console.log('webpack.version', webpack.version)
    const mfConf = {
      mergeRuntime: true, //experimental
      name: 'mktNext',
      library: {
        type: config.output.libraryTarget,
        name: 'mktNext',
      },
      filename: 'remoteEntry.js',
      // exposes: {
      //   "./exposedTitle": "./components/exposedTitle",
      // },
      remotes: {
        fdTest: 'fdTest@http://localhost:3004/remoteEntry.js',
      },
    }
    config.cache = false
    if (!isServer) {
      config.output.publicPath = 'http://localhost:3000/_next/'
    }

    withModuleFederation(config, options, mfConf)
    return config
  },
  // webpack: (config, options) => {
  //   const { ModuleFederationPlugin } = options.webpack.container
  //   config.plugins.push(
  //     new ModuleFederationPlugin({
  //       name: 'mktNext',
  //       filename: 'remoteEntry.js',
  //       exposes: {
  //         './noData': './components/noData',
  //       },
  //       remotes: {
  //         fdTest: 'fdTest@http://localhost:3004/remoteEntry.js',
  //       },
  //       // shared: ['react', 'react-dom'],
  //       shared: {
  //         react: { singleton: true, eager: true },
  //         'react-dom': { singleton: true, eager: true },
  //         // 'react-router-dom': { singleton: true, eager: true },
  //       },
  //     }),
  //   )
  //   return config
  // },
  env: {
    WEBPACK_ENV: JSON.stringify(process.env.NODE_ENV),
  },
  publicRuntimeConfig: {
    IS_ENV: process.env.NODE_ENV,
  },
}
