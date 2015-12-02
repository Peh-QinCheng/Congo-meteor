Template.home.onCreated(function () {
  this.filteredSortedBooks = new MysqlSubscription('filteredSortedBooks', null, null);
  Session.set('LOL', true);
});

Template.home.helpers({
    currentCustomer: function () {
        return Session.get(KEY_CURRENT_CUSTOMER);
    },

    books: function () {
      var makeMeReactive = Session.get('LOL');
      var filteredSortedBooks = Template.instance().filteredSortedBooks.reactive();
      return filteredSortedBooks;
    }
});

Template.home.events ({
  'submit form': function (events) {
    events.preventDefault();
    var query_params = {
      author: events.target.author.value,
      publisher: events.target.publisher.value,
      subject: events.target.subject.value,
      title: events.target.bookTitle.value
    };
    var sort = events.target.sort.value;
    var filteredSortedBooks = Template.instance().filteredSortedBooks;
    filteredSortedBooks.stop();

    Template.instance().filteredSortedBooks = new MysqlSubscription('filteredSortedBooks', query_params, sort);
    Session.set('LOL', !Session.get('LOL'));
  }

});

