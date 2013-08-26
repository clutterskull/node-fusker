node-fusker - A Fusking library for Node.js
===========================================

Generates URLs from a fusk (a string or collection of strings containing expansions).
A single fusk can contain multiple expansions.

Supports the following syntax:
* Range [...-...] - Hyphen separated low to high.
  * Numeric [1-10] - Generates 1, 2, ..., 10
  * Padded Numeric [001-010] - Generates 001, 002, 003, ..., 010
  * Alpha [a-z] - Generates a, b, c, d, ..., z
* Switch {...|...} - Pipe separated words.
  * Example {Man|Bear|Pig} - Generates Man, Bear, Pig

## Example of url syntax

A Fusk containing 'http://www.example.com/{Man|Bear|Pig}_[0001-005]-[1-2].jpg' will generate:
* 'http://www.example.com/Man_0001-1.jpg'
* 'http://www.example.com/Man_0001-2.jpg'
* 'http://www.example.com/Man_0002-1.jpg'
* 'http://www.example.com/Man_0002-2.jpg'
* 'http://www.example.com/Man_0003-1.jpg'
* 'http://www.example.com/Man_0003-2.jpg'
* 'http://www.example.com/Man_0004-1.jpg'
* 'http://www.example.com/Man_0004-2.jpg'
* 'http://www.example.com/Man_0005-1.jpg'
* 'http://www.example.com/Man_0005-2.jpg'
* 'http://www.example.com/Bear_0001-1.jpg'
* 'http://www.example.com/Bear_0001-2.jpg'
* 'http://www.example.com/Bear_0002-1.jpg'
* 'http://www.example.com/Bear_0002-2.jpg'
* 'http://www.example.com/Bear_0003-1.jpg'
* 'http://www.example.com/Bear_0003-2.jpg'
* 'http://www.example.com/Bear_0004-1.jpg'
* 'http://www.example.com/Bear_0004-2.jpg'
* 'http://www.example.com/Bear_0005-1.jpg'
* 'http://www.example.com/Bear_0005-2.jpg'
* 'http://www.example.com/Pig_0001-1.jpg'
* 'http://www.example.com/Pig_0001-2.jpg'
* 'http://www.example.com/Pig_0002-1.jpg'
* 'http://www.example.com/Pig_0002-2.jpg'
* 'http://www.example.com/Pig_0003-1.jpg'
* 'http://www.example.com/Pig_0003-2.jpg'
* 'http://www.example.com/Pig_0004-1.jpg'
* 'http://www.example.com/Pig_0004-2.jpg'
* 'http://www.example.com/Pig_0005-1.jpg'
* 'http://www.example.com/Pig_0005-2.jpg'

## Usage

Using load():
```
Fusker = require('node-fusker').Fusker;

var fusker = new Fusker();

fusker.load(fusks);
var urls = fusker.getAll();
```

Using fusk():
```
Fusker = require('node-fusker').Fusker;

var fusker = new Fusker(),
    urls = fusker.fusk(fusks);
```

Using constructor:
```
Fusker = require('node-fusker').Fusker;

var fusker = new Fusker({
    fusks: fusks
}),
    urls = fusker.getAll();
```

Options:
* fusks - A string or array containing fusks. If a string, fusks are separated by whitespace or newlines.
* autoPad (default: true) - If true, will automatically pad any range containing a pad character (eg, 001 would pad to 3 characters with '0'). Recommended 'true'.
* padLength - If autoPad is false, this value will manually set the pad size (not recommended).
* padChar - If autoPad is false, this value will manually set the pad character (not recommended).

