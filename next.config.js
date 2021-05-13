const path = require('path')
module.exports = {
  pageExtensions: ['mdx', 'jsx', 'js', 'scss', 'less'],
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // Perform customizations to webpack config

    // Important: return the modified config
    return config
  },
}

// const withCSS = require('@zeit/next-css')
// const withSass = require('@zeit/next-sass')

// module.exports = () => withSass(withCSS())

// module.exports = {
//   webpack: (config, options) => {
//     config.module.rules.push({
//       test: /\.s(a|c)ss$/,
//       use: ['css-loader', 'sass-loader'],
//       exclude: /node_modules/,
//     })

//     return config
//   },
// }
