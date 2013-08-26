util = require 'util'
{Fusker} = require '../'


fusker = new Fusker()
fusker.load 'http://www.example.com/{Man|Bear|Pig}[0001-005]-[1-2].jpg'

urls = fusker.getAll()

#console.log urls

success = urls.length is 30
(if success then console.log else console.error) '\nGenerated ' + urls.length + ' urls from input fusk, 30 expected.'
process.exit if success then 0 else 1