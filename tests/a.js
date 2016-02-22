/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["./b", "./c"], function(b, c){
	"use strict";
	return function () {
		if (b() !== 'b') return false;
		if (c() !== 'c') return false;
		return 'a';
	};
});
