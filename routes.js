Router.configure({
    layoutTemplate: 'MainLayout'
});

Router.route('/home', function () {
    this.render('home');
});

Router.route('/cart', function () {
    this.render('cart');
});

Router.route('/book/:isbn', {
    data: function () {
        return {
            ISBN: this.getParams().isbn
        };
    },
    action: function () {
        this.render('bookDetails');
    }
});

Router.route('/profile/:login', {
    data: function () {
        return {login: this.params.login}
    },
    action: function () {
        this.render('profile')
    }
});

Router.route('/admin', function () {
    if (Session.get(KEY_CURRENT_CUSTOMER) == 'admin') {
        this.render('adminBookList');
    } else {
        this.render('home');
    }
});

Router.route('/statistics', function () {
    if (Session.get(KEY_CURRENT_CUSTOMER) == 'admin') {
        this.render('statistics');
    } else {
        this.render('home');
    }
});
