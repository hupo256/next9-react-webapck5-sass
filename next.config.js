const path = require('path')

module.exports = {
  pageExtensions: ['jsx', 'js'],
  trailingSlash: true,
  sassOptions: { includePaths: [path.join(__dirname, 'styles')] },
  future: { webpack5: true },
  webpack: (config, options) => {
    // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // console.log('config===========>')
    // console.log(JSON.stringify(config, null, 2))
    console.log('config===========>')
    // console.log('options===========>', options)
    console.log('webpack.version', options.webpack.version)

    const { ModuleFederationPlugin } = options.webpack.container
    config.plugins.push(
      new ModuleFederationPlugin({
        name: 'mktNext',
        filename: 'remoteEntry.js',
        exposes: {
          './noData': './components/noData',
        },
        remotes: {
          fdTest: 'fdTest@http://localhost:3004/remoteEntry.js',
        },
        // shared: ['react', 'react-dom'],
        shared: {
          react: { singleton: true, eager: true },
          'react-dom': { singleton: true, eager: true },
          'react-router-dom': { singleton: true, eager: true },
        },
        // shared: {
        //   react: { singleton: true, eager: true },
        //   'react-dom': { singleton: true, eager: true },
        //   'react-router-dom': { singleton: true, eager: true },
        // },
        // shared: {
        //   react: { singleton: true },
        //   'react-dom': { singleton: true },
        //   'react-router-dom': { singleton: true },
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
