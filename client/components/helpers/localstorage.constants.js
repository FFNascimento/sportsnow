angular.module("app.localstorage.constants", [])
    .constant("LocalStorageConstants", {
        USER: {
            KEY: 'userLoggedIn',
            PARSED: true
        },
        CART: {
            KEY: 'cart',
            PARSED: true
        },
        ID: {
            KEY: 'id',
            PARSED: true
        }
    });
