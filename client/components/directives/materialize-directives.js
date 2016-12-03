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
    }]);
