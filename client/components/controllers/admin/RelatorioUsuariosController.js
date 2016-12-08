angular.module('dashboard.relatorioUsuarios', ['app.user.service'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('relatorioUsuarios', {
            url: '/relatorioUsuarios',
            parent: 'mainAdmin',
            views: {
                "funcionalidades": {
                    templateUrl: 'components/views/admin/relatorioUsuarios.html',
                    controller: 'RelatorioUsuariosController'
                }
            }
        });
}])

.controller('RelatorioUsuariosController', ['$scope','userService', '$rootScope',
    function($scope, userService, $rootScope) {
      $scope.users = null;
      $scope.title = userService.messageList().mainTitle;

      $scope.getAllUsers = function() {
        userService.getAllUsers().then(function success(res) {
          console.log(res);
          $scope.users = res.data;
        }, function error(err) {
          console.log(err);
        });
      };
    }
  ]);
