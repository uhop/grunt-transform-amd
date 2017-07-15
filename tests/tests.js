'use strict';


var fs = require('fs');
var path = require('path');


// everything should be transformed at this point


// concatenate all transformed files in a test module

var writeable = fs.createWriteStream(path.join(__dirname, 'test-module.js'));

function dump (name, end) {
	name = path.join(__dirname, name);
	return function () {
		var readable = fs.createReadStream(name);
		return new Promise(function (resolve, reject) {
			readable.on('end', function (error) {
				if (error) {
					reject(error);
				} else {
					resolve(true);
				}
			});
			readable.pipe(writeable, {end: !!end});
		});
	};
}

function sleep (ms) {
	return function () {
		return new Promise(function (resolve) {
			setTimeout(function () {
				resolve(ms);
			}, ms);
		});
	};
}

dump('prologue.js')().
	then(dump('out/c.js')).
	then(dump('out/b.js')).
	then(dump('out/a.js')).
	then(dump('out/d.js')).
	then(dump('out/sub/e.js')).
	then(dump('out/sub/f.js')).
	then(dump('epilogue.js', true)).
	then(sleep(200)).
	then(function () {
		var test = require(path.join(__dirname, 'test-module'));
		process.exit(test() ? 0 : 2);
	}).
	catch(function (error) {
		console.error('ERROR:', error);
		process.exit(1);
	});
