Template.bookDetails.onCreated(function () {
    this.books = new MysqlSubscription('bookByISBN', Template.currentData().ISBN);
});

Template.bookDetails.helpers({
    title: function () {
        // todo use iron router to provide data context
        var books = Template.instance().books;

        books.depend();
        if (books.ready()) {
            return books.length === 0 ? 'No book found!' : books[0].title;
        }
    }
});
