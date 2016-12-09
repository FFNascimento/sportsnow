angular.module('dashboard.gerirProdutos', [
    'dashboard.productService',
    'ngFileUpload'
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

.controller('gerirProdutosController', ['$scope', 'productService', '$rootScope', 'Upload', '$http',
    function($scope, productService, $rootScope, Upload, $http) {
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
        $scope.files = [];
        $scope.errFiles = [];

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
            $scope.fileUpload().then(function success(res) {
                if (res) {
                    console.log(res);
                    return true;
                }
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
            }, function error(err) {
                console.log(err);
            });
        };

        $scope.updateProduct = function() {
            delete $scope.currentProduct.selected;
            productService.updateProduct($scope.currentProduct).then(function success(res) {
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

        $scope.setFiles = function(files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;
        };

        $scope.fileUpload = function() {
            if ($scope.files && $scope.files.length) {
                return Upload.upload({
                    url: '/file/upload',
                    arrayKey: '',// Thnkx to https://goo.gl/QVDL0D
                    data: {
                        files: $scope.files
                    }
                });
            }
        };


        $scope.setMain = function (file) {
          files.forEach(function (f) {
            delete file.principal;
          });

          file.principal = true;
        }


        $scope.removeImg= function (index) {
          
        }
    }
]);
