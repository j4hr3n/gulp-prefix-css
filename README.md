# gulp-scope-css
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> Gulp plugin to scope your CSS selectors with an additional level

## Why?!?!

Adding additional depth to selectors should usually be avoided. In rare circumstances (such as building CSS as part of a reusable library) it's sometimes helpful to be able to add scope to all of your selectors so that your styles can be confined to certain sections of the page.



## Usage

First, install `gulp-scope-css` as a development dependency:

```shell
npm install --save-dev gulp-scope-css
```

Then, add it to your `gulpfile.js`:

```javascript
var scopeCss = require("gulp-scope-css");

gulp.src("./src/*.css")
    .pipe(scopeCss('.scope'))
    .pipe(gulp.dest("./dist"));
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-require-convert
[npm-image]: https://badge.fury.io/js/gulp-require-convert.png

[travis-url]: http://travis-ci.org/nixonchris/gulp-require-convert
[travis-image]: https://secure.travis-ci.org/nixonchris/gulp-require-convert.png?branch=master

[coveralls-url]: https://coveralls.io/r/nixonchris/gulp-require-convert
[coveralls-image]: https://coveralls.io/repos/nixonchris/gulp-require-convert/badge.png

[depstat-url]: https://david-dm.org/nixonchris/gulp-require-convert
[depstat-image]: https://david-dm.org/nixonchris/gulp-require-convert.png
