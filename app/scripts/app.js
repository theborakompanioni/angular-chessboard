'use strict';

var app = angular.module('nywton.chessboard.app', ['nywton.chessboard']);

app.config(['nywtonChessboardConfigProvider', function nywtonChessConfigConfig(chessboardProvider) {
  chessboardProvider.pieceTheme('../bower_components/chessboard.js/img/chesspieces/wikipedia/{piece}.png');
  chessboardProvider.draggable(false);
}]);


app.controller('BodyCtrl', [function() {

}]);