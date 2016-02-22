// end: generated modules that use globals

// the main test that checks all modules
module.exports = function () {
	if (window.uhop.test.a() !== 'a') return false;
	if (window.uhop.test.b() !== 'b') return false;
	if (window.uhop.test.c() !== 'c') return false;
	if (window.uhop.test.sub.e() !== 'e') return false;
	if (window.uhop.D() !== 'd') return false;
	if (window.uhop.F() !== 'f') return false;
	return true;
};
