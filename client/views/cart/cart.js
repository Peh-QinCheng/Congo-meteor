Template.cart.helpers({
    'cartItems': function () {
        return Session.get(KEY_CURRENT_CART);
    }
});
