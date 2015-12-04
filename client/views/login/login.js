Template.login.events({
    'submit form': function (events) {
        events.preventDefault();
        var login = events.target.login.value;
        var password = events.target.password.value;
        var user = new MysqlSubscription('loginUser', login, password);
        Tracker.autorun(function (c) {
            if (user.ready()) {
                if(user.length > 0) {
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
