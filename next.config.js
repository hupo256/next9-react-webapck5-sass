const path = require('path')

module.exports = {
  pageExtensions: ['jsx', 'js'],
  sassOptions: { includePaths: [path.join(__dirname, 'styles')] },
  future: { webpack5: true },
  webpack: (config, options) => {
    // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // console.log('config===========>', config)
    // console.log('options===========>', options)
    // console.log('buildId===========>', buildId)
    // console.log('dev===========>', dev)
    // console.log('isServer===========>', isServer)
    // console.log('defaultLoaders===========>', defaultLoaders)
    // console.log('webpack.version', webpack.version)

    // new webpack.DefinePlugin({
    //   IS_ENV: JSON.stringify(dev ? 'dev' : 'prod'),
    // })

    const { ModuleFederationPlugin } = options.webpack.container
    config.plugins.push(
      new ModuleFederationPlugin({
        name: 'noData',
        filename: 'noData.js',
        exposes: {
          './noData': './components/noData',
        },
        // remotes: {
        //   app2: 'app2@http://localhost:3002/remoteEntry.js',
        // },
        // shared: {
        //   react: { singleton: true },
        //   'react-dom': { singleton: true },
        // },
      }),
    )
    return config
  },
  env: {
    WEBPACK_ENV: JSON.stringify(process.env.NODE_ENV),
  },
  publicRuntimeConfig: {
    IS_ENV: process.env.NODE_ENV,
  },
}
