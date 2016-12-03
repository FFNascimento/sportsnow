'use strict';

angular.module('app.home', ['ngRoute', 'app.localstorage', 'ui.router'])

// Controller definition for this module
.controller('IndexController', ['$scope', 'LocalStorageService', function($scope, LocalStorageService) {
    // Just a housekeeping.
    // In the init method we are declaring all the
    // neccesarry settings and assignments to be run once
    // controller is invoked
    $scope.userLogged = null;
    init();

    function init() {
        $scope.userLogged = LocalStorageService.getData(LocalStorageService.storeMap.USER);
    }

}]);
