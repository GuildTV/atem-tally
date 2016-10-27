module.exports = {
  entry: "./js/app.js",
  output: {
    path: __dirname,
    filename: "public/js/app.js",
    publicPath: 'public'
  },
  module: {
    loaders: [
      { test: /\.js$/, include: /js/, loader: "babel-loader" },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.otf$|\.wav$|\.mp3$/, loader: "file" }
    ]
  },
  plugins: [
  ]
};