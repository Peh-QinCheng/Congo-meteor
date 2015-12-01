books = new MysqlSubscription('allBooks');

Template.home.helpers({
    currentCustomer: function () {
        return Session.get(KEY_CURRENT_CUSTOMER);
    },

    books: function () {
      return books.reactive();
    }
});
