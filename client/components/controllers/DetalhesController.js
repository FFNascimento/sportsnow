// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('app.detalhes', ['ngRoute', 'LocalStorageModule', 'ui.router'])

// Routing configuration for this module
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('detalhes', {
            url: '/detalhes/:productId',
            controller: 'DetalhesController',
            templateUrl: 'components/views/detalhes.html'
        });
}])

// Controller definition for this module
.controller('DetalhesController', ['$scope', 'localStorageService', '$stateParams', '$state', '$http', function($scope, localStorageService, $stateParams, $state, $http) {
    // Just a housekeeping.
    // In the init method we are declaring all the
    // neccesarry settings and assignments to be run once
    // controller is invoked
    $scope.userLogged = null;
    $scope.produto = null;
    $scope.relacionados = null;
    $scope.maxRelated = 6;
    $scope.sendCartStructure = null;
    init();

    function init() {
        $scope.userLogged = localStorageService.get('loggedUser');
        var _id = $stateParams.productId;
        if (_id) {
            // Pega dados do produto selecionado
            $http({
                method: 'GET',
                url: 'api/get/product/' + _id,
            }).then(function success(res) {
                // Preenche a tela com os dados do produto
                $scope.produto = res.data;
                $scope.produto.qtdList = setQtdArray($scope.produto.quantity);
                $http({
                    method: 'GET',
                    url: 'api/get/products/related/' + $scope.produto.productType + '/' + _id,
                }).then(function(res) {
                    $scope.relacionados = res.data;
                });
            });
            // Retorna lista de produtos relacionados

        } else {
            $state.go('home');
        }
    };

    function setQtdArray(qtd) {
        var qtdArray = [];
        for (var i = 0; i < qtd; i++) {
            qtdArray.push(i + 1);
            if (qtdArray.length > 5)
                break;
        }
        return qtdArray;
    }

    function alreadyOnCart(item) {
        return item._id === $scope.produto._id;
    }

    function getBasicStructure() {
        return {
            _id: $scope.produto._id,
            name: $scope.produto.name,
            description: $scope.produto.description,
            quantity: 1,
            addedOn: Date.now()
        }
    }

    $scope.setQtd = function(qtd) {
        $scope.produto.selectedQtd = qtd;
    }

    $scope.addCarrinho = function() {
        $scope.sendCartStructure = localStorageService.get('cart');
        if (!$scope.sendCartStructure) {
            $scope.sendCartStructure = {
                itens: []
            }
            $scope.sendCartStructure.itens.push(getBasicStructure());
            console.log($scope.sendCartStructure.itens);
            localStorageService.set('cart', $scope.sendCartStructure);
            $state.go('cart');

        } else {
            if (!$scope.sendCartStructure.itens.some(alreadyOnCart)) {
                $scope.sendCartStructure.itens.push(getBasicStructure());
                console.log($scope.sendCartStructure.itens);
                localStorageService.set('cart', $scope.sendCartStructure);
                $state.go('cart');
            } else {
                $state.go('cart');
            }
        }
    }



}]);
