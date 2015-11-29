books = new MysqlSubscription('allBooks');

Template.bookDetails.helpers({
    title: function () {
      books.depend();
      var book = books.filter(function(book) {
        return book.ISBN === Template.currentData().ISBN;
      });
      return book[0].title;
    }
});