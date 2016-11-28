// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp
'use strict';

angular.module('app.login', ['ngRoute', 'app.localstorage', 'ui.router', 'ngCpfCnpj', 'app.user.service'])

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
.controller('LoginController', ['$scope', '$http', '$timeout', 'LocalStorageService', '$state', '$rootScope', 'userService',
    function($scope, $http, $timeout, LocalStorageService, $state, $rootScope, userService) {
        $scope.userLogged = null;
        init();

        function init() {
            if (LocalStorageService.getData(LocalStorageService.storeMap.USER)) {
                $state.go('minhaConta');
            }
        }

        $scope.pwdMatch = true;
        // Objeto para criar novo usuário
        $scope.user = {
            permission: 'USER',
            firstName: null,
            lastName: null,
            cpf: null,
            rg: null,
            endereco: [],
            email: null,
            password: null,
            passwordConfirmation: null
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

            userService.createUser(usuario).then(function success(res) {
                $scope.login.email = usuario.email;
                $scope.login.password = usuario.password;
                $scope.signin();
            }, function error(err) {
                if (err.data.exists) {
                    alert('E-mail já cadastrado em nossa base de dados!');
                } else {
                    alert('Não foi possivel cadastrar usuário!');
                }
            });
        };

        $scope.signin = function() {
            userService.logInUser($scope.login).then(function success(res) {
                // Armazenar em localstorage
                LocalStorageService.setData(LocalStorageService.storeMap.USER, {
                    _id: res.data._id,
                    _rev: res.data._rev,
                    name: res.data.name,
                    email: res.data.email,
                    permission: res.data.permission,
                    password: res.data.password,
                    rg: res.data.rg,
                    cpf: res.data.cpf
                });
                console.log(LocalStorageService.getData(LocalStorageService.storeMap.USER));
                $scope.userLogged = LocalStorageService.getData(LocalStorageService.storeMap.USER)
                $state.go('home');
            }, function error(err) {
                alert('Dados de login inválidos!');
            });
        };

        $scope.compare = function() {
            $scope.pwdMatch = $scope.user.password === $scope.user.passwordConfirmation;
            console.log($scope.pwdMatch);
        };
    }
]);
