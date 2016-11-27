// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp
'use strict';

angular.module('app.minhaConta', ['ngRoute', 'app.localstorage', 'ui.router', 'ngCpfCnpj'])

// Routing configuration for this module
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('minhaConta', {
            url: '/minha-conta',
            controller: 'MinhaContaController',
            templateUrl: 'components/views/minha-conta.html'
        })
}])

// Controller definition for this module
.controller('MinhaContaController', ['$scope', '$http', '$timeout', 'LocalStorageService', '$state', '$rootScope', 'userService',
    function($scope, $http, $timeout, LocalStorageService, $state, $rootScope, userService) {
        $scope.selectedAddress = null;
        init();

        // Objeto de endereço
        $scope.addressBase = {
            cep: null,
            logradouro: null,
            numero: null,
            bairro: null,
            cidade: null,
            uf: null
        }

        function init() {
            $scope.userLogged = LocalStorageService.getData(LocalStorageService.storeMap.USER);
        };


        $scope.update = function() {
            userService.updateUser($scope.userLogged).then(function success(res) {
                // Recebe a revisão atualizada do documento de usuário
                $scope.userLogged._id = res.data.id;
                $scope.userLogged._rev = res.data.rev;
                // Atualiza localstorage
                LocalStorageService.setData(LocalStorageService.storeMap.USER, $scope.userLogged);
                alert("Dados alterados com sucesso!");
                console.log(LocalStorageService.getData(LocalStorageService.storeMap.USER));
            }, function error(err) {
                alert("Não foi possível salvar os dados do usuário");
            });
        }

        $scope.getUserInfo = function() {
            userService.getUserInfo({
                email: $scope.userLogged.email,
                password: $scope.userLogged.password
            }).then(function success(res) {
                // Atualiza dados do usuário
                $scope.userLogged = res.data;
                // Salva os dados na localstorage
                LocalStorageService.setData(LocalStorageService.storeMap.USER, $scope.userLogged);
            }, function erro(err) {
                alert("Não foi possível retornar os dados do usuário");
            });
        };

        $scope.selectAddress = function(address, index) {
            $scope.selectedAddress = address;
            $scope.selectedAddress.index = index;
        }


        $scope.addAddress = function() {
            console.log($scope.userLogged);
            $scope.selectedAddress.criado = Date.now();
            console.log($scope.userLogged.endereco);
            if ($scope.userLogged && !$scope.userLogged.endereco) {
                $scope.userLogged.endereco = [];
            }
            $scope.userLogged.endereco.push($scope.selectedAddress);
            $scope.update();
            $scope.selectedAddress = null;
        }

        $scope.newAddress = function() {
            $scope.selectedAddress = $scope.addressBase
        }

        $scope.removeAddress = function(address) {
            console.log($scope.selectedAddress.index);
            $scope.userLogged.endereco.splice($scope.selectedAddress.index, 1);
            $scope.selectedAddress = null;
            $scope.update();
        }

        $scope.cancelEdit = function() {
            $scope.selectedAddress = null;
        }

        /*
        bairro,cep,complemento,gia,ibge,localicade(cidade),logradouro,uf,unidade
        */
        $scope.buscarCEP = function() {
            $http({
                method: 'GET',
                url: 'https://viacep.com.br/ws/' + $scope.selectedAddress.cep + '/json/'
            }).then(function success(res) {
                $scope.selectedAddress.logradouro = res.data.logradouro;
                $scope.selectedAddress.bairro = res.data.bairro;
                $scope.selectedAddress.cidade = res.data.localidade;
                $scope.selectedAddress.uf = res.data.uf;
            });
        }

        $scope.logout = function() {
            LocalStorageService.unset(LocalStorageService.storeMap.USER);
            $scope.userLogged = null;
            $rootScope.$broadcast("update-login");
            $rootScope.$broadcast("update-cart");
            $state.go("home");
        }
    }
]);
