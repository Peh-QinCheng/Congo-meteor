Template.register.events({
    'submit form': function (events) {
        events.preventDefault();
        var email = events.target.email.value;
        var password = events.target.password.value;
        Meteor.call('registerCustomer', email, password, function (err, res) {
            if (err) {
                console.log('OH DAMN SOMETHING REALLY BAD HAPPENED');
                return
            }
            if (res === null) {
                alert("Username is already taken!");
                return
            }
            Session.set(KEY_CURRENT_CUSTOMER, res);
            Router.go('/home')
        });
    }
});