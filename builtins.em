# a fixed-point combinator, like the Y combinator but works in strict languages
let .fix ^f(^Y (Y Y) ^Y x (f (Y Y) x))

let .println (fix ^println \
  ^arg (
    print arg "
"
    println
  )
)

let .do ^f (f())

let .if ^condition consequent (
  tern condition consequent ^()
)

let .loop (fix ^loop \
  ^iter (
    if (do iter) ^(loop iter)
  )
)
