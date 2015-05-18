# Eminem
[Emily](http://emilylang.org) compiler written in Emily (eventually)

First order of business is bootstrapping the compiler by writing a "native"
`em2js` compiler in JavaScript, that compiles Emily to JavaScript. It's going
to be written as, and will produce, `#!/usr/bin/env node` executables, because
that totally counts as a compiler.

Then that compiler will be ported to Emily itself, resulting in a theoretically
self-hosting compiler that initially only supports compiling to Node.js
executables (but of course will eventually support other codegen backends).

### Differences from [canonical Emily][]
[canonical Emily]: https://bitbucket.org/runhello/emily/src/stable/doc/manual.md

Technically this is, and probably will for a while, actually implementing a
dialect of the Emily language, with some significant differences from the
OCaml reference implementation. Most of these differences are for convenience
during the JS bootstrapping process.

- numbers are JS Numbers, i.e. always 64-bit floats, no actual ints
- string literals I was super lazy about lexing, they're double quote-delimited
  sequences of any non-double-quote, non-backslash characters (including
  newlines), and also backslash-escaped double quotes and backslashes.
  So `"\n"` is invalid, but `"\"lol\\wut\""` is valid.

And of course, there's missing features, which aren't implemented differently
from the reference implementation, they're just not yet implemented at all:

### Status

Hello World and basic variable assignment and dereference works! You can't do
anything with the variables besides print them and overwrite them, though.
So, y'know, almost done.

### Implementation

Hand-rolled shift-reduce parser, sorry about that. It's really not that bad!
There's just 3 functions, `lex()`, `parse()`, and `codegen()`, that each take
in a callback they call to emit tokens, parse trees, and generated JS,
respectively; and return a function to be called with source code, tokens, and
parse trees, respectively.

### Author

A Very Serious and Important Project by [Han](http://github.com/laughinghan)
