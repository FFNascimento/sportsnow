angular.module('dashboard.materialize', [])
    .directive('buttonCollapse', ['$timeout', function($timeout) {
        return {
            restrict: 'EAC',
            scope: {
                options: '='
            },
            link: function(scope, elem, attrs) {
                if (scope.options) {
                    elem.sideNav(scope.options);
                } else {
                    elem.sideNav();
                }
            }
        };
    }])

.directive('materialSelect', function() {
    return {
        restrict: 'EAC',
        require: 'ngModel',
        scope: {
            model: '=ngModel'
        },
        link: function(scope, elem, attrs) {
            elem.material_select();
            scope.$watch('model', function(nVal, oVal) {
                elem.material_select();
            });
        }
    };
})

.directive('materialModal', ['$timeout', function($timeout) {
    return {
        restrict: 'EAC',
        link: function(scope, elem, attrs) {
            // Inicia modal para todas as caixas
            elem.modal();
            // Modal de informações
            scope.$on('infoModal', function(evt, config) {
                scope.title = config.title;
                scope.message = config.message;

                $timeout(function() {
                    $('#infoModal').modal('open');
                });
            });
            // Modal de decisão
            scope.$on('decisionModal', function(evt, config) {
                scope.title = config.title;
                scope.message = config.message;

                scope.ok = function() {
                    $rootScope.$broadcast(config.okFunction);
                };

                scope.cancel = function() {
                    $rootScope.$broadcast(config.cancelFunction);
                }

                $timeout(function() {
                    $('decisionModal').modal('open');
                });
            })
        }
    };
}]);
