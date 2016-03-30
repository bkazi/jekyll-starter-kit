var gulp = require('gulp');
var bs = require('browser-sync').create();
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var cp = require('child_process');

/**
* Array defining browser versions to auto prefix for
* Refer to https://github.com/ai/browserslist#queries
* for all possibilities
*/
var browsers = ['last 3 versions'];

/**
* The jekyll command to use to spawn the child process
* Requires check for Windows since node has a quirk in
* how it handles child processes
*/
var jekyll = process.platform == 'win32' ? 'jekyll.bat' : 'jekyll';

/**
* Command line options for jekyll if needed
*/
var jekyll_options = '';

/**
* Spawns a process to do the Jekyll build
*/
gulp.task('buildJekyll', done => {
	var jekyll_process = cp.spawn( jekyll, ['build', jekyll_options], {stdio: 'inherit'} )
	jekyll_process.on('close', done);
	return jekyll_process;
});

/**
 * Compile Sass files
 */
gulp.task('sass', () => {
    return gulp.src('_sass/main.scss')
        .pipe(sass({
            onError: bs.notify
        }))
        .pipe(prefixer(browsers))
        .pipe(gulp.dest('css/'))
        .pipe(bs.stream());
});

/**
* Default task
* Makes calls to other tasks
*/
gulp.task(
    'default',
    gulp.series(
        gulp.series('sass', 'buildJekyll'),
        () => {
            bs.init({
                server: './_site'
            })
        }
    )
);
