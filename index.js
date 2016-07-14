'use strict';

var es = require('event-stream'),
	postcss = require('postcss'),
	scopeSelector,
	scope;


scope = postcss(function (css) {
    css.eachRule(function (rule) {
		rule.selectors = rule.selectors.map(function (selector) {
			if (selector.trim().toLowerCase() === 'body') {
				return scopeSelector;
			} else {
				return scopeSelector + ' ' + selector;
			}
		});
    });
});


module.exports = function (scopeSelectorOption) {
	scopeSelector = scopeSelectorOption;

	return es.map(function (file, callback) {
		var through,
			wait;

		if (file.isStream()) {

			through = es.through();
			wait = es.wait(function (err, contents) {
				through.write(scope.process(contents).css);
				through.end();
			});

			file.contents.pipe(wait);
			file.contents = through;

		} else if (file.isBuffer()) {
			file.contents = new Buffer(scope.process(file.contents).css);
		}

		callback(null, file);
	});
};