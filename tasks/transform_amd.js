'use strict';


var path = require('path');

var processFile = require('heya-globalize/processFile');
var Globals     = require('heya-globalize/Globals');


var defaultLoaders = ['/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})'];


module.exports = function (grunt) {
	grunt.registerMultiTask('transform_amd',
		'Transform AMD and UMD modules to CommonJS, globals, and so on.',
		function () {
			var options = this.options({
					browserGlobals: {},
					replacements:   {},
					root:      '',
					loaders:   null,
					newLoader: '',
					silent:    false
				});
			if (!options.root) {
				grunt.fatal('task transform_amd requires non-empty "root" option.', 3);
				return;
			}

			var globals = new Globals(options.browserGlobals, options.root),
				loaders = options.loaders || defaultLoaders,
				pf = processFile(globals, loaders, options.newLoader);

			this.files.forEach(function (file) {
				file.src.forEach(function (name) {
					var ext = path.extname(name),
						mod = './' + (ext ? name.slice(0, -ext.length) : name),
						from = options.replacements.hasOwnProperty(name) ? options.replacements[name] : name,
						to = file.orig && file.orig.expand ? file.dest : path.join(file.dest, name);
					if (!from) {
						console.log(name, 'is skipped');
						return;
					}
					if (!options.silent) {
						if (name === from) {
							console.log(name, '=>', to);
						} else {
							console.log(name, '=>', from, '=>', to);
						}
					}
					pf(path.join(file.cwd || '', from), mod, to);
				});
			});
		}
	);
};
