angular.module('app.admin.service', []).factory('reportService', ['$http', function($http) {
    var report = {
        users: function() {
            return $http({
                method: 'GET',
                url: 'api/get/report/users'
            });
        },
        products: function() {
            return $http({
                method: 'GET',
                url: 'api/get/report/products'
            });
        }
    };

    return report;
}]);
