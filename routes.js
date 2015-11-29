Router.configure({
    layoutTemplate: 'MainLayout'
});

Router.route('/', function () {
  this.render('register');
});

Router.route('/home', function () {
  this.render('home');
});


Router.route('/book/:isbn', {
  //subscription: function () {
  //  return new MysqlSubscription('bookByISBN', this.params.isbn)
  //},
  data: function () {
    var ISBN = this.params.isbn;
    return {ISBN: ISBN};
  },
  action: function () {
    this.render('bookDetails');
  }
});