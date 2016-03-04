var tv4 = require('tv4')
var data = require('./')
var schema = require('./schema.json')

var result = tv4.validateMultiple(data, schema)
if (result.valid) {
  process.exit(1) }
else {
  var lispy = require('lispy-json')
  process.stderr.write(lispy(result.errors) + '\n')
  process.stderr.write(lispy(result.missing) + '\n')
  process.stderr.on('drain', function() {
    process.exit(1) }) }
