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
				loaders = options.loaders || defaultLoaders;

			this.files.forEach(function (file) {
				if (file.expand) {
					grunt.fatal('grunt-transform-amd does not support "expand" option.', 3);
					return;
				}
				globals.globals['!dist'] = file.dest;
				var pf = processFile({}, globals, loaders, options.newLoader);
				if (file.cwd) {
					file.src.forEach(function (name) {
						var ext = path.extname(name),
							mod = './' + (ext ? name.slice(0, -ext.length) : name);
						var from = options.replacements.hasOwnProperty(name) ? options.replacements[name] : name;
						pf(path.join(file.cwd, from), mod, path.join(file.dest, name));
					});
				} else {
					file.src.forEach(pf);
				}
			});
		}
	);
};
