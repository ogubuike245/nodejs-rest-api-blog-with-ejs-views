const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function compose() {
  return src("src/public/scss/**/*.scss")
    .pipe(sass())
    .pipe(dest("./src/public/css"));
}

function track() {
  watch(["src/public/scss/**/*.scss"], compose);
}

exports.default = series(compose, track);
