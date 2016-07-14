'use strict';

var es = require('event-stream');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var postcss = require('postcss');
var scopeSelector;
var scope;

const PLUGIN_NAME = 'gulp-prefix-css';


scope = postcss(function(css) {
	css.walkRules(function(rule) {
		rule.selectors = rule.selectors.map(function(selector) {
			if (selector.trim().toLowerCase() === 'body') {
				return scopeSelector;
			} else {
				return scopeSelector + ' ' + selector;
			}
		});
	});
});


module.exports = function cssPrefixer(scopeSelectorOption) {
	scopeSelector = scopeSelectorOption;

	if (!scopeSelector) {
		throw new PluginError(PLUGIN_NAME, 'Missing a css prefix!');
	}

	return es.map(function(file, callback) {
		if (file.isNull()) {
			return cb(null, file);
		}
		if (file.isBuffer()) {
			file.contents = new Buffer(scope.process(file.contents).css);
		}
		if (file.isStream()) {
			var through = es.through();
			var wait = es.wait(function(err, contents) {
				through.write(scope.process(contents).css);
				through.end();
			});

			file.contents.pipe(wait);
			file.contents = through;
		}
		callback(null, file);
	})
};
