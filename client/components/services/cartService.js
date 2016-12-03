angular.module('app.cart.service', []).factory('cartService', function() {
    var cart = {
        cart: null
    };

    function set(field, value) {
        cart[field] = value;
        console.log(cart);
    }

    return {
        set: set,
        value: cart
    };
});
