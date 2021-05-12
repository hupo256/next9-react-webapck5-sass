const path = require('path')

module.exports = {
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/404': { page: '/404' },
      '/articles': { page: '/articles' },
      '/cases': { page: '/cases' },
      '/sites': { page: '/sites' },
      '/designers': { page: '/designers' },
    }
  },
  pageExtensions: ['mdx', 'jsx', 'js', 'scss', 'less'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: ['css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
}
