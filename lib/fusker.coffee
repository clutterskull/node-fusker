###
John Hutchison (clutterskull@gmail.com)
Copyright (c) 2013, Licensed under MIT
###

class Fusker

  constructor: (@options) ->
    # regular expressions
    @_reFusks = /[^\r\n\s]+/g
    @_reRangeTest = /^[^\{]*\[(\d+|[a-zA-Z])-(\d+|[a-zA-Z])\]/
    @_reRange = /^([^\[]*)\[(\d+|[a-zA-Z])-(\d+|[a-zA-Z])\](.*)/
    @_reSwitchTest = /^[^\[]*\{[\w|]+\}/
    @_reSwitch = /^([^\{]*)\{([\w|]+)\}(.*)/

    # options
    @options ?= {}
    @options.autoPad ?= true
    @options.padLength ?= 0
    @options.padChar ?= '0'
    @options.pageSize ?= 20

    @fusks = []
    @urls = []

    @load @options.fusks if @options.fusks?


  load: (@fusks) ->
    throw new Error 'fusks must be an Array or string' unless typeof @fusks is 'string' or Array.isArray @fusks
    @urls = @fusk(@fusks)


  getAll: ->
    @urls.slice 0


  getPage: (page) ->
    page = (if (page < 0) then @getPageTotal() + (page + 1) else (page or 1))
    @urls.slice (page - 1) * @options.pageSize, page * @options.pageSize


  getTotal: ->
    @urls.length or 0


  getPageTotal: ->
    Math.ceil @getTotal() / @options.pageSize


  getPageSize: ->
    @options.pageSize


  setPageSize: (value) ->
    @options.pageSize = value


  haveToPage: ->
    @getPageTotal() > 1


  # utility methods
  fusk: (fusks) ->
    fusks = fusks.match @_reFusks if typeof fusks is 'string'

    # break the url into an array of urls (individual fusks)
    urls = []
    for fusk in fusks
      if @_reRangeTest.test fusk
        # process a range
        parts = @_reRange.exec fusk

        # parts 0: whole url, 1: pre, 2: low number, 3: high number, 4: post
        length = (if @options.autoPad then parts[2].length else @options.padLength)

        # check for character ranges
        low = Number parts[2]
        high = Number parts[3]
        alpha = false
        if not low and not high
          low = parts[2].charCodeAt 0
          high = parts[3].charCodeAt 0
          alpha = true
        if high < low
          [high, low] = [low, high]

        for i in [low..high]
          # convert back to character or add padding
          newPart = (if alpha then String.fromCharCode i else @pad i, length)
          urls = urls.concat @fusk parts[1] + newPart + parts[4]

      else if @_reSwitchTest.test fusk
        # process a switch
        parts = @_reSwitch.exec fusk
        # parts 0: whole url, 1: pre, 2: enums, 3: post
        enums = parts[2].split("|")
        for i in [0..enums.length]
          urls = urls.concat @fusk parts[1] + enums[i] + parts[3] if enums[i]

      else
        # plain url
        urls.push fusk

    urls


  removeDuplicates: ->
    output = {}
    output[url] = url for url in @getAll()
    (url for own key, url of output)


  pad: (number, length, padChar) ->
    str = '' + number
    length = (if length >= str.length then length else str.length)
    padChar ?= @options.padChar ? '0'
    str = padChar + str while str.length < length
    str


module.exports.Fusker = Fusker