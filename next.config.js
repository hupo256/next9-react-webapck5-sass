const path = require('path')

module.exports = {
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
