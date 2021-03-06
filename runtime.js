#!/usr/bin/env node
// by Han Seoul-Oh <laughinghan@gmail.com> (http://github.com/laughinghan)

// Coding Style: as a personal experiment, this script shall be written in
// [npm's "funny" coding style](https://docs.npmjs.com/misc/coding-style)
// aka "semicolon-free"

function bool (value) { return value ? $true : $null }

function Num (n) {
  num.toString = num.valueOf = function () { return n }
  return num
  function num (atom) {
    if (atom === 'eq')  return function (other) { return bool(+num === +other) }
    if (atom === 'lt')  return function (other) { return bool(num < other) }
    if (atom === 'lte') return function (other) { return bool(num <= other) }
    if (atom === 'gt')  return function (other) { return bool(num > other) }
    if (atom === 'gte') return function (other) { return bool(num >= other) }
    if (atom === 'plus')   return function (other) { return Num(num + other) }
    if (atom === 'minus')  return function (other) { return Num(num - other) }
    if (atom === 'times')  return function (other) { return Num(num * other) }
    if (atom === 'divide') return function (other) { return Num(num / other) }
    if (atom === 'mod')    return function (other) { return Num(num % other) }
    throw n + ' can\'t respond to ' + atom
  }
}

var push = [].push
function Closure (scope, args, fn) {
  closure.toString = function () { return '<closure/' + args.length + '>' }
  closure.valueOf = function () {
    return function () {
      return [].reduce.call(arguments, function (result, arg) { return result(FFI(arg)) }, closure)
    }
  }
  return closure
  function closure (arg) {
    var innerScope = Object.create(scope)
    if (args.length > 0) innerScope['$'+args[0]] = arg
    if (args.length > 1) return Closure(innerScope, args.slice(1), fn)
    return fn(innerScope)
  }
}

var scope = {} // global scope

// built-in globals
var $null = scope.$null = function (atom) {
  if (atom === 'eq') return function (arg) { return bool(arg === $null) }
  throw '<null> can\'t respond to ' + atom
}
$null.toString = function () { return '<null>' }
$null.valueOf = function () {}
var $true = scope.$true = function (atom) {
  if (atom === 'eq') return function (arg) { return bool(arg === $true) }
  throw n + ' can\'t respond to ' + atom
}
$true.toString = function () { return '<true>' }

// built-in global fns
var $print = scope.$print = function(arg) {
  process.stdout.write(String(arg))
  return $print
}
scope.$let = function (atom) {
  if (typeof atom !== 'string') throw 'Can only assign to names that are atoms'
  return function (arg) {
    scope['$'+atom] = arg
    return $null
  }
}
scope.$tern = Closure(scope, ['condition', 'consequent', 'alternative'], function (scope) {
  return scope.$condition !== $null ? scope.$consequent($null) : scope.$alternative($null)
})

// "native" JS host functions (and host objects, which are just host functions
// that happen to error when called in any way besides for property access)
function FFI (fn, self, args) {
  hostFn.toString = function () { return String(fn) }
  hostFn.valueOf = function () { return fn }
  return hostFn
  function hostFn (arg) {
    if (typeof arg === 'string') {
      return FFI(fn[arg], fn)
    }
    args = (args || []).concat([ arg.valueOf() ])
    if (args.length === fn.length) {
      return FFI(fn.apply(self, args))
    }
    return FFI(fn, self, args)
  }
}
scope.$ffi = FFI({module: module, global: global})
