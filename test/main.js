/*global describe, it*/
'use strict';

var fs = require('fs');
var es = require('event-stream');
var should = require('should');

require('mocha');

delete require.cache[require.resolve('../')];

var gutil = require('gulp-util');
var prefixCss = require('../');

describe('gulp-prefix-css', function() {

	var expectedFile = new gutil.File({
		path: 'test/expected/main.css',
		cwd: 'test/',
		base: 'test/expected',
		contents: fs.readFileSync('test/expected/main.css')
	});

	it('should produce expected file via buffer', function(done) {

		var srcFile = new gutil.File({
			path: 'test/fixtures/main.css',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: fs.readFileSync('test/fixtures/main.css')
		});

		var stream = prefixCss('.prefix');

		stream.on('error', function(err) {
			should.not.exist(err);
			done(err);
		});

		stream.on('data', function(newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);
			String(newFile.contents).should.equal(String(expectedFile.contents));
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	it('should produce expected file via stream', function(done) {

		var srcFile = new gutil.File({
			path: 'test/fixtures/main.css',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: fs.createReadStream('test/fixtures/main.css')
		});

		var stream = prefixCss('.prefix');

		stream.on('error', function(err) {
			should.not.exist(err);
			done();
		});

		stream.on('data', function(newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);

			newFile.contents.pipe(es.wait(function(err, data) {
				should.not.exist(err);
				String(data).should.equal(String(expectedFile.contents));
				done();
			}));
		});

		stream.write(srcFile);
		stream.end();
	});
});
