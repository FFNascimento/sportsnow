// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('app.login', ['ngRoute', 'LocalStorageModule'])

// Routing configuration for this module
.config(['$routeProvider', function($routeprovider) {
    $routeprovider.when('/login', {
        controller: 'LoginController',
        templateUrl: 'components/views/login.html'
    });
}])

// Controller definition for this module
.controller('LoginController', ['$scope', '$http', '$timeout', 'localStorageService', '$location', function($scope, $http, $timeout, localStorageService, $location) {

    $scope.pwdMatch = true;
    // Objeto para criar novo usuário
    $scope.user = {
        permission: 'USER',
        firstName: '',
        lastName: '',
        cpf: '',
        rg: '',
        endereco: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    };
    // Objeto para login, está separado do de usuário para evitar problemas com o Two way databind
    $scope.login = {
        email: '',
        password: ''
    };

    $scope.cadastrarUsuario = function() {
        // Ajusta ao padrão do usuário
        var usuario = {
            permission: 'USER',
            name: $scope.user.firstName + " " + $scope.user.lastName,
            cpf: $scope.user.cpf,
            rg: $scope.user.rg,
            email: $scope.user.email,
            password: $scope.user.password
        }

        $http({
            method: 'PUT',
            url: 'api/add/user',
            data: JSON.stringify(usuario)
        }).then(function success(res) {
            console.log('Usuário Cadastrado com sucesso');
        }, function error(err) {
            console.log('Deu ruim =(');
        });
    };

    $scope.signup = function() {
        $http({
            method: 'POST',
            url: 'api/authorize/user',
            data: JSON.stringify($scope.login)
        }).then(function success(res) {
            // Armazenar em localstorage
            localStorageService.set('loggedUser', $scope.login.email);
            $location.path('/');
        }, function error(err) {
            console.log('Não vai passar ninguem!');
        });
    };

    $scope.compare = function() {
        $scope.pwdMatch = $scope.user.password === $scope.user.passwordConfirmation;
        console.log($scope.pwdMatch);
    }
}]);
