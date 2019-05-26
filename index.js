// -*- compile-command: "node test.js"; -*-
module.exports = function(rangeHeader) {
  var out = { unit: '', ranges: [] }
  rangeHeader = rangeHeader.trim()

  // unit
  var unitMatch = rangeHeader.match(/^([A-Za-z_-][A-Za-z0-9_-]+)/)
  if (unitMatch == null) return
  out.unit = unitMatch[1]

  // ranges
  var rangeStrings = rangeHeader.replace(/^[^=]+=/, '').split(',')
  for (var i in rangeStrings) {
    var range = []
    var tokens = rangeStrings[i].split('-').map((s) => { return s.trim() })
    if (tokens.length != 2) return
    if (tokens[0] == '' && tokens[1] == '') return

    var beg = parseInt(tokens[0]), end = parseInt(tokens[1])
    if (tokens[0] == '' && !isFinite(end)) return
    if (tokens[1] == '' && !isFinite(beg)) return
    if (tokens[0] != '' && !isFinite(beg)) return
    if (tokens[1] != '' && !isFinite(end)) return

    if (tokens[0] == '') { range[0] = -end; range[1] = -1 }
    if (tokens[1] == '') { range[0] =  beg; range[1] = -1 }
    if (tokens[0] != '' && tokens[1] != '') {
      range[0] = beg; range[1] = end
    }

    out.ranges.push(range)
  }
  if(out.ranges.length == 0) return

  return out
}
