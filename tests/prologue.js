'use strict';

// simulate the global
var window = {};

// simulate external packages
window.BOOM                = function () { return 'boom'; };
window.BOOM['Hello-World'] = function () { return 'helo'; };
window['wham!']            = function () { return 'wham'; };

// begin: generated modules that use globals
