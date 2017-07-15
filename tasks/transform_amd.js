'use strict';


var path = require('path');

var Globals = require('heya-globalize/Globals');
var prologueGlobals = require('heya-globalize/prologueGlobals');
var prologueRequire = require('heya-globalize/prologueRequire');
var prologueImport  = require('heya-globalize/prologueImport');
var processFile = require('heya-globalize/processFile');


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

			var loaders = options.loaders || defaultLoaders, newLoader;

			if (typeof options.newLoader == 'string') {
				switch (options.newLoader) {
					case '--amd':
						!options.silent && console.log('converting to AMD...');
						newLoader = 'define';
						break;
					case '--cjs':
						!options.silent && console.log('converting to CommonJS...');
						newLoader = prologueRequire;
						break;
					case '--es6':
						!options.silent && console.log('converting to ES6 modules...');
						newLoader = prologueImport;
						break;
					default:
						!options.silent && console.log('using static prologue...');
						newLoader = options.newLoader;
						break;
				}
			} else if (typeof options.newLoader == 'function') {
				!options.silent && console.log('using dynamic prologue...');
				newLoader = options.newLoader;
			}
			if (!newLoader) {
				!options.silent && console.log('converting to browser globals...');
				newLoader = prologueGlobals(new Globals(options.browserGlobals, options.root));
			}

			var pf = processFile(loaders, newLoader);

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
