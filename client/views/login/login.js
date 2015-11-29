Template.register.events({
    'submit form': function (events) {
        var email = events.target.email.value;
        var password = events.target.password.value;
        Meteor.call('registerCustomer', email, password, function (err, res) {
            if (err) {
                console.log("Error during insert: ", err);
                return
            }
            localStorage.setItem(KEY_CURRENT_CUSTOMER, res)
        });
    }
});