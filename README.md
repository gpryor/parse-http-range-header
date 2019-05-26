# parse-http-range-header

Syntax-verify and parse [HTTP request range
header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)

```
var parseRangeHeader = require('parse-http-range-header')

parseRangeHeader('pages=30-40, 60-70')
// -> { unit: 'pages', ranges: [ [ 30, 40 ], [ 60, 70 ] ] }
```
