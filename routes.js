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
            ISBN: this.params.isbn, 
            sortBy: this.params.query ? this.params.query.sort_by : 'date',
            limit: this.params.query ? this.params.query.limit : null
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
    this.render('adminBookList');
});
