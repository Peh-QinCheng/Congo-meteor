Meteor.startup(function () {
    var cart = localStorage.getItem(KEY_CURRENT_CART);
    cart = cart ? JSON.parse(cart) : {}; // initialize as empty array if null
    Session.set(KEY_CURRENT_CART, cart)
});