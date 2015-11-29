Template.cart.helpers({
    cartItems: function () {
        return _.values(Session.get(KEY_CURRENT_CART));
    }
});

Template.cartItem.events({
    'click button[intent="copies"]': function (e) {
        var ISBN = e.currentTarget.attributes['data'].value;
        var delta = parseInt(e.currentTarget.attributes['delta'].value);
        var cart = Session.get(KEY_CURRENT_CART);

        var item = cart[ISBN];
        item.copies += delta;
        if (item.copies >= 0) {
            Session.set(KEY_CURRENT_CART, cart)
        }
    }
});