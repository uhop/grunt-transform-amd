/*
 * grunt-tight-sprite
 * https://github.com/uhop/grunt-tight-sprite
 *
 * Copyright (c) 2013 Eugene Lazutkin
 * Licensed under the New BSD license.
 */

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
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('default', 'transform_amd');
	grunt.registerTask('test',    'transform_amd');
};
