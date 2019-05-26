// -*- compile-command: "node test.js"; -*-
var assert = require('assert')
var parseHttpRangeHeader = require('./index.js')

var case0 = 'bytes=20-'
var case1 = 'lines=2-10'
var case2 = 'pages=30-40, 60-70'
var case3 = 'chapters=-2'

var parsed0 = parseHttpRangeHeader(case0)
assert(parsed0.unit == 'bytes')
assert(parsed0.ranges.length == 1)
assert(parsed0.ranges[0][0] == 20)
assert(parsed0.ranges[0][1] == -1)

var parsed1 = parseHttpRangeHeader(case1)
assert(parsed1.unit == 'lines')
assert(parsed1.ranges.length == 1)
assert(parsed1.ranges[0][0] ==  2)
assert(parsed1.ranges[0][1] == 10)

var parsed2 = parseHttpRangeHeader(case2)
assert(parsed2.unit == 'pages')
assert(parsed2.ranges.length == 2)
assert(parsed2.ranges[0][0] == 30)
assert(parsed2.ranges[0][1] == 40)
assert(parsed2.ranges[1][0] == 60)
assert(parsed2.ranges[1][1] == 70)

var parsed3 = parseHttpRangeHeader(case3)
assert(parsed3.unit == 'chapters')
assert(parsed3.ranges.length == 1)
assert(parsed3.ranges[0][0] == -2)
assert(parsed3.ranges[0][1] == -1)

assert(!parseHttpRangeHeader('bytes=,'))
assert(!parseHttpRangeHeader('lines=33,ab'))
assert(!parseHttpRangeHeader('lines='))
assert(!parseHttpRangeHeader('_*=20-30'))
assert(!parseHttpRangeHeader('=20-30'))
