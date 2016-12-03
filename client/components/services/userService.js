angular.module('app.user.service', []).factory('userService', ['$http', function($http) {
    var user = {
        createUser: function(user) {
            return $http({
                method: 'PUT',
                url: 'api/add/user',
                data: JSON.stringify(user)
            });
        },
        updateUser: function(user) {
            return $http({
                method: 'POST',
                url: 'api/update/user',
                data: user
            });
        },
        getUserInfo: function(user) {
            return $http({
                method: 'POST',
                url: 'api/authorize/user',
                data: user
            });
        },
        logInUser: function(user) {
            return $http({
                method: 'POST',
                url: 'api/authorize/user',
                data: JSON.stringify(user)
            });
        },
        logOutUser: function(user) {

        }
    };

    return user;
}]);
