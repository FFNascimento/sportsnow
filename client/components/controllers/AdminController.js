// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp
'use strict';

angular.module('app.admin', ['ngRoute', 'app.localstorage', 'ui.router', 'ngCpfCnpj', 'app.user.service', 'app.admin.service'])

// Routing configuration for this module
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('admin', {
            url: '/admin',
            controller: 'AdminController',
            templateUrl: 'components/views/admin.html'
        });
}])

// Controller definition for this module
.controller('AdminController', ['$scope', '$http', '$timeout', 'LocalStorageService', '$state', '$rootScope', 'reportService',
    function($scope, $http, $timeout, LocalStorageService, $state, $rootScope, reportService) {
        init();
        $scope.list = [];

        function init() {
            $scope.userLogged = LocalStorageService.getData(LocalStorageService.storeMap.USER);
            $rootScope.$broadcast("update-login");
        };

        $scope.loadHome = function() {
            document.getElementById("content").innerHTML = '<ul><li ng-repeat="entry in list"> {{entry._id}} </li></ul>';
            reportService.products().then(function(res) {
                $scope.list = res.data;
            }, function(fail) {
                alert(JSON.stringify(fail));
                alert('fail');
            });
        };
    }
]);
