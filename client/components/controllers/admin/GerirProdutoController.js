angular.module('dashboard.gerirProdutos', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('produtos', {
            url: '/produtos',
            parent: 'mainAdmin',
            views: {
                "funcionalidades": {
                    templateUrl: 'components/views/admin/produtos.html',
                    controller: 'gerirProdutosController'
                }
            }
        });
}])

.controller('gerirProdutosController', ['$scope', function($scope) {

}]);
