# a fixed-point combinator, like the Y combinator but works in strict languages
let .fix ^f(^Y (Y Y) ^Y x (f (Y Y) x))

let .println (fix ^println \
  ^arg (
    print arg "
"
    println
  )
)
