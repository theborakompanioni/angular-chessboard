'use strict';

angular.module('nywton.chessboard.app', ['nywton.chessboard'])

.config(['nywtonChessboardConfigProvider', function nywtonChessConfigConfig(chessboardProvider) {
  chessboardProvider.pieceTheme('../bower_components/chessboard.js/dist/img/chesspieces/wikipedia/{piece}.png');
  chessboardProvider.draggable(true).position('start');
}])

.controller('BodyCtrl', [function() {

}])

.directive('chessboardDebug', [function () {
  var directive = {
    restrict: 'A',
    priority: 1,
    scope : {
      board: '=chessboardDebug',
    },
    template: '<div>' +
     '<button type="button" data-ng-click="_debug = !_debug">show debug</button>' +
     '<div class="game-debug-container" data-ng-show="_debug">' +
       '<span class="label label-info">board {{board.name}}</span>' +
       '<p><code>fen()? {{board.fen()}}</code></p>'+
       '<p><code>position()? {{board.position() | json}}</code></p>'+
       '<p><code>orientation()? {{board.orientation()}}</code></p>'+
     '</div>' +
   '</div>',
  };

  return directive;
}]);
