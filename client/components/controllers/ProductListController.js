'use strict';

angular.module('app.productList', ['ui.router', 'ngRoute'])
.controller('ProductListController', ['$scope', '$http', '$timeout', '$stateParams', function($scope, $http, $timeout, $stateParams) {
    
	alert("eita");


	$scope.products = {};

    $scope.getAPIData = function() {
        $http({
            method: 'GET',
            url: '/get/products/filter/MASCULINO'
        }).then(function success(res) {
            $scope.products = res;
            alert(JSON.stringify($scope.products));
        }, function error(err) {
            alert(JSON.stringify(err));
        });
    };

    $scope.getAPIData();
}]);