'use strict';

angular.module('app.productList', ['ui.router', 'ngRoute'])

.controller('ProductListController', ['$scope', '$http', '$timeout', '$stateParams', function($scope, $http, $timeout, $stateParams) {
    $scope.products = {};
    $scope.productsType = null;
    $scope.getAPIData = function() {
        $scope.productsType = $stateParams.type;
        $http({
            method: 'GET',
            url: '/api/get/products/filter/' + $stateParams.type
        }).then(function success(res) {
            $scope.products = res.data;
        }, function error(err) {});
    };

    $scope.getAPIData();
}]);
