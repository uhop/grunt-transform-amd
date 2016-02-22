define(['./d'], function(d){
	"use strict";
	return function () {
		if (d() !== 'd') return false;
		return 'e';
	};
});
