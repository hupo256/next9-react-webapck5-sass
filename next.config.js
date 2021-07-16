module.exports = {
  pageExtensions: ['jsx', 'js'],
  productionBrowserSourceMaps: true,
  // trailingSlash: true,
  future: { webpack5: true },
  webpack: (config, options) => {
    const { ModuleFederationPlugin } = options.webpack.container
    config.plugins.push(
      new ModuleFederationPlugin({
        name: 'mktNext',
        filename: 'remoteEntry.js',
        // host  ===>  import(name/exposes[name])
        exposes: {
          // 很不好意思，next.js下的webpack5导出来的remoteEntry,与其他的不一样，
          // 导致在基于MF的微前端架构中next.js不能作为生产者，
          // 它只能作为消费者的身份出现
          // 所以，在三层架构中，next.js的项目只能放在business层
          './noData': './components/noData',
        },
        // remote
        remotes: {
          fdTest: 'fdTest@http://localhost:3004/remoteEntry.js',
          sample: 'sample@http://localhost:8081/remoteEntry.js',
        },
        shared: {
          reactRexport: {
            import: 'react',
            shareKey: 'react',
            shareScope: 'default',
            singleton: true,
            eager: true,
            // don't use shared version when version isn't valid. Singleton or modules without fallback will throw, otherwise fallback is used
            // strictVersion: true,
            version: require('react').version,
            requiredVersion: require('./package.json').dependencies['react'],
          },
        },
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
