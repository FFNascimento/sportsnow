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
        $scope.selectedAddress = null;
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
                alert('Usuário não cadastrado!');
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
                    _rev: res.data._rev,
                    name: res.data.name,
                    email: res.data.email,
                    permission: res.data.permission,
                    password: res.data.password,
                    rg: res.data.rg,
                    cpf: res.data.cpf
                });
                $state.go('home');
            }, function error(err) {
                alert('Dados de login inválidos!');
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
            $rootScope.$broadcast("update-cart");
        }

        $scope.update = function() {
            $http({
                method: 'POST',
                url: 'api/update/user',
                data: $scope.userLogged
            }).then(function success(res) {
                // Recebe a revisão atualizada do documento de usuário
                $scope.userLogged._id = res.data.id;
                $scope.userLogged._rev = res.data.rev;

                localStorageService.set('loggedUser', $scope.userLogged);
                alert("Dados alterados com sucesso!");
            }, function error(err) {
                alert("Não foi possível salvar os dados do usuário");
            });
        }

        $scope.getUserInfo = function() {
            $http({
                method: 'POST',
                url: 'api/authorize/user',
                data: {
                    email: $scope.userLogged.email,
                    password: $scope.userLogged.password
                }
            }).then(function success(res) {
                // Atualiza dados do usuário
                $scope.userLogged = res.data;
                // Salva os dados na localstorage
                localStorageService.set('loggedUser', $scope.loggedUser);
            }, function erro(err) {
                alert("Não foi possível retornar os dados do usuário");
            });
        };

        $scope.editAddress = function(address) {
            $scope.selectedAddress = address;
        }
    }
]);
