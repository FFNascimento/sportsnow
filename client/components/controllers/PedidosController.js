'use strict';

angular.module('app.pedido', ['ngRoute', 'app.localstorage', 'ui.router', 'ngCpfCnpj'])

// Routing configuration for this module
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('meusPedidos', {
            url: '/pedidos',
            controller: 'PedidosController',
            templateUrl: 'components/views/meus-pedidos.html',
        });
}])

// Controller definition for this module
.controller('PedidosController', ['$scope', '$http', '$timeout', 'LocalStorageService', '$state', '$rootScope', 'userService',
    function($scope, $http, $timeout, LocalStorageService, $state, $rootScope, userService) {

    }
]);
