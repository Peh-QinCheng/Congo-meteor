Template.home.onCreated(function () {
    this.filteredSortedBooks = new MysqlSubscription('filteredSortedBooks', null, null);
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Template.bookCard.helpers({

    bookCover: function (isbn) {
        var imgUrl = `images/${isbn}.jpg`;
        return imgUrl;
    }
});

Template.home.helpers({
    books: function () {
        Session.get(KEY_MAKE_BOOKS_REACTIVE);
        let booksList = Template.instance().filteredSortedBooks.reactive();
        return booksList.map(book => {
            if (book.avg_score === -1) {
                book.avg_score = '-';
            }
            return book;
        });
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

