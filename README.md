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


Usage
------------

## Configuration
You can configure the default behaviour of all settings. See [chessboard.js Documentation](http://chessboardjs.com/docs)
for all values an their purpose.

```
angular.config(['nywtonChessboardConfigProvider', function nywtonChessConfigConfig(chessboardProvider) {
  chessboardProvider.pieceTheme('../bower_components/chessboard.js/img/chesspieces/wikipedia/{piece}.png');
  chessboardProvider.draggable(true).position('start');
}])
```

## Directive
The default settings will create a board with draggable pieces in starting position:
```
<nywton-chessboard></nywton-chessboard>
```

Create an empty board:
```
<nywton-chessboard board="boardA" data-position="'empty'"></nywton-chessboard>
```

Create a board with non-draggable pieces in starting position:
```
<nywton-chessboard board="boardB" data-draggable="false"></nywton-chessboard>
```

An auto resizeable board:
```
<nywton-chessboard board="boardC" data-nywton-chessboard-autoresize></nywton-chessboard>
```

A resizeable board initialized with "Ruy Lopez" (or Spanish Opening):
```
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
