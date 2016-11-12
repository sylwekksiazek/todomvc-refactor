const devServerPort = 8080;

module.exports = {
  context: __dirname,
  entry: {
    javascript: [
      'webpack-dev-server/client?http://localhost:' + devServerPort,
    ],
    typescript: "./src/app.ts",
    html: "./index.html",
  },
  output: {
    filename: "dist/app.js" // "dist/[name].js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ],
  },
  watch: true,
  devServer: {
    port: devServerPort,
    inline: true
  }
}
