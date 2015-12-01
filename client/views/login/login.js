Template.login.events({
    'submit form': function (events) {
        events.preventDefault();
        var login = events.target.login.value;
        var password = events.target.password.value;
        var user = new MysqlSubscription('loginUser', login, password);
        console.log(user.ready());
        console.log(user);
        user.depend();
        if (user.ready()) {
            console.log(user[0].login);
            localStorage.setItem(KEY_CURRENT_CUSTOMER, user[0].login);
        }
    }
});
