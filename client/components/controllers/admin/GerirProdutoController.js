angular.module('dashboard.gerirProdutos', [
    'dashboard.productService'
])

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

<<
<< << < HEAD
    .controller('gerirProdutosController', ['$scope', 'productService', '$rootScope',
        function($scope, productService, $rootScope) {
            $scope.products = null;
            $scope.productBase = {
                name: "",
                description: "",
                photo: [],
                quantity: "",
                price: "",
                type: "product",
                productType: "",
            };
            $scope.currentProduct = null;
            $scope.title = productService.messageList().mainTitle;
            $scope.productTypes = [{
                id: 1,
                name: 'FEMININO'
            }, {
                id: 2,
                name: 'MASCULINO'
            }, {
                id: 3,
                name: 'INFANTIL'
            }, {
                id: 4,
                name: 'ESPORTE'
            }];

            $scope.getAllProducts = function() {
                productService.getAllProducts().then(function success(res) {
                    console.log(res);
                    $scope.products = res.data;
                }, function error(err) {
                    console.log(err);
                });
            };

            $scope.creatingProduct = function() {
                $scope.currentProduct = $scope.productBase;
                $scope.title = productService.messageList().creatingTitle;
            };

            $scope.editingProduct = function() {
                $scope.currentProduct = $scope.products.filter(function(product) {
                    return product.selected;
                }).shift();
                $scope.title = productService.messageList().editingTitle;
            };

            $scope.cancelSelection = function() {
                $scope.title = productService.messageList().mainTitle;
                $scope.currentProduct = null;
            };

            $scope.saveProduct = function() {
                productService.createProduct($scope.currentProduct).then(function success(res) {
                    console.log(res);
                    $rootScope.$broadcast('infoModal', {
                        title: productService.messageList().successMsgTitle,
                        message: productService.messageList().successMsg
                    });
                    $scope.currentProduct = null;
                    $scope.getAllProducts();
                }, function error(err) {
                    console.log(err);
                    $rootScope.$broadcast('infoModal', {
                        title: productService.messageList().errorMsgTitle,
                        message: productService.messageList().errorMsg
                    });
                });
            };

            $scope.updateProduct = function() {
                productService.updateProduct($scope.currentProduct).then(function success(res) {
                    console.log(res);
                    $rootScope.$broadcast('infoModal', {
                        title: productService.messageList().editingTitle,
                        message: productService.messageList().editingMsg
                    });
                    $scope.currentProduct = null;
                    $scope.getAllProducts();
                }, function error(err) {
                    console.log(err);
                    $rootScope.$broadcast('infoModal', {
                        title: productService.messageList().errorMsgTitle,
                        message: productService.messageList().errorMsg
                    });
                });
            };

            $scope.deleteProduct = function() {
                var product = $scope.products.filter(function(product) {
                    return product.selected;
                }).shift();
                productService.removeProduct(product._id).then(function success(res) {
                    console.log(res);
                    $rootScope.$broadcast('infoModal', {
                        title: productService.messageList().deletingMsgTitle,
                        message: productService.messageList().deletingMsg
                    });
                    $scope.getAllProducts();
                }, function error(err) {
                    console.log(err);
                    $rootScope.$broadcast('infoModal', {
                        title: productService.messageList().errorMsgTitle,
                        message: productService.messageList().deletingMsg
                    });
                });
            };

            $scope.updateSelection = function(position, products) {
                angular.forEach(products, function(product, index) {
                    if (position != index)
                        product.selected = false;
                });
            };
        }
    ]);
