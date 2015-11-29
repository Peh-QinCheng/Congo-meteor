Template.bookDetails.onCreated(function () {
    this.books = new MysqlSubscription('bookByISBN', Template.currentData().ISBN);
});

Template.bookDetails.helpers({
    title: function () {
        // you know what fk ironrouter
        var books = Template.instance().books;
        books.depend();
        if (books.ready()) {
            return books.length === 0 ? 'No book found!' : books[0].title;
        }
    }
});

Template.bookDetails.events({
   'click button.cart': function (e) {
       var cart = Session.get(KEY_CURRENT_CART);
       var book = Template.instance().books[0];
       cart.push(book);
       Session.set(KEY_CURRENT_CART, cart)
   }
});
