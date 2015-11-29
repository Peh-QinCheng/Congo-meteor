books = new MysqlSubscription('allBooks');

Template.home.helpers({
    currentCustomer: function () {
        return localStorage.getItem(KEY_CURRENT_CUSTOMER)
    },

    books: function () {
      return books.reactive();
    }
});
