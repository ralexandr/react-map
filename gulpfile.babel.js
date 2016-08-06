import fs from 'fs';
import {
	CSS_SOURCE,
	CSS_DEST,
	JS_SOURCE,
	JS_DEST,
	IMG_SOURCE,
	IMG_DEST
} from './config';
import gulp from 'gulp';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import bowerLibs from 'bower-files';
import webpackConfig from './webpack.config.babel';

import gulpLoadPlugins from 'gulp-load-plugins';
const plugins = gulpLoadPlugins({
	DEBUG: true, // when set to true, the plugin will log info to console. Useful for bug reporting and issue debugging
	// pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
	// config: './package.json', // where to find the plugins, by default searched up from process.cwd()
	// scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within
	// replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
	camelize: true, // if true, transforms hyphenated plugins names to camel case
	lazy: true // whether the plugins should be lazy loaded on demand
});
const bowerJSON = JSON.parse(fs.readFileSync('./bower.json'));
const bowerRC = JSON.parse(fs.readFileSync('./.bowerrc'));
const bower = bowerLibs({
	dir: bowerRC.directory,
	overrides: bowerJSON.overrides
});

gulp.task('webpack', function(done) {
	webpack(webpackConfig).run(function(err, stats) {
		if (err) {
			console.log('Error', err);
		} else {
			console.log(stats.toString());

		}
		done();
	});
});

gulp.task("webpack-dev-server", function(callback) {
	// Start a webpack-dev-server
	const compiler = webpack(webpackConfig);

	new webpackDevServer(compiler, {
		hot: true,
		compress: true,
		// proxy: {
		// 	"*": "http://localhost:8080"
		// },
		quiet: false,
		noInfo: false,
		lazy: true,
		filename: "index.js",
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
		publicPath: "./dist/",
		headers: { "X-Custom-Header": "yes" },
		stats: {
			colors: true
		}
	}).listen(8080, "localhost", function(err) {
		if (err) throw new plugins.util.PluginError("webpack-dev-server", err);
		// Server listening
		plugins.util.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

		// keep the server alive or continue?
		// callback();
	});
});

gulp.task('babel', function() {
	gulp.src(JS_SOURCE)
		.pipe(plugins.babel({
			comments: false,
			presets: [ 'es2015', 'stage-0', 'react' ]
		}))
		// .pipe(plugins.addSrc(bower.ext('js').files))
		// .pipe(plugins.concat(JS_DEST))
		.pipe(gulp.dest(JS_DEST));
});

gulp.task('server', function () {
	gulp.watch([ CSS_SOURCE ], [ 'sass' ]);
	gulp.watch([ JS_SOURCE ], ['webpack']);
	// gulp.watch([ JS_SOURCE ], ['babel']);
	return plugins.nodemon({
		script: './dist/index', // run ES5 code
		watch: [ './' ] // watch ES2015 code
		// ext: 'js jsx json',
		// ignore: ['*.css', './public/'],
		// tasks: [ 'webpack' ], // compile synchronously onChange
	});
});

gulp.task('sass', function () {
	gulp.src(CSS_SOURCE)
		// .pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({
			errLogToConsole: true,
			indentedSyntax: true
			//outputStyle: 'compressed'
		})) //Скомпилируем
		.pipe(plugins.addSrc(bower.ext('css').files))
		.pipe(plugins.autoprefixer()) //Добавим вендорные префиксы
		// .pipe(plugins.cssmin()) //Сожмем
		// .pipe(plugins.sourcemaps.write())
		.pipe(plugins.concat(CSS_DEST))
		.pipe(gulp.dest('')); //И в build
});


gulp.task('icons', function () {
	gulp.src(IMG_SOURCE)
		.pipe(plugins.imageResize({
			width : 48,
			height : 48,
			crop : true,
			upscale : false
		}))
		.pipe(gulp.dest(IMG_DEST));
});

gulp.task('default', ['sass', 'server']);
