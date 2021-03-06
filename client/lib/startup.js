Meteor.startup(function () {
    var cart = localStorage.getItem(KEY_CURRENT_CART);
    cart = cart ? JSON.parse(cart) : {}; // initialize as empty array if null
    Session.set(KEY_CURRENT_CART, cart);

    var customer = localStorage.getItem(KEY_CURRENT_CUSTOMER);
    if (customer) {
        Session.set(KEY_CURRENT_CUSTOMER, customer);
    }
});
