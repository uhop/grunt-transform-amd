define(['module', 'boom', 'boom/Hello-World', 'wham!'], function(module, boom, helo, wham){
	"use strict";
	window.uhop = window.uhop || {};
	window.uhop.D = function () {
		if (boom() !== 'boom') return false;
		if (helo() !== 'helo') return false;
		if (wham() !== 'wham') return false;
		if (!/\bd\.js$/.test(module.id)) return false;
		return 'd';
	};
	return null;
});
