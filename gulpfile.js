const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');

// Tarefas individuais
function compileSass() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./dist/styles/'));
}

function compressImages() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
}

function compressJS() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./dist/scripts'))
}

// Tarefa de build que executa todas as tarefas individuais
const build = gulp.parallel(compileSass, compressImages, compressJS);

// Tarefa de watch que observa as mudanças nos arquivos
function watch() {
    gulp.watch('./src/styles/*.scss', compileSass);
    gulp.watch('./src/images/**/*', compressImages);
    gulp.watch('./src/scripts/*.js', compressJS);
}

// Exporta as tarefas
exports.build = build;
exports.watch = watch;
exports.default = build;
