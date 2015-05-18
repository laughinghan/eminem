#!/usr/bin/env bash

tests=0
failures=0
for test in ./tests/*.em; do
  echo "Testing $test"
  (( tests++ ))
  expected_output="${test%.em}.out"
  diff <(node <(./em2js <"$test" 2>/dev/null) 2>/dev/null) "$expected_output" \
    || (( failures++ ))
done
echo

(( failures > 0 )) && echo "FAILED $failures out of $tests tests" && exit 1
echo "Passed all $tests tests"
