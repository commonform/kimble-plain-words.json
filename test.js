const tv4 = require('tv4')
const data = require('./')
const schema = require('./schema.json')

const result = tv4.validateMultiple(data, schema)
if (result.valid) {
  process.exit(0)
} else {
  const lispy = require('lispy-json')
  process.stderr.write(lispy(result.errors) + '\n')
  process.stderr.write(lispy(result.missing) + '\n')
  process.stderr.on('drain', function () {
    process.exit(1)
  })
}
