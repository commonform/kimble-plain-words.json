const tv4 = require('tv4')
const data = require('./')
const schema = require('./schema.json')

const result = tv4.validateMultiple(data, schema)
if (!result.valid) {
  process.stderr.write(JSON.stringify(result.errors, null, 2) + '\n')
  process.stderr.write(JSON.stringify(result.missing, null, 2) + '\n')
  process.stderr.on('drain', function () {
    process.exit(1)
  })
}

const phrases = new Map()
let foundDuplicate = false
for (const entry of data) {
  for (const { phrase, sense } of entry['instead of']) {
    const senses = phrases.get(phrase)
    if (senses) {
      if (senses.includes(sense)) {
        foundDuplicate = true
        process.stderr.write('Duplicate: ' + JSON.stringify({ phrase, sense }))
      } else {
        phrases.set(phrase, senses.concat(sense))
      }
    } else {
      phrases.set(phrase, [sense])
    }
  }
}
process.exit(foundDuplicate ? 1 : 0)
