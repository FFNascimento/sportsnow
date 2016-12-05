angular.module('dashboard.adminUsuarios', ['app.user.service'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('administradores', {
            url: '/administradores',
            parent: 'mainAdmin',
            views: {
                "funcionalidades": {
                    templateUrl: 'components/views/admin/usuarios.html',
                    controller: 'administrarUsuariosController'
                }
            }
        });
}])

.controller('administrarUsuariosController', ['$scope', 'userService', function($scope, userService) {

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
            permission: 'ADMIN',
            name: $scope.user.firstName + " " + $scope.user.lastName,
            cpf: $scope.user.cpf,
            rg: $scope.user.rg,
            email: $scope.user.email,
            password: $scope.user.password
        }

        userService.createUser(usuario).then(function success(res) {
            alert("Administrador cadastrado com sucesso.");
        }, function error(err) {
            if (err.data.exists) {
                alert('E-mail já cadastrado em nossa base de dados!');
            } else {
                alert('Não foi possivel cadastrar usuário!');
            }
        });
    };

    $scope.compare = function() {
        $scope.pwdMatch = $scope.user.password === $scope.user.passwordConfirmation;
        console.log($scope.pwdMatch);
    };

}]);
