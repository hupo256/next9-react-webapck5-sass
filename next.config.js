const path = require('path')
const webpack = require('webpack')

module.exports = {
  pageExtensions: ['jsx', 'js'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // console.log('config===========>', config)
    // console.log('buildId===========>', buildId)
    // console.log('dev===========>', dev)
    // console.log('isServer===========>', isServer)
    // console.log('defaultLoaders===========>', defaultLoaders)
    new webpack.DefinePlugin({
      IS_ENV: JSON.stringify(dev ? 'dev' : 'prod'),
    })
    return config
  },
  // env: {
  //   IS_ENV: JSON.stringify(process.env?.NODE_ENV),
  // },
  publicRuntimeConfig: {
    IS_ENV: process.env?.NODE_ENV,
  },
}
