# gulp-prefix-css

> Gulp plugin to prefix your CSS selectors

## Usage

First things first, install as a dev-dependency

`$ npm i --save-dev gulp-prefix-css`

then, in your `gulpfile.js` add something like this:

```
var prefixCSS = require('gulp-prefix-css');

gulp.task('prefix-css', function(){
  return gulp.src('./*.css')
    .pipe(prefixCss('.prefix'))
    .pipe(gulp.dest('./dist'));
});
```
