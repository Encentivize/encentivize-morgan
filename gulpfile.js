'use strict';
var del = require('del');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

gulp.task('clean', cleanTask);
gulp.task('tslint', tslintTask);
gulp.task('jshint', jshintTask);
gulp.task('lint', ['tslint', 'jshint', 'clean']);
gulp.task('copy-npm-files', ['lint'], copyNpmFilesTask);
gulp.task('ts', ['copy-npm-files'], tsTask);
gulp.task('pretest', ['ts'], pretestTask);
gulp.task('test', ['pretest'], testTask);
gulp.task('build', ['test']);
gulp.task('npm-publish', npmPublishTask);

function cleanTask() {
    return del('build');
}

function tslintTask() {
    gulp.src([ 'src/**/*.ts', 'tests/**/*.ts' ])
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
}

function jshintTask() {
    gulp.src([ 'gulpfile.js' ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
}

function copyNpmFilesTask() {
    gulp.src(['README.md', 'package.json'])
    .pipe(gulp.dest('build/src'));
}

var tsProject = ts.createProject('tsconfig.json');
function tsTask() {
    return tsProject.src()
    .pipe(ts(tsProject))
    .pipe(gulp.dest('build'));
}

function pretestTask() {
    return gulp.src(['build/src/**/*.js'])
    .pipe(istanbul({
        includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
}

function testTask() {
    return gulp.src(['build/tests/**/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({
        thresholds: {
            global: 90
        }
    }));
}

function npmPublishTask() {
    // body...
}
