define(["./b", "./c"], function(b, c){
	"use strict";
	window.uhop = window.uhop || {};
	window.uhop.F = function () {
		if (b() !== 'b') return false;
		if (c() !== 'c') return false;
		return 'f';
	};
	return null;
});
