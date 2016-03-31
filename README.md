# jekyll-starter-kit

A starting point for static sites built using Jekyll.

## Features
- All the goodness of a statically generated site using Jekyll
- Boilerplate that complies with the AMP Project and increases performance and discover-ability leading to a better web page. (Further markup must be added in accordance to [AMP Project](https://www.ampproject.org/)) 
- A Gulp build system
- Sass compilation using libSass via [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- Autoprefixing of CSS using [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- Instant reload (and injection) of files on change using [Browser Sync](https://www.browsersync.io/). Also enables easy multi device testing and synchronisation.
- Image optimization using [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin#gulp-imagemin-)
- Separate build task to optimize files and assets for maximum performance

## Setup

Requirements:
1. [Ruby](https://www.ruby-lang.org/en/downloads/)
2. [NodeJS](https://nodejs.org/en/)

To start using your own project follow the snippet below

```bash
$ gem install jekyll
$ npm install
$ npm run gulp
```

#### Note:
Before deploying your site run the gulp build task to optimize images and compress sass outputs to get the best performance

```bash
$ npm run gulp build
```
