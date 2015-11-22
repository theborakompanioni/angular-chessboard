/*global ChessBoard*/
(function (window, ChessBoard, undefined) {
  'use strict';

  var chessboardDefaultConfig = {
    position: undefined,
    showNotation: true,
    orientation: 'white',
    draggable: false,
    dropOffBoard: 'snapback',
    appearSpeed: 200,
    moveSpeed: 200,
    snapbackSpeed: 50,
    snapSpeed: 25,
    trashSpeed: 100,
    sparePieces: false,
    showErrors: false,
    pieceTheme: undefined, // defaults to 'img/chesspieces/wikipedia/{piece}.png'
    onDragStart: angular.noop,
    onDrop: angular.noop,
    onSnapEnd: angular.noop,
    onChange: angular.noop,
    onDragMove: angular.noop,
    onSnapbackEnd: angular.noop,
    onMoveEnd: angular.noop,
    onMouseoutSquare: angular.noop,
    onMouseoverSquare: angular.noop
  };

  angular.module('nywton.chessboard', [])

    .value('nywtonChessboardDefaultConfig', angular.copy(chessboardDefaultConfig))

    .provider('nywtonChessboardConfig', [function () {
      var config = {};

      // add a setter function for all properties
      var that = this;
      angular.forEach(chessboardDefaultConfig, function (value, key) {
        that[key] = function (propertyValue) {
          config[key] = propertyValue;
          return that;
        };
      });

      this.$get = ['nywtonChessboardDefaultConfig', function (defaultConfig) {
        return angular.extend(defaultConfig, config);
      }];
    }])

    .config(['nywtonChessboardConfigProvider', function (configProvider) {
      configProvider.position('empty').orientation('white');
    }])

    .factory('nytwonChessboardObjectFactory', ['nywtonChessboardConfig', function (nywtonChessboardConfig) {
      if (!window.ChessBoard) {
        throw new Error('Unable to find a valid version of chessboard.js.');
      }

      return {
        createInstance: function (element, config) {
          var combined_config = angular.extend(angular.copy(nywtonChessboardConfig), config || {});
          return new window.ChessBoard(element, combined_config);
        }
      };
    }])

    .directive('nywtonChessboard', [
      '$window',
      '$log',
      'nytwonChessboardObjectFactory',
      function ($window, $log, chessboardObjectFactory) {
        var _configAttrs = [
          'draggable',
          'dropOffBoard',
          'position',
          'orientation',
          'showNotation',
          'sparePieces',
          'showErrors',
          'pieceTheme',
          'appearSpeed',
          'moveSpeed',
          'snapbackSpeed',
          'snapSpeed',
          'trashSpeed'
        ];

        var _callbackAttrs = [
          'onChange',
          'onDragStart',
          'onDragMove',
          'onDrop',
          'onSnapbackEnd',
          'onMoveEnd',
          'onMouseoutSquare',
          'onMouseoverSquare',
          'onSnapEnd'
        ];

        var directive = {
          restrict: 'EA',
          scope: {
            name: '@',
            board: '=?',
            // callbacks
            onChange: '&',
            onDragMove: '&',
            onDrop: '&',
            onSnapbackEnd: '&',
            onMoveEnd: '&',
            onMouseoutSquare: '&',
            onMouseoverSquare: '&',
            onSnapEnd: '&',
            // workaround because angular does not like 'onDragStart'
            onDragStart: '&onDragStartCb'
          },
          priority: 1000,
          template: '<div></div>',
          controller: ['$scope', function ($scope) {
            var $ctrl = this;
            var _cfg = [];

            $scope.name = $scope.name || 'board' + $scope.$id;

            this.config_push = function config_pushF(incoming) {
              if (angular.isArray(incoming) && incoming.length === 2 && angular.isString(incoming[0]) && !angular.isUndefined(incoming[1])) {
                _cfg.push(incoming);
              }
            };

            this.config = function configF() {
              var cfg = {};
              angular.forEach(_cfg, function (pair) {
                cfg[pair[0]] = pair[1];
              });
              return cfg;
            };

            this.board = function boardF() {
              return $scope.board;
            };

            var safeDigest = function safeDigestF() {
              return ($scope.$$phase || $scope.$root.$$phase) ? 0 : $scope.$parent.$digest();
            };

            var safeApply = function safeApplyF(scope, fn) {
              return (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
            };

            // TODO: make this configurable
            // calling $digest may on e.g. 'onMouseoverSquare'
            // be overkill in some contexts
            var invokeDigestOnCallbacks = true;
            var applyWrapper = function applyWrapperF(func) {
              return function wrappedApplyInvokation() {
                var args = arguments;
                return safeApply($scope.$parent, function wrappedApplyInner() {
                  return func.apply(this, args);
                });
              };
            };

            // callback attributes e.g. on-mouse-square="myCallback"
            angular.forEach(_callbackAttrs, function (attr) {
              if (angular.isFunction($scope[attr])) {
                var expressionHandler = $scope[attr]();
                // check if callback is a function (or given at all)
                if (angular.isFunction(expressionHandler)) {
                  // wrap in an $apply() call if needed
                  var callback = invokeDigestOnCallbacks ? applyWrapper(expressionHandler) : expressionHandler;
                  $ctrl.config_push([attr, callback]);
                }
                // otherwise push the default callback calling $digest
                else {
                  $ctrl.config_push([attr, safeDigest]);
                }
              }
            });
          }],
          link: function link($scope, $element, $attrs, $ctrl) {
            angular.forEach(_configAttrs, function (attr) {
              $log.debug('attr: ' + attr + ' = ' + $scope.$eval($attrs[attr]));
              if ($attrs.hasOwnProperty(attr)) {
                $ctrl.config_push([attr, $scope.$eval($attrs[attr])]);
              }
            });

            var board_config = $ctrl.config();
            var board_element = angular.element('<div></div>');
            $element.prepend(board_element);

            $scope.board = chessboardObjectFactory.createInstance(board_element, board_config);
            $scope.board.name = $scope.name || 'board' + $scope.$id;

            $scope.$on('$destroy', function onDestroyF() {
              $scope.board.destroy();
            });
          }
        };

        return directive;
      }
    ])

    .directive('nywtonPositionRuyLopez', [function () {

      var directive = {
        restrict: 'A',
        priority: 1,
        require: 'nywtonChessboard',
        link: function link($scope, $element, $attrs, $ctrl) {
          $ctrl.config_push(['position', 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R']);
        }
      };

      return directive;
    }])

    .directive('nywtonPositionStart', [function () {
      var directive = {
        restrict: 'A',
        priority: 1,
        require: 'nywtonChessboard',
        link: function link($scope, $element, $attrs, $ctrl) {
          $ctrl.config_push(['position', 'start']);
        }
      };

      return directive;
    }])

    .directive('nywtonChessboardAutoresize', ['$window', '$timeout', function ($window, $timeout) {
      var directive = {
        restrict: 'A',
        priority: 1,
        require: 'nywtonChessboard',
        link: function link($scope, $element, $attrs, $ctrl) {
          var resizeBoard = function resizeBoardF() {
            if (angular.isDefined($ctrl.board())) {
              $ctrl.board().resize();
            }
          };
          var resizeTimeoutPromise;
          angular.element($window).bind('resize', function () {
            $timeout.cancel(resizeTimeoutPromise);
            resizeTimeoutPromise = $timeout(resizeBoard, 113);
          });
          $scope.$on('$destroy', function onDestroyF() {
            $timeout.cancel(resizeTimeoutPromise);
          });
        }
      };

      return directive;
    }]);

})(window, ChessBoard);
