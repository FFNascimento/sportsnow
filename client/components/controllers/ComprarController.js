// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('app.comprar', ['ngRoute', 'app.localstorage', 'ui.router', 'credit-cards', 'app.user.service'])

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
.controller('ComprarController', ['$scope', '$http', 'LocalStorageService', '$rootScope', 'userService',
    function($scope, $http, LocalStorageService, $rootScope, userService) {

        // Just a housekeeping.
        // In the init method we are declaring all the
        // neccesarry settings and assignments to be run once
        // controller is invoked
        $scope.userLogged = null;
        $scope.selectedAddress = null;
        $scope.creatingAddress = null;
        $scope.pwdMatch = true;
        $scope.pedido = null;
        $scope.produtos = null;
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
        $scope.passoBase = {
            endereco: 'endereco',
            pagamento: 'pagamento',
            resumo: 'resumo',
            concluido: 'concluido'
        };
        $scope.passo = null;
        $scope.dadosCartao = {
            numero: null,
            mes: null,
            ano: null,
            proprietario: null,
            codigoSeguranca: null
        };

        function init() {
            $scope.userLogged = LocalStorageService.getData(LocalStorageService.storeMap.USER);
            $scope.produtos = LocalStorageService.getData(LocalStorageService.storeMap.CART).itens;
            console.log($scope.produtos);
            $scope.passo = $scope.passoBase.endereco;
        }

        $scope.address = {
            cep: null,
            logradouro: null,
            numero: null,
            bairro: null,
            cidade: null,
            uf: null
        };

        // Objeto para login, está separado do de usuário para evitar problemas com o Two way databind
        $scope.login = {
            email: '',
            password: ''
        };

        $scope.compare = function() {
            $scope.pwdMatch = $scope.user.password === $scope.user.passwordConfirmation;
            console.log($scope.pwdMatch);
        };

        $scope.signup = function() {
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
                $rootScope.$broadcast("update-login");
                $scope.userLogged = LocalStorageService.getData(LocalStorageService.storeMap.USER);
                $scope.passo = $scope.passoBase.endereco;
            }, function error(err) {
                alert('Dados de login inválidos!');
            });
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
            };

            userService.createUser(usuario).then(function success(res) {
                $scope.login.email = usuario.email;
                $scope.login.password = usuario.password;
                $scope.signup();
            }, function error(err) {
                if (err.data.exists) {
                    alert('Usuário já existe');
                } else {
                    alert('Usuário não cadastrado!');
                }
                console.log(err);
            });
        };

        $scope.buscarCEP = function() {
            $http({
                method: 'GET',
                url: 'https://viacep.com.br/ws/' + $scope.address.cep + '/json/'
            }).then(function success(res) {
                $scope.address.logradouro = res.data.logradouro;
                $scope.address.bairro = res.data.bairro;
                $scope.address.cidade = res.data.localidade;
                $scope.address.uf = res.data.uf;
            });
        };

        $scope.addAddress = function() {
            console.log($scope.userLogged);
            $scope.address.criado = Date.now();
            console.log($scope.userLogged.endereco);
            if ($scope.userLogged && !$scope.userLogged.endereco) {
                $scope.userLogged.endereco = [];
                console.log('Entrou no IFÃO papai ');
            }
            $scope.userLogged.endereco.push($scope.address);
            $scope.update();
            $scope.selectedAddress = null;
        }

        $scope.selectAddress = function(end, index) {
            $scope.selectedAddress = end;
            $scope.selectedAddress.index = index;
            $scope.passo = $scope.passoBase.pagamento;
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
        };

        $scope.selecionarPagamento = function() {
            $scope.passo = $scope.passoBase.resumo;
        };

        $scope.getTotalCompra = function() {
            var total = 0;
            $scope.produtos.forEach(function(prod) {
                total += prod.price * prod.quantity;
            });
            return total;
        };

        init();
    }
]);
