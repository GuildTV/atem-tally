// Include gulp
var gulp = require('gulp'); 
// var sass = require('gulp-sass');
var util = require("gulp-util");
// var autoprefixer = require('gulp-autoprefixer');

// webpack bits
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

// Compile CSS from less files
// gulp.task('sass', function() {
//   return gulp.src('sass/app.scss')
//     .pipe(sass({
//       includePaths: ['./node_modules'],
//     }).on('error', sass.logError))
//     .pipe(autoprefixer({
//         browsers: ['Chrome > 32'],
//         cascade: false
//     }))
//     .pipe(gulp.dest('public/'))
//     .on('error', util.log);
// });

//production webpack build
gulp.task("webpack:build", function(callback) {
  // modify some webpack config options

  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new util.PluginError("webpack:build", err);
    util.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

//webpack dev build
gulp.task("webpack:dev", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    stats: {
      colors: true
    }
  }).listen(3001, "0.0.0.0", function(err) {
    if(err) throw new util.PluginError("webpack-dev-server", err);
    util.log("[webpack-dev-server]", "http://localhost:3001/webpack-dev-server/index.html");
  });
});

// Watch Files For Changes
gulp.task('default', [/*'sass'*/], function() { //, 'webpack:dev'
  // gulp.watch('sass/*.scss', ['sass']);
  // gulp.watch('sass/*/*.scss', ['sass']);
});

gulp.task('build', [/*'sass',*/ "webpack:build"]);
