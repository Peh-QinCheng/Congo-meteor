Template.MainLayout.helpers({
    loggedIn: function () {
        if (typeof(Storage) === "undefined") {
            console.log('local storage not supported, not gonna care for this project');
            return false
        }
        var currentCustomer = Session.get(KEY_CURRENT_CUSTOMER);
        localStorage.setItem(KEY_CURRENT_CUSTOMER, currentCustomer);
        return !!currentCustomer;
    }
});

Template.MainLayout.onRendered(function () {
    var self = this;
    self.autorun(function () {
        var cart = Session.get(KEY_CURRENT_CART);
        // Wait for startup
        localStorage.setItem(KEY_CURRENT_CART, JSON.stringify(cart));
    })
});



