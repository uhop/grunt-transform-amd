'use strict';


module.exports = function(grunt) {
	grunt.initConfig({
		transform_amd: {
			batch: {
				options: {
					root: 'uhop.test',
					browserGlobals: {
						'boom':    'BOOM',
						'./d':     '!uhop.D',
						'./sub/f': '!uhop.F'
					},
					replacements: {
						'c.js': 'shim.js'
					}
				},
				cwd:  'tests',
				src:  ['**/?.js', '!out/**'],
				dest: 'tests/out'
			},
			amd: {
				options: {
					root: 'uhop.test',
					browserGlobals: {
						'boom':    'BOOM',
						'./d':     '!uhop.D',
						'./sub/f': '!uhop.F'
					},
					replacements: {
						'c.js': 'shim.js'
					},
					newLoader: '--amd'
				},
				cwd:  'tests',
				src:  ['**/?.js', '!out/**'],
				dest: 'tests/out'
			},
			cjs: {
				options: {
					root: 'uhop.test',
					browserGlobals: {
						'boom':    'BOOM',
						'./d':     '!uhop.D',
						'./sub/f': '!uhop.F'
					},
					replacements: {
						'c.js': 'shim.js'
					},
					newLoader: '--cjs'
				},
				cwd:  'tests',
				src:  ['**/?.js', '!out/**'],
				dest: 'tests/out'
			},
			es6: {
				options: {
					root: 'uhop.test',
					browserGlobals: {
						'boom':    'BOOM',
						'./d':     '!uhop.D',
						'./sub/f': '!uhop.F'
					},
					replacements: {
						'c.js': 'shim.js'
					},
					newLoader: '--es6'
				},
				cwd:  'tests',
				src:  ['**/?.js', '!out/**'],
				dest: 'tests/out'
			},
			static: {
				options: {
					root: 'uhop.test',
					browserGlobals: {
						'boom':    'BOOM',
						'./d':     '!uhop.D',
						'./sub/f': '!uhop.F'
					},
					replacements: {
						'c.js': 'shim.js'
					},
					newLoader: 'static'
				},
				cwd:  'tests',
				src:  ['**/?.js', '!out/**'],
				dest: 'tests/out'
			},
			dynamic: {
				options: {
					root: 'uhop.test',
					browserGlobals: {
						'boom':    'BOOM',
						'./d':     '!uhop.D',
						'./sub/f': '!uhop.F'
					},
					replacements: {
						'c.js': 'shim.js'
					},
					newLoader: function (deps, mod, from) {
						return '/* ' + JSON.stringify({deps: deps, mod: mod, from: from}) + ' */';
					}
				},
				cwd:  'tests',
				src:  ['**/?.js', '!out/**'],
				dest: 'tests/out'
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('default', 'transform_amd:batch');
	grunt.registerTask('test',    'transform_amd:batch');
};
