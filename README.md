# grunt-transform-amd

[![Build status][travis-image]][travis-url]
[![Dependencies][deps-image]][deps-url]
[![NPM version][npm-image]][npm-url]


> Transform AMD and UMD modules to CommonJS, globals, and so on.

## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-transform-amd --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-transform-amd');
```

## The "transform_amd" task

### Overview

In your project's Gruntfile, add a section named `transform_amd` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  transform_amd: {
    bundle1: {
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
```

### Documentation

This plugin wraps a functionality of [heya-globalize](https://github.com/heya/globalize) package. See its [README](https://github.com/heya/globalize/blob/master/README.md)
for the background information.

The plugin takes all its file-related information using normal `grunt` features: `cwd` as a virtual root directory for our input files, `src` as a list of files to process,
`dest` as a directory where to put an output.

Following `options` are recognized:

* `options.root` &mdash; a root variable for a package as a string. In [heya-globalize](https://github.com/heya/globalize) it is specified as
  `browserGlobals["!root"]`.
* `options.replacements` &mdash; specifies a map to substitute one file names with another, so it is possible to include shims specific for a browser.
  If a value is specified, yet falsy, that module will be ignored, and not converted. It is similar to `browser` section of `package.json`.
* `options.browserGlobals` &mdash; a dictionary to map modules to globals. It is thoroughly documented in [heya-globalize](https://github.com/heya/globalize)
  with two important differences:
  1. Property `!root` is unused &mdash; use `options.root` instead.
  2. Property `!dist` is unused &mdash; use `dest` instead.
* `options.loaders` &mdash; an array of strings. Those strings will be searched verbatim at the beginning of each file. If found they will be replaced by a different loader.
  If not specified, a Heya-style UMD loader will be looked for. In any case `define` will be tried as well, which will be replaced by a new loader too.
* `options.newLoader` &mdash; a string or a function, which defines a new loader.
  * If `"--amd"`, a static AMD loader will be used (`"define"`).
  * If `"--cjs"`, a CommonJS loader will be generated.
  * If `"--es6"`, an ES6 module loader will be generated (compatible with [Babel](https://babeljs.io/)).
  * Any other string will be used as a static loader.
  * If a function, it should return a dynamically generated loader as a string, when called with following parameters:
    * `deps` &mdash; dependencies as an array of strings.
    * `mod` &mdash; module name as a string.
    * `from` &mdash; file name as a string.
  * If not specified, a loader based on browser globals will be dynamically generated.
* `options.silent` &mdash; a Boolean. If `true` all informational output is suppressed. Default: `false`.

Please take a look at `Gruntfile.js` of this project as well as a content of `tests/` directory to understand the conversion process better. Run `npm test`, and inspect
generated files in `tests/out/`. Files `a.js`, `b.js`, and `c.js` contain the Heya-style UMD loader string (allows a module to work seamlessly in AMD and CommonJS environments).
Other files use AMD's `define()`. A generated test can be found in `tests/test-module.js`.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 1.1.0 *Support for generating AMD/CommonJS/ES6 modules.*
- 1.0.3 *Minor bugfixes.*
- 1.0.2 *Added `silent` option.*
- 1.0.1 *Now it works with dynamic expansion.*
- 1.0.0 *The initial release.*

## License

BSD

[npm-image]:      https://img.shields.io/npm/v/grunt-transform-amd.svg
[npm-url]:        https://npmjs.org/package/grunt-transform-amd
[deps-image]:     https://img.shields.io/david/uhop/grunt-transform-amd.svg
[deps-url]:       https://david-dm.org/uhop/grunt-transform-amd
[dev-deps-image]: https://img.shields.io/david/dev/uhop/grunt-transform-amd.svg
[dev-deps-url]:   https://david-dm.org/uhop/grunt-transform-amd#info=devDependencies
[travis-image]:   https://img.shields.io/travis/uhop/grunt-transform-amd.svg
[travis-url]:     https://travis-ci.org/uhop/grunt-transform-amd
