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
        var ISBN = this.params.isbn;
        return {ISBN: ISBN};
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