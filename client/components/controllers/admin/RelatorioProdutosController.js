angular.module('dashboard.relatorioProdutos', ['dashboard.productService'])

// Routing configuration for this module
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('relatorioProdutos', {
            url: '/relatorioProdutos',
            parent: 'mainAdmin',
            views: {
                "funcionalidades": {
                    templateUrl: 'components/views/admin/relatorioProdutos.html',
                    controller: 'RelatorioProdutosController'
                }
            }

        });
}])

.controller('RelatorioProdutosController', ['$scope', 'productService', '$rootScope', '$http',
    function($scope, productService, $rootScope, $http) {
        $scope.title = productService.messageList().reportProductTittle;
        $scope.dateFrom = null;
        $scope.dateTo = null;
        $scope.produtosVendidos = [];

        $scope.init = function() {
            //Objeto datapicker criado
            $('.datepicker').pickadate({
                format: 'yyyy-mm-dd',
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });
        }

        //Objetos para evitar manipulação dos dados na tela
        $scope.dataFrom = null;
        $scope.dataTo = null;

        $scope.init();

        $scope.searchProducts = function() {
            //Convertendo dado de data
            $scope.dataFrom = $scope.dateFrom;
            $scope.dataTo = $scope.dateTo;

            //Transformando datas em timestamp
            // var inputFrom = $scope.dataFrom[1] + "," + $scope.dataFrom[2] + "," + $scope.dataFrom[0];
            // inputFrom = new Date(inputFrom).getTime();
            //
            // var inputTo = $scope.dataTo[1] + "," + $scope.dataTo[2] + "," + $scope.dataTo[0];
            // inputTo = new Date(inputTo).getTime();

            $scope.dataFrom = new Date($scope.dataFrom.substring(0, 10).split("-").reverse().join("-")).getTime() / 1000;

            $scope.dataTo = new Date($scope.dataTo.substring(0, 10).split("-").reverse().join("-")).getTime() / 1000;

            console.log($scope.dataFrom);
            console.log($scope.dataTo);



            //Chamada da API de relatório de produtos por período
            $http({
                method: 'GET',
                url: 'api/get/report/products/' + $scope.dataFrom + '/' + $scope.dataTo,
            }).then(function(res) {
              //Retornando resultados da chamada em um array
                $scope.produtosVendidos = res.data;
                console.log($scope.produtosVendidos);
            });

        }
    }
]);
