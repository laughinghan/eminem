let .sum3 ^a b c (a.plus b.plus c)
print "(sum3 1 2 3): " (sum3 1 2 3) ; println ""

let .avg2 ^x ^y ((x.plus y).divide 2)
print "(avg2 10 11): " (avg2 10 11) ; println ""

let .add10 (sum3 5 5)
print "(add10 11): " (add10 11) ; println ""

^x (println x) "something"
