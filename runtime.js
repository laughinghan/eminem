#!/usr/bin/env node
// by Han Seoul-Oh <laughinghan@gmail.com> (http://github.com/laughinghan)

// Coding Style: as a personal experiment, this script shall be written in
// [npm's "funny" coding style](https://docs.npmjs.com/misc/coding-style)
// aka "semicolon-free"

function Num (n) {
  num.n = n
  num.toString = function () { return n }
  return num
  function num (atom) {
    if (atom === 'plus')   return function (other) { return Num(n + other.n) }
    if (atom === 'minus')  return function (other) { return Num(n - other.n) }
    if (atom === 'times')  return function (other) { return Num(n * other.n) }
    if (atom === 'divide') return function (other) { return Num(n / other.n) }
    if (atom === 'mod')    return function (other) { return Num(n % other.n) }
    throw n + ' can\'t respond to ' + atom
  }
}

var push = [].push
function Closure (scope, args, fn) {
  fn.toString = function () { return '<closure/' + this.args.length + '>' }
  scope = Object.create(scope)
  if (args.length > 1) {
    return function (arg) {
      return Closure(scope, args.slice(1), function (scope) {
        scope['$'+args[0]] = arg
        return fn(scope)
      })
    }
  }
  return function (arg) {
    scope['$'+args] = arg
    return fn(scope)
  }
}

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
