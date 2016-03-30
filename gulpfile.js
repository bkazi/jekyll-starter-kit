var gulp = require('gulp');
var bs = require('browser-sync');
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
var jekyllOptions = '';
