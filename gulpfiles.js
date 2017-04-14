const pkg = require('./package.json');
const gulp = require('gulp');
const exec = require('child_process').exec;
const del = require ('del');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const inlineNg2Template = require('gulp-inline-ng2-template');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const pump = require('pump');
const tsc = require('gulp-typescript');
const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');


gulp.task('clean:example', function () {
    return del([
        'example/**/*.ngfactory.ts',
        'example/**/*.js',
        'example/**/*.json',
        'example/**/*.map'
    ])
});

gulp.task('clean:docs', function () {
    return del([
        'assets/**',
        'docs/**'
    ]);
});

gulp.task('compile:dev', function (cb) {
    exec('"node_modules\\.bin\\tsc" -p tsconfig.json', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('compile:aot', function (cb) {
    exec('"node_modules\\.bin\\ngc" -p tsconfig.prod.json', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('compile:app', function () {
    return gulp.src(['./example/**/*.ts'])
        .pipe(inlineNg2Template({ base: '/example', useRelativePaths:true }))
        .pipe(tsc({
            "target": "es5",
            "module": "es6",
            "moduleResolution": "node",
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true,
            "lib": ["es6", "dom"]
        }))
        .pipe(gulp.dest('./docs/src'));
});

gulp.task('bundle:all', ['bundle:app', 'bundle:vendor'], function (cb) {
    runSequence('bundle:css', cb)
});

gulp.task('bundle:app', function (cb) {
    runSequence('compile:aot', 'compile:es6', 'copy:html', 'rollup:app', cb);
});

gulp.task('build:dev', ['clean:example'], function(cb) {
    runSequence(
        'compile:dev',
        cb
    );
});

gulp.task('dev', ['build:dev']);
gulp.task('build', ['build:app']);
gulp.task('module', ['build:module']);
gulp.task('default', ['app']);