const tv4 = require('tv4')
const data = require('./')
const schema = require('./schema.json')

const result = tv4.validateMultiple(data, schema)
if (result.valid) {
  process.exit(0)
} else {
  process.stderr.write(JSON.stringify(result.errors, null, 2) + '\n')
  process.stderr.write(JSON.stringify(result.missing, null, 2) + '\n')
  process.stderr.on('drain', function () {
    process.exit(1)
  })
}
