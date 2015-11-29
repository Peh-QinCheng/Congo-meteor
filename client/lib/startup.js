Meteor.startup(function () {
    var cart = localStorage.getItem(KEY_CURRENT_CART);
    cart = cart ? JSON.parse(cart) : []; // initialize as empty array if null
    console.log(cart)
    Session.set(KEY_CURRENT_CART, cart)
});