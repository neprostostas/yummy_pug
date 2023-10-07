const gulp = require('gulp');
const pug = require('gulp-pug');
const through2 = require('through2');

gulp.task('pug-compile', ()=>{
  return gulp.src(['app/pug/**/*.pug', '!app/pug/includes/**/*.pug'])
      .pipe(pug({pretty:true}))
      .pipe(through2.obj(function(file, _, cb) {
        if (file.isBuffer()) {
          let content = file.contents.toString('utf8');
          content = content.replace(/^\s*\n/, '');  // Remove the first empty line
          file.contents = Buffer.from(content);
        }
        this.push(file);
        cb();
      }))
      .pipe(gulp.dest('app/html'))
});

gulp.task('watch',()=>{
  gulp.watch('app/pug/**/*.pug', gulp.series('pug-compile'))
});
