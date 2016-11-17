'use strict';

angular.module('app.home', ['ngRoute', 'LocalStorageModule', 'ui.router'])

// Controller definition for this module
.controller('IndexController', ['$scope', 'localStorageService', function($scope, localStorageService) {
    // Just a housekeeping.
    // In the init method we are declaring all the
    // neccesarry settings and assignments to be run once
    // controller is invoked
    $scope.userLogged = null;
    init();

    function init() {
        $scope.userLogged = localStorageService.get('loggedUser');
        console.log($scope.userLogged);
    };

}]);
