Template.home.helpers({
    currentCustomer: function () {
        return localStorage.getItem(KEY_CURRENT_CUSTOMER)
    }
});