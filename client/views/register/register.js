Template.register.events({
    'submit form': function (events) {
        events.preventDefault();
        var email = events.target.email.value;
        var password = events.target.password.value;

        if (email.trim().search(/^[a-z0-9_-]{3,16}$/i) === -1) {
            alert('Username can only contain alphanumeric characters, hyphens and underscore and be within 3 to 16 characters')
            return;
        }

        if (password.length < 5) {
            if (!confirm('Password must have 6 or more characters! Are you sure about this!?')) {
                return
            }
        }

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