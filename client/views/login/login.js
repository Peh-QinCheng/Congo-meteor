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
    },
    'click .submit-register-form': function (events) {
        events.preventDefault();
        var email = $('#login-field-email').val();
        var password = $('#login-field-password').val();

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
