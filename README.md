# Eminem
[Emily](http://emilylang.com) compiler written in Emily (eventually)

First order of business is bootstrapping the compiler by writing a "native"
`em2js` compiler in JavaScript, that compiles Emily to JavaScript. It's going
to be written as, will produce, `#!/usr/bin/env node` executables, because that
totally counts as a compiler.
