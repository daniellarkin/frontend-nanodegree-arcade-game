var gulp        = require('gulp');
var express     = require('express');
var browsersync = require('browser-sync');
var gutil       = require('gulp-util');
var jasmine     = require('gulp-jasmine');
var uglify      = require('gulp-uglify');
var shell       = require('gulp-shell');
var istanbul    = require('gulp-istanbul');

var server;
var dist = 'dist';

//-------------------------------------------------------------
// Jasmine JS unit testing
//-------------------------------------------------------------
gulp.task('unit-test', function () {
  return gulp.src('./src/js/specs/*.js')
	.pipe(jasmine())
	.pipe(istanbul.writeReports({
	    dir: './docs/unit-test-coverage',
	    reporters: [ 'lcov' ],
	    reportOpts: { dir: './docs/unit-test-coverage' }
	})
	     );
});


//-------------------------------------------------------------
// jsDoc
//-------------------------------------------------------------
gulp.task('js-doc', shell.task(['jsdoc -d docs/jsdoc/ src/js/app.js src/js/specs/app-spec.js docs/project_overview.md']));

//-------------------------------------------------------------
// BrowserSync
//-------------------------------------------------------------
function reload() {
    if (server){
	return browsersync.reload({stream: true});
    }
    return gutil.noop();
}

//-------------------------------------------------------------
// Copy html to the dist folder
//-------------------------------------------------------------
gulp.task('cp-html', function(){

    return gulp.src(['src/index.html',
		     'src/html/**/*.html'])
	.pipe(gulp.dest('dist'))
	.pipe(reload());
});

//-------------------------------------------------------------
// Copy bower components folder to the dist folder
//-------------------------------------------------------------
gulp.task('cp-bower', function(){
    gulp.src("./src/bower_components/**").pipe(gulp.dest('dist/bower_components/'))
});

//-------------------------------------------------------------
gulp.task('cp-css', function(){
    return gulp
    .src(['./src/css/**/*.css'])
	.pipe(gulp.dest('dist/css'))
    	.pipe(reload());
});

//-------------------------------------------------------------
gulp.task('cp-js', function(){
    return gulp
    .src(['./src/js/**/*.js'])
	.pipe(gulp.dest('dist/js'))
    	.pipe(reload());
});

//-------------------------------------------------------------
gulp.task('cp-images', function(){
    return gulp
    .src(['src/img/**/*.{jpg,jpeg,png,svg}'])
	  .pipe(gulp.dest('dist/img'))
    .pipe(reload());
});

//-------------------------------------------------------------
gulp.task('build', ['cp-html','cp-bower','cp-images','cp-css','cp-js']);


//-------------------------------------------------------------
// Watch task; which tasks to be called when specifc types of files change on disk
//-------------------------------------------------------------
gulp.task('watch', function(){
    gulp.watch('src/**/*.html',['cp-html'])
    gulp.watch('src/img/**/*.{jpg,jpeg,png,svg}',['cp-images'])
    gulp.watch('src/css/**/*.css',['cp-css'])
    gulp.watch('src/js/**/*.js',['cp-js'])
});

//-------------------------------------------------------------
// Node Express development webserver
//-------------------------------------------------------------
gulp.task('server', function(){
    server = express();
    server.use(express.static('dist'));
    server.listen(8000);
    browsersync({proxy: 'localhost:8000',
		 open : false}
	       );
});

//-------------------------------------------------------------
// Default Gulp job
//-------------------------------------------------------------
gulp.task('default', ['build','watch','server'])


