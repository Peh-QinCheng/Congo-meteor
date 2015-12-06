Template.navBar.helpers({
    isAdmin: function () {
        return Session.get(KEY_CURRENT_CUSTOMER) === 'admin';
    },
    currentCustomer: function () {
        return Session.get(KEY_CURRENT_CUSTOMER);
    }
});
