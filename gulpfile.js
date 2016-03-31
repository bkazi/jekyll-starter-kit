'use strict';
var gulp = require('gulp');
var bs = require('browser-sync');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var cp = require('child_process');
var imagemin = require('gulp-imagemin');

/**
* Object containing paths to all useful directories
*/
const paths = {
    styles: {
        src: ['_sass/*.scss'],
        dest: '_includes/'
    },
    contentFiles: {
        src: ['*.html', '_layouts/*,html', '_includes/*.html', '_posts/*']
    },
    img: {
        src: ['img/*'],
        dest: 'img/'
    }
};
const msgJekyll = "Running: $ jekyll build"

/**
* Array defining browser versions to auto prefix for
* Refer to https://github.com/ai/browserslist#queries
* for all possibilities
*/
const browsers = ['last 3 versions'];

/**
* The jekyll command to use to spawn the child process
* Requires check for Windows since node has a quirk in
* how it handles child processes
*/
const jekyll = process.platform == 'win32' ? 'jekyll.bat' : 'jekyll';

/**
* Command line options for jekyll if needed
* Array containing strings, build is compulsary
*/
const jekyll_options = ['build'];

/**
* An object containing options for image optimisation
* https://github.com/sindresorhus/gulp-imagemin#imageminoptions
*/
const imageMinOptions = {
    progressive: true,
    interlaced: true
};

/**
* Spawns a process to do the Jekyll build
*/
gulp.task('buildJekyll', done => {
	var jekyll_process = cp.spawn( jekyll, jekyll_options, {stdio: 'inherit'} )
	jekyll_process.on('close', done);
    bs.notify(msgJekyll);
	return jekyll_process;
});

/**
* Rebuild Jekyll and refresh browsers
*/
gulp.task('rebuildJekyll',
    gulp.series('buildJekyll', bs.reload)
);

/**
 * Compile Sass files
 */
gulp.task('sass', () => {
    return gulp.src(paths.styles.src)
        .pipe(sass({
            onError: bs.notify
        }))
        .pipe(prefixer(browsers))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(bs.stream());
});

/**
* Add a final build version of sass task
*/
gulp.task('sass-build', () => {
    return gulp.src(paths.styles.src)
        .pipe(sass({
            onError: bs.notify,
            outputStyle: 'compressed'
        }))
        .pipe(prefixer(browsers))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(bs.stream());
});

/**
* Optimize images
*/
gulp.task('img-optimize', () => {
    return gulp.src(paths.img.src)
        .pipe(imagemin(imageMinOptions))
        .pipe(gulp.dest(paths.img.dest));
});

/**
* Browser sync task, initialises local server
*/
gulp.task('browserSync', () => {
    return bs({
        server: {
            baseDir: './_site'
        }
    });
});

/**
* Watch task to automatically inject compiled sass
* and reload browser with new JS and HTML files
*/
gulp.task('watch', () => {
    gulp.watch(paths.styles.src,
        gulp.series('sass')
    );
    gulp.watch(paths.contentFiles.src,
        gulp.series('rebuildJekyll')
    );
});


/**
* Default task
* Makes calls to other tasks
*/
gulp.task(
    'default',
    gulp.series(
        'sass',
        'buildJekyll',
        gulp.parallel('browserSync', 'watch')
    )
);

/**
* Build task
*/
gulp.task(
    'build',
    gulp.series(
        gulp.parallel(
            'sass-build',
            'img-optimize'
        ),
        'buildJekyll'
    )
);
