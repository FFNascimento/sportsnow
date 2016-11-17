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
.controller('ComprarController', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService) {

    // Just a housekeeping.
    // In the init method we are declaring all the
    // neccesarry settings and assignments to be run once
    // controller is invoked
    $scope.userLogged = null;
    init();

    function init() {
        $scope.userLogged = localStorageService.get('loggedUser');
    };

    $scope.tipoLogradouro = [{
        tipo: 'Avenida'
    }, {
        tipo: 'Rua'
    }, {
        tipo: 'Rodovia'
    }];

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

    $scope.cadastrarEndereco = function() {
        $scope.endereco = $scope.address.tipo + " " + $scope.address.logradouro + ", " + $scope.address.numero + " - " + $scope.address.cidade + "/" + $scope.address.estado

        // Ajusta ao padrão do usuário
        var usuario = {
            id: $scope.userLogged._id,
            rev: $scope.userLogged._rev,
            endereco: $scope.endereco
        }

        $http({
            method: 'POST',
            url: 'api/update/user',
            data: JSON.stringify(usuario)
        }).then(function success(res) {
            alert("Endereço cadastrado com sucesso!")
        }, function error(err) {
          alert("Endereço não cadastrado!")
            // console.log('Cadastrou não migão');
        });

    }

}]);
