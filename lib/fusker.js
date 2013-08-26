// Generated by CoffeeScript 1.4.0

/*
John Hutchison (clutterskull@gmail.com)
Copyright (c) 2013, Licensed under MIT
*/


(function() {
  var Fusker,
    __hasProp = {}.hasOwnProperty;

  Fusker = (function() {

    function Fusker(options) {
      var _base, _base1, _base2, _base3, _ref, _ref1, _ref2, _ref3, _ref4;
      this.options = options;
      this._reFusks = /[^\r\n\s]+/g;
      this._reRangeTest = /^[^\{]*\[(\d+|[a-zA-Z])-(\d+|[a-zA-Z])\]/;
      this._reRange = /^([^\[]*)\[(\d+|[a-zA-Z])-(\d+|[a-zA-Z])\](.*)/;
      this._reSwitchTest = /^[^\[]*\{[\w|]+\}/;
      this._reSwitch = /^([^\{]*)\{([\w|]+)\}(.*)/;
      if ((_ref = this.options) == null) {
        this.options = {};
      }
      if ((_ref1 = (_base = this.options).autoPad) == null) {
        _base.autoPad = true;
      }
      if ((_ref2 = (_base1 = this.options).padLength) == null) {
        _base1.padLength = 0;
      }
      if ((_ref3 = (_base2 = this.options).padChar) == null) {
        _base2.padChar = '0';
      }
      if ((_ref4 = (_base3 = this.options).pageSize) == null) {
        _base3.pageSize = 20;
      }
      this.fusks = [];
      this.urls = [];
      if (this.options.fusks != null) {
        this.load(this.options.fusks);
      }
    }

    Fusker.prototype.load = function(fusks) {
      this.fusks = fusks;
      if (!(typeof this.fusks === 'string' || Array.isArray(this.fusks))) {
        throw new Error('fusks must be an Array or string');
      }
      return this.urls = this.fusk(this.fusks);
    };

    Fusker.prototype.getAll = function() {
      return this.urls.slice(0);
    };

    Fusker.prototype.getPage = function(page) {
      page = (page < 0 ? this.getPageTotal() + (page + 1) : page || 1);
      return this.urls.slice((page - 1) * this.options.pageSize, page * this.options.pageSize);
    };

    Fusker.prototype.getTotal = function() {
      return this.urls.length || 0;
    };

    Fusker.prototype.getPageTotal = function() {
      return Math.ceil(this.getTotal() / this.options.pageSize);
    };

    Fusker.prototype.getPageSize = function() {
      return this.options.pageSize;
    };

    Fusker.prototype.setPageSize = function(value) {
      return this.options.pageSize = value;
    };

    Fusker.prototype.haveToPage = function() {
      return this.getPageTotal() > 1;
    };

    Fusker.prototype.fusk = function(fusks) {
      var alpha, enums, fusk, high, i, length, low, newPart, parts, urls, _i, _j, _k, _len, _ref, _ref1;
      if (typeof fusks === 'string') {
        fusks = fusks.match(this._reFusks);
      }
      urls = [];
      for (_i = 0, _len = fusks.length; _i < _len; _i++) {
        fusk = fusks[_i];
        if (this._reRangeTest.test(fusk)) {
          parts = this._reRange.exec(fusk);
          length = (this.options.autoPad ? parts[2].length : this.options.padLength);
          low = Number(parts[2]);
          high = Number(parts[3]);
          alpha = false;
          if (!low && !high) {
            low = parts[2].charCodeAt(0);
            high = parts[3].charCodeAt(0);
            alpha = true;
          }
          if (high < low) {
            _ref = [low, high], high = _ref[0], low = _ref[1];
          }
          for (i = _j = low; low <= high ? _j <= high : _j >= high; i = low <= high ? ++_j : --_j) {
            newPart = (alpha ? String.fromCharCode(i) : this.pad(i, length));
            urls = urls.concat(this.fusk(parts[1] + newPart + parts[4]));
          }
        } else if (this._reSwitchTest.test(fusk)) {
          parts = this._reSwitch.exec(fusk);
          enums = parts[2].split("|");
          for (i = _k = 0, _ref1 = enums.length; 0 <= _ref1 ? _k <= _ref1 : _k >= _ref1; i = 0 <= _ref1 ? ++_k : --_k) {
            if (enums[i]) {
              urls = urls.concat(this.fusk(parts[1] + enums[i] + parts[3]));
            }
          }
        } else {
          urls.push(fusk);
        }
      }
      return urls;
    };

    Fusker.prototype.removeDuplicates = function() {
      var key, output, url, _i, _len, _ref, _results;
      output = {};
      _ref = this.getAll();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        url = _ref[_i];
        output[url] = url;
      }
      _results = [];
      for (key in output) {
        if (!__hasProp.call(output, key)) continue;
        url = output[key];
        _results.push(url);
      }
      return _results;
    };

    Fusker.prototype.pad = function(number, length, padChar) {
      var str, _ref;
      str = '' + number;
      length = (length >= str.length ? length : str.length);
      if (padChar == null) {
        padChar = (_ref = this.options.padChar) != null ? _ref : '0';
      }
      while (str.length < length) {
        str = padChar + str;
      }
      return str;
    };

    return Fusker;

  })();

  module.exports.Fusker = Fusker;

}).call(this);