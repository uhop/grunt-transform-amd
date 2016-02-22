# grunt-transform-amd

[![Build status][travis-image]][travis-url]
[![Dependencies][deps-image]][deps-url]
[![devDependencies][dev-deps-image]][dev-deps-url]
[![NPM version][npm-image]][npm-url]


> Tight 2D packing of images into a sprite with a corresponding CSS.

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

## The "tight_sprite" task

### Overview

In your project's Gruntfile, add a section named `tight_sprite` to the data object passed into `grunt.initConfig()`.

```js
var iconPath = "tests/icons/";
grunt.initConfig({
  tight_sprite: {
    // describe my sprite #1
    my_sprite1: {
      options: {
        classPrefix: "",
        silent: true,
        hide: iconPath
      },
      src: [iconPath + "*/**/*.{png,jpg,jpeg,gif}"],
      dest: iconPath + "sprite1.png"
    }
  }
});
```

### Documentation

Please consult [Wiki](https://github.com/uhop/grunt-transform-amd/wiki) and
[FAQ](https://github.com/uhop/grunt-transform-amd/wiki/FAQ).

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

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
