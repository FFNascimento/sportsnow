'use strict';

angular.module('app.productList', ['ui.router', 'ngRoute'])
.controller('ProductListController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout, $stateParams) {

	alert("eita");

	$scope.products = {};

    $scope.getAPIData = function() {
        $http({
            method: 'GET',
            url: 'get/products/filter/' + $stateParams.type
        }).then(function success(res) {
            $scope.products = res;
        }, function error(err) {});
    };

    $scope.getAPIData();
}]);
