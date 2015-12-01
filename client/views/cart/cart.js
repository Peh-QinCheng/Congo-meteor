Template.cart.helpers({
    cartItems: function () {
        return _.values(Session.get(KEY_CURRENT_CART));
    }
});

Template.cart.events({
    'click button.checkoutBtn': function () {
        var customer = Session.get(KEY_CURRENT_CUSTOMER);
        if (!customer) {
            alert('Please login!');
            return;
        }

        var items = Session.get(KEY_CURRENT_CART);
        Meteor.call('checkout', customer, items, function (err, res) {
            if (err) {
                console.log('Error while checking out cart: ', err);
                return
            }
            Session.set(KEY_CURRENT_CART, {})
        })
    }
});

Template.cartItem.events({
    'click button[intent="copies"]': function (e) {
        var ISBN = e.currentTarget.attributes['data'].value;
        var delta = parseInt(e.currentTarget.attributes['delta'].value);
        var cart = Session.get(KEY_CURRENT_CART);

        var item = cart[ISBN];
        if (item.copies + delta >= 0) {
            item.copies += delta;
            Session.set(KEY_CURRENT_CART, cart)
        }
        Meteor.call('getRecommendation', function (err, res) {
            if (err) {
                console.log('Error while getting recommendation: ', err);
                return
            }
            console.log('Recommend: ', res)
        })
    }
});