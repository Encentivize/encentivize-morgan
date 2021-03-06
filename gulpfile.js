'use strict';
var del = require('del');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var argv = require('yargs').argv;
var npm = require('npm');
var _ = require('lodash');
var fs = require('fs');

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

function npmPublishTask(callback) {
    var username = argv.username;
    var password = argv.password;
    var email = argv.email;
    if (!username) {
        var usernameError = new Error("Username is required as an argument --username exampleUsername");
        return callback(usernameError);
    }
    if (!password) {
        var passwordError = new Error("Password is required as an argument --password  examplepassword");
        return callback(passwordError);
    }
    if (!email) {
        var emailError = new Error("Email is required as an argument --email example@email.com");
        return callback(emailError);
    }
    var uri = "http://registry.npmjs.org/";
    npm.load(null, function (loadError) {
        if (loadError) {
            return callback(loadError);
        }
        var auth = {
            username: username,
            password: password,
            email: email,
            alwaysAuth: true
        };
        var addUserParams = {
            auth: auth
        };
        npm.registry.adduser(uri, addUserParams, function (addUserError, data, raw, res) {
            if (addUserError) {
                return callback(addUserError);
            }
            var packageJson = _.clone(require('./build/src/package.json'));
            npm.commands.pack(['build/src'], function (packError) {
                if (packError) {
                    return callback(packError);
                }
                var fileName = packageJson.name + '-' + packageJson.version + '.tgz';
                var bodyPath = require.resolve('./' + fileName);
                var body = fs.createReadStream(bodyPath);
                var publishParams = {
                    metadata: packageJson,
                    access: 'public',
                    body: body,
                    auth: auth
                };
                npm.registry.publish(uri, publishParams, function (publishError, resp) {
                    if (publishError) {
                        return callback(publishError);
                    }
                    console.log("Publish succesfull: " + JSON.stringify(resp));
                    return callback();
                });
            });
        });
    });
}
