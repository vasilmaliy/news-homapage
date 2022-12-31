const gulp = require(`gulp`);
const sass = require('gulp-sass')(require('sass'));
const del = require(`del`);
const sync = require(`browser-sync`).create();
const reload = sync.reload;
const colors = require(`colors/safe`);

const SERVER_ROOT = 'build/';

//HTML
gulp.task(`html`, function () {
  return gulp.src(`./src/index.html`).pipe(gulp.dest(`${SERVER_ROOT}`));
});

// SCSS
gulp.task(`scss`, function () {
  return gulp
    .src(`src/scss/**/styles.scss`)
    .pipe(sass().on(`error`, sass.logError))
    .pipe(gulp.dest(`${SERVER_ROOT}assets/css`))
    .pipe(reload({ stream: true }));
});

// JS
gulp.task(`js`, function () {
  return gulp
    .src(`src/js/**/*.js`)
    .pipe(gulp.dest(`${SERVER_ROOT}assets/js`))
    .pipe(reload({ stream: true }));
});

// CLEAN BUILD
gulp.task(`clean`, function (done) {
  del([`${SERVER_ROOT}*`]).then((paths) => {
    console.log(`Delete files and folders:\n`, paths.join(`\n`));
  });

  done();
});

//WATCH FILES
function watchTasks() {
  sync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: SERVER_ROOT,
    },
  });

  gulp.watch([`src/scss/**/*.scss`], gulp.series(`scss`));
  gulp.watch([`src/index.html`], gulp.series(`html`));
  gulp.watch([`src/js/**/*`], gulp.series(`js`));
}

//  CLEAN BUILD & COPY FILES TO IT
gulp.task(`build`, gulp.series([`scss`, `js`, `html`]));

gulp.task(`serve`, gulp.series([`build`], watchTasks));

gulp.task(`default`, function () {
  console.log(colors.rainbow(`⬤  ================================ ⬤\n`));
  console.log(`  AVAILABLE COMMANDS:`);
  console.log(`  ` + colors.cyan(`-------------------\n`));
  console.log(`  ` + colors.yellow(`npm start`) + ` — run local server with watcher`);
  console.log(`  ` + colors.green(`npm run build`) + ` — make build of the project`);
  console.log(
    `  ` + colors.cyan(`npm run deploy`) + ` — make build and publish project to Github Pages`
  );
  console.log(colors.rainbow(`\n⬤  ================================ ⬤`));
});
