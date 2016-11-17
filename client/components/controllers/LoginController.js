// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp
'use strict';

angular.module('app.login', ['ngRoute', 'LocalStorageModule', 'ui.router', 'ngCpfCnpj'])

// Routing configuration for this module
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'components/views/login.html'
        });
}])

// Controller definition for this module
.controller('LoginController', ['$scope', '$http', '$timeout', 'localStorageService', '$state', '$rootScope',
    function($scope, $http, $timeout, localStorageService, $state, $rootScope) {
        $scope.userLogged = null;
        init();

        function init() {
            $scope.userLogged = localStorageService.get('loggedUser');
        };

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
                $scope.login.email = usuario.email;
                $scope.login.password = usuario.password;
                $scope.signup();
            }, function error(err) {
                console.log('Deu ruim =(');
            });
        };

        $scope.signup = function() {
            console.log($scope.login);
            $http({
                method: 'POST',
                url: 'api/authorize/user',
                data: JSON.stringify($scope.login)
            }).then(function success(res) {
                // Armazenar em localstorage
                localStorageService.set('loggedUser', {
                    _id: res.data._id,
                    name: res.data.name,
                    email: res.data.email,
                    permission: res.data.permission,
                    password: res.data.password
                });
                $state.go('home');
            }, function error(err) {
                console.log('Não vai passar ninguem!');
            });
        };

        $scope.compare = function() {
            $scope.pwdMatch = $scope.user.password === $scope.user.passwordConfirmation;
            console.log($scope.pwdMatch);
        }

        $scope.logout = function() {
            localStorageService.clearAll();
            $scope.userLogged = null;
            $rootScope.$broadcast("update-login");
        }
    }
]);
