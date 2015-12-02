Router.configure({
    layoutTemplate: 'MainLayout'
});

Router.route('/', function () {
    this.render('register');
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
            ISBN: this.params.isbn
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
    if (localStorage.getItem(KEY_CURRENT_CUSTOMER) == 'admin') {
        this.render('adminBookList');
    }
    else {
        this.render('home');
    }
});

Router.route('/login', function () {
    this.render('login');
});
