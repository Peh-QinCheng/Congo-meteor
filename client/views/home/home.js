Template.home.onCreated(function () {
    this.filteredSortedBooks = new MysqlSubscription('filteredSortedBooks', null, null);
});

Template.home.helpers({
    books: function () {
        Session.get(KEY_MAKE_BOOKS_REACTIVE);
        return Template.instance().filteredSortedBooks.reactive();
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
        Session.set(KEY_MAKE_BOOKS_REACTIVE, !Session.get(KEY_MAKE_BOOKS_REACTIVE));
    }

});

