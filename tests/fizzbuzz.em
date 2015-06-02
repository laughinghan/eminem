let .i 1
loop ^(
  println (
    tern (i.mod 15 .eq 0) ^("fizzbuzz") ^( # else
      tern (i.mod 3  .eq 0) ^("fizz") ^( # else
        tern (i.mod 5  .eq 0) ^("buzz") ^( # else
        i)
      )
    )
  )
  let .i (i.plus 1)
  i.lte 100
)
