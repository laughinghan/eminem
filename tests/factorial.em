let .factorial ^x (
  tern (x.lte 0) ^(
    1
  ) ^(
    factorial (x.minus 1) .times x
  )
)

println (factorial 0)
println (factorial 1)
println (factorial 2)
println (factorial 4)
println (factorial 8)
