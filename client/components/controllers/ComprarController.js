// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('app.comprar', ['ngRoute', 'LocalStorageModule', 'ui.router'])

// Routing configuration for this module
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('comprar', {
            url: '/finalizar',
            controller: 'ComprarController',
            templateUrl: 'components/views/comprar.html'
        });
}])

// Controller definition for this module
.controller('ComprarController', ['$scope', '$http', 'localStorageService', '$rootScope', function($scope, $http, localStorageService, $rootScope) {

    // Just a housekeeping.
    // In the init method we are declaring all the
    // neccesarry settings and assignments to be run once
    // controller is invoked
    $scope.userLogged = null;
    init();
    $scope.pedido = null;

    function init() {
        $scope.userLogged = localStorageService.get('loggedUser');
    };

    // $scope.tipoLogradouro = [{
    //     tipo: 'Avenida'
    // }, {
    //     tipo: 'Rua'
    // }, {
    //     tipo: 'Rodovia'
    // }];

    $scope.address = {
        tipo: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
    };

    // Objeto para login, está separado do de usuário para evitar problemas com o Two way databind
    $scope.login = {
        email: '',
        password: ''
    };

    $scope.cadastrarEndereco = function() {
        $scope.endereco = $scope.address.tipo + " " + $scope.address.logradouro + ", " + $scope.address.numero + " - " + $scope.address.cidade + "/" + $scope.address.estado
        console.log($scope.userLogged);
        // Ajusta ao padrão do usuário
        var usuario = {
            _id: $scope.userLogged._id,
            _rev: $scope.userLogged._rev,
            email: $scope.userLogged.email,
            permission: $scope.userLogged.permission,
            password: $scope.userLogged.password,
            endereco: $scope.endereco,
            name: $scope.userLogged.name,
            rg: $scope.userLogged.rg,
            cpf: $scope.userLogged.cpf
        }
        console.log(usuario);
        $http({
            method: 'POST',
            url: 'api/update/user',
            data: JSON.stringify(usuario)
        }).then(function success(res) {
            alert("Endereço cadastrado com sucesso!");
            $scope.cart = localStorageService.get('cart');
            $scope.cart.itens.forEach(function(item) {
                $http({
                    method: 'POST',
                    url: 'api/sell/products',
                    data: JSON.stringify(item)
                }).then(function success(res) {
                  console.log(res);
                });
            });
            localStorageService.remove('cart');
            $scope.pedido = 'ZORG-' + Date.now();

        }, function error(err) {
            alert("Endereço não cadastrado!")
                // console.log('Cadastrou não migão');
        });

    }

    $scope.signup = function() {
        $http({
            method: 'POST',
            url: 'api/authorize/user',
            data: JSON.stringify($scope.login)
        }).then(function success(res) {
            // Armazenar em localstorage
            localStorageService.set('loggedUser', {
                _id: res.data._id,
                _rev: res.data._rev,
                name: res.data.name,
                email: res.data.email,
                permission: res.data.permission,
                password: res.data.password,
                rg: res.data.rg,
                cpf: res.data.cpf
            });
            $rootScope.$broadcast("update-login");
            $scope.userLogged = localStorageService.get('loggedUser');
        }, function error(err) {
            alert('Dados de login inválidos!');
        });
    };

}]);
