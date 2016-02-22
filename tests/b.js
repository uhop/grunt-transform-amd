/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["./c"], function(c){
	"use strict";
	return function () {
		if (c() !== 'c') return false;
		return 'b';
	};
});
