/*
	Build Lunatic from TypeScript source.
*/

var gulp = require('gulp'),
	  fs = require('fs'),
	exec = require('child_process').exec,
	 tsc = require('gulp-typescript'),
 typedoc = require('gulp-typedoc'),
  rename = require('gulp-rename'),
  insert = require('gulp-insert'),
removeMd = require('gulp-remove-markdown'); 

var header = '/*\r\nLunatic\r\nDocumentation generator for Lua code.' +
'\r\nCopyright 2015 Sam Saint-Pettersen.\r\n\r\n' + 
'Released under the MIT License.\r\n*/\r\n';

 gulp.task('typings', function() {
 	exec('tsd install', function() {});
 });

 gulp.task('lib', function() {
 	return gulp.src('lunatic-lib.ts')
 	.pipe(tsc({
 		module: 'commonjs',
 		removeComments: true
 	}))
 	.pipe(gulp.dest('.'));
 });

 gulp.task('bin', function() {
 	return gulp.src('lunatic.ts')
 	.pipe(tsc({
 		module: 'commonjs',
 		removeComments: true
 	}))
 	.pipe(insert.prepend(header))
 	.pipe(insert.prepend('#!/usr/bin/env node\n'))
 	.pipe(gulp.dest('.'))
 	.pipe(rename('lunatic'))
 	.pipe(gulp.dest('.'));
 });

gulp.task('readme', function() {
	return gulp.src('README.markdown')
	.pipe(removeMd())
	.pipe(gulp.dest('.'));
});

gulp.task('doc', function() {
	return gulp.src('*.ts')
	.pipe(typedoc({
		module: 'commonjs',
		out: './doc',
		json: './doc/doc.json'
	}));
});

gulp.task('clean', function() {
	fs.unlinkSync('lunatic-lib.js');
	fs.unlinkSync('lunatic.js');
	fs.unlinkSync('lunatic');
	fs.unlinkSync('README.txt');
});

gulp.task('default', ['lib', 'bin', 'readme'], function(){});
