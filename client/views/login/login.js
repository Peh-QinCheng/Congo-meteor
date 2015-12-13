Template.login.events({
    'submit form, click .submit-login-form': function (events) {
        events.preventDefault();
        var email = $('#login-field-email').val();
        var password = $('#login-field-password').val();
        var user = new MysqlSubscription('loginUser', email, password);
        Tracker.autorun(function (c) {
            if (user.ready()) {
                if (user.length > 0) {
                    Session.set(KEY_CURRENT_CUSTOMER, user[0].login);
                    Router.go('/home');
                }
                else {
                    alert('No such user!');
                }
                c.stop();
            }
        });
    }
});


Template.register.events({
    'click .submit-register-form': function (events) {
        events.preventDefault();
        let email = $('#login-field-email').val();
        let password = $('#login-field-password').val();
        let passwordAgain = $('#login-field-password-again').val();
        let cardNumber = $('#cardnumber').val();
        let phoneNumber = $('#phonenumber').val();
        let address = $('#address').val();
        let fullName = $('#fullname').val();

        if (password !== passwordAgain) {
            alert('Passwords are not the same!');
            // Do reactive error message if too free
            return;
        }

        if (password.length < 5) {
            if (!confirm('Password must have 6 or more characters! Are you sure about this!?')) {
                return
            }
        }

        if (cardNumber.length === 0 || address.length === 0 || phoneNumber.length === 0){
            alert('Please fill in all required forms!');
            return;
        }

        Meteor.call('registerCustomer', [email, password, fullName, cardNumber, address, phoneNumber], function (err, res) {
            if (err) {
                console.error('OH SOMETHING REALLY BAD HAPPENED');
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
