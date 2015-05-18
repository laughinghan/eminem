let .x 1
println x
^(let .x 2) ()
println x
^x (println x; let .x 3; println x) -1
println x
