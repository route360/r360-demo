'use strict';

describe('Directive: r360Rainbow', function () {

  // load the directive's module
  beforeEach(module('r360DemoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<r360-rainbow></r360-rainbow>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the r360Rainbow directive');
  }));
});
