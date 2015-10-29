/*global describe,it,expect,beforeEach,inject*/
'use strict';

describe('chessboardjs', function () {
  var $scope;
  var $compile;

  // load the module
  beforeEach(module('nywton.chessboard'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
  }));

  it('should initialize the boar correctly', function () {
    var element = $compile('<nywton-chessboard board="board"></nywton-chessboard>')($scope);

    $scope.$digest();

    expect(element).toBeDefined();
    expect($scope.board).toBeDefined();
  });

  it('should set the position to "Ruy Lopez"', function () {
    var element = $compile('<nywton-chessboard board="board" nywton-position-ruy-lopez></nywton-chessboard>')($scope);

    $scope.$digest();

    expect(element).toBeDefined();
    expect($scope.board.fen()).toBe('r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R');
  });
});
