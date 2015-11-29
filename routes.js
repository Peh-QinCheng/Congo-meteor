Router.configure({
    layoutTemplate: 'MainLayout'
});

Router.route('/', function () {
  this.render('register');
});

Router.route('/home', function () {
  this.render('home');
});


Router.route('/book/:relUrl', {
  data: function () {
    var ISBN = this.params.relUrl;
    return {ISBN: ISBN};
  },
  action: function () {
    this.render('bookDetails');
  }
});