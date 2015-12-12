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
                console.error('Error while checking out cart: ', err);
                return
            }

            if (res.length > 0) {
                alert('Something went wrong while checking out! Maybe there are insufficient copies :(')
            }

            let newCart = _.object(
                _.chain(res)
                    .filter((item)=> {
                        return !!item
                    })
                    .map((item)=> {
                        return item.ISBN
                    })
                    .value()
                , res);

            Session.set(KEY_CURRENT_CART, newCart)
        })
    },
    'click button#clearBtn': ()=> {
        Session.set(KEY_CURRENT_CART, {})
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
    }
});
