#!/usr/bin/env node
// by Han Seoul-Oh <laughinghan@gmail.com> (http://github.com/laughinghan)

// Coding Style: as a personal experiment, this script shall be written in
// [npm's "funny" coding style](https://docs.npmjs.com/misc/coding-style)
// aka "semicolon-free"

var scope = {} // global scope
var $print = scope.$print = function(arg) {
  process.stdout.write(''+arg)
  return $print
}
var $println = scope.$println = function (arg) {
  console.log(''+arg)
  return $println
}
scope.$let = function (atom) {
  if (typeof atom !== 'string') throw 'Can only assign to names that are atoms'
  return function (arg) {
    scope['$'+atom] = arg
  }
}
