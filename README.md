[![Build Status](https://api.travis-ci.org/theborakompanioni/angular-chessboard.png?branch=master)](https://travis-ci.org/theborakompanioni/angular-chessboard)
[![Dependency Status](https://david-dm.org/theborakompanioni/angular-chessboard.svg)](https://david-dm.org/theborakompanioni/angular-chessboard)
[![devDependency Status](https://david-dm.org/theborakompanioni/angular-chessboard/dev-status.svg)](https://david-dm.org/theborakompanioni/angular-chessboard#info=devDependencies)
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

angular-chessboard
==================

Chess Board Directive for AngularJS based on [chessboard.js](http://chessboardjs.com/)

Download
------------

### Bower
Install with bower
```
bower install theborakompanioni/angular-chessboard --save
```

### Github
[Download from Github](https://github.com/theborakompanioni/angular-chessboard/releases)


Add the following tags to your project
```html
<link rel="stylesheet" href="/chessboard.js/css/chessboard.css"/>
<script src="/chessboard.js/js/chessboard.js"></script>
<script src="/angular-chessboard/dist/angular-chessboard.min.js"></script>
```
Usage
------------

## Configuration
You can configure the default behaviour of all settings. See [chessboard.js Documentation](http://chessboardjs.com/docs)
for all values an their purpose.

```javascript
angular.config(['nywtonChessboardConfigProvider', function nywtonChessConfigConfig(chessboardProvider) {
  chessboardProvider.draggable(true)
    .position('start');
    .pieceTheme('/chessboard.js/img/chesspieces/wikipedia/{piece}.png');
}])
```

## Directive
The default settings will create a board with draggable pieces in starting position:
```html
<nywton-chessboard></nywton-chessboard>
```

Create an empty board:
```html
<nywton-chessboard board="boardA" data-position="'empty'"></nywton-chessboard>
```

Create a board with non-draggable pieces in starting position:
```html
<nywton-chessboard board="boardB" data-draggable="false"></nywton-chessboard>
```

An auto resizeable board:
```html
<nywton-chessboard board="boardC" 
  data-nywton-chessboard-autoresize
></nywton-chessboard>
```

A resizeable board initialized with "Ruy Lopez" (or Spanish Opening):
```html
<nywton-chessboard board="boardD" 
  data-nywton-chessboard-autoresize
  data-nywton-position-ruy-lopez
></nywton-chessboard>
```

Contribute
------------

- Issue Tracker: https://github.com/theborakompanioni/angular-chessboard/issues
- Source Code: https://github.com/theborakompanioni/angular-chessboard

### Clone Repository
`git clone https://github.com/theborakompanioni/angular-chessboard.git`

#### Install dependencies

`npm install && bower install`

#### Build project

`grunt`

#### Run tests

`grunt test`


License
-------

The project is licensed under the MIT license. See
[LICENSE](https://github.com/theborakompanioni/angular-chessboard/blob/master/LICENSE) for details.
