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

gulp.task('clean', function(){
    return del([
        'docs/example',
        'docs/src',
        'docs/dist'
    ]);
});

gulp.task('clean:src', function(){
    return del([
        'src/**/*.ngfactory.ts',
        'src/**/*.js',
        'src/**/*.json',
        'src/**/*.map'
    ]);
});

gulp.task('clean:dist', function(){
    return del([
        'assets/**',
        'dist/**'
    ]);
});

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

gulp.task('compile:aot-module', function (cb) {
    exec('"node_modules\\.bin\\ngc" -p tsconfig.module.json', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('compile:aot-app', function (cb) {
    exec('"node_modules\\.bin\\ngc" -p tsconfig.prod.json', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('compile:module', function () {
    return gulp.src(['./src/**/*.ts'])
        .pipe(inlineNg2Template({ base: '/src', useRelativePaths:true }))
        .pipe(tsc({
            "target": "es5",
            "module": "es6",
            "moduleResolution": "node",
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true,
            "lib": ["es6", "dom"]
        }))
        .pipe(gulp.dest('./dist/src'));
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
        .pipe(gulp.dest('./docs/example'));
});

gulp.task('copy:module', function () {
    return gulp.src(['src/**/*.html', 'src/**/*.css'])
        .pipe(gulp.dest('dist/src'))
});

gulp.task('copy:app', function () {
    gulp.src('index.prod.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('docs'));
    gulp.src('dist/src/**')
        .pipe(gulp.dest('docs/dist/src'));
    return gulp.src(['example/**/*.html', 'example/**/*.css'])
        .pipe(gulp.dest('docs/example'))
});

gulp.task('compress:module', function (cb) {
    pump([
        gulp.src([
            'dist/*.bundle.js',
            'dist/*.bundle.*.js',
            '!dist/**/*.map',
            '!dist/**/*.min.js'
        ]),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('dist')
    ], cb);
});

gulp.task('compress:app', function (cb) {
    pump([
        gulp.src([
            'docs/*.bundle.js',
            'docs/*.bundle.*.js',
            '!docs/**/*.map',
            '!docs/**/*.min.js'
        ]),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('docs')
    ], cb);
});

gulp.task('rollup:module', function() {
    return rollup.rollup({
        entry: pkg.main,
        onwarn: function (warning) {
            // Skip certain warnings

            // should intercept ... but doesn't in some rollup versions
            if (warning.code === 'THIS_IS_UNDEFINED') { return; }
            // intercepts in some rollup versions
            if ( warning.message.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) { return; }

            if ( warning.message.indexOf("treating it as an external dependency") > -1 ) { return; }

            if (warning.message.indexOf("No name was provided for external module") > -1) { return; }

            // console.warn everything else
            console.warn(warning.message);
        }

    }).then( function ( bundle ) {
        bundle.write({
            dest: `dist/${pkg.name}.bundle.umd.js`,
            format: 'umd',
            exports: 'named',
            moduleName: pkg.name,
            globals: {
            }
        });
        bundle.write({
            dest: `dist/${pkg.name}.bundle.cjs.js`,
            format: 'cjs',
            exports: 'named',
            moduleName: pkg.name,
            globals: {
            }
        });
        bundle.write({
            dest: `dist/${pkg.name}.bundle.amd.js`,
            format: 'amd',
            exports: 'named',
            moduleName: pkg.name,
            globals: {
            }
        });
    });
});

gulp.task('rollup:app', function(){
    return rollup.rollup( {
        entry: 'docs/example/main.aot.js',
        onwarn: function (warning) {
            // Skip certain warnings

            // should intercept ... but doesn't in some rollup versions
            if (warning.code === 'THIS_IS_UNDEFINED') { return; }
            // intercepts in some rollup versions
            if ( warning.message.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) { return; }

            // console.warn everything else
            console.warn(warning.message);
        },

        plugins: [
            nodeResolve({
                jsnext: true,
                module: true
            }),
            commonjs({
                include: ['node_modules/rxjs/**', 'node_modules/classnames/**'],
            })
        ]
    })
        .then(function(bundle) {
            bundle.write( {
                format: "iife",
                dest: "docs/app.bundle.js",
                sourceMap: true
            });
        });
});

gulp.task('bundle:all', ['bundle:app', 'bundle:vendor'], function (cb) {
    runSequence('bundle:css', cb)
});

gulp.task('bundle:app', function (cb) {
    runSequence('compile:aot-app', 'compile:app', 'copy:app', 'rollup:app', cb);
});

gulp.task('bundle:module', function(cb){
    runSequence('compile:aot-module', 'compile:module',  'copy:module',  'rollup:module', cb);
});

gulp.task('bundle:vendor', function() {
    return gulp
        .src([
            "node_modules/core-js/client/shim.min.js",
            "node_modules/zone.js/dist/zone.js"
        ])
        .pipe(concat("vendor.bundle.js"))
        .pipe(gulp.dest('docs'));

});

gulp.task('bundle:css', function() {
    return gulp
        .src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'])
        .pipe(concat("styles.bundle.css"))
        .pipe(gulp.dest('docs/assets'));

});

gulp.task('build:dev', ['clean:example'], function(cb) {
    runSequence(
        'compile:dev',
        cb
    );
});

gulp.task('build:module',['clean:dist', 'clean:src'], function(cb) {
    runSequence(
        'bundle:module',
        'compress:module',
        'clean', cb);
});

gulp.task('build:app', ['clean:docs', 'clean:example'], function(cb) {
    runSequence(
        'bundle:all',
        'compress:app',
        'clean', cb);
});

gulp.task('dev', ['build:dev']);
gulp.task('app', ['build:app']);
gulp.task('module', ['build:module']);
gulp.task('default', ['app']);