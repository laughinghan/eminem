println (tern true ^(1) ^(2)) (tern null ^(3) ^(4))
println (tern (1.lt 2) ^(1) ^(2)) (tern (3.gt 4) ^(3) ^(4))
tern true ^(
  println "true :)"
) ^(
  println "false :("
)
tern null ^(
  println "true :)"
) ^(
  println "false :("
)
let .churchBooleanTrue (tern true)
let .churchBooleanFalse (tern null)
churchBooleanTrue ^(
  println "true :)"
) ^(
  println "false :("
)
churchBooleanFalse ^(
  println "true :)"
) ^(
  println "false :("
)
