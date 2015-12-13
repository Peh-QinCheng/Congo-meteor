Template.adminBookList.onCreated(function () {
    this.books = new MysqlSubscription('allBooks');
});

Template.adminBookList.helpers({
    currentCustomer: function () {
        return Session.get(KEY_CURRENT_CUSTOMER)
    },

    books: function () {
        Template.instance().books.depend();
        return Template.instance().books.reactive();
    }
});

Template.adminBookList.events({
    'submit form.admin-book-update-form': function (events) {
        events.preventDefault();
        var quantity = Number(events.target.quantity.value);
        var ISBN = events.target.ISBN.value;
        Meteor.call('updateQuantity', quantity, ISBN);
    },

    'submit form.new-book': function (events) {
        events.preventDefault();
        var quantity = Number(events.target.quantity.value);
        var ISBN = events.target.ISBN.value;
        var author = events.target.author.value;
        var publisher = events.target.publisher.value;
        var year = events.target.year.value;
        var price = parseFloat(events.target.price.value);
        var bkformat = events.target.bkformat.value;
        var keywords = events.target.keywords.value;
        var subject = events.target.subject.value;
        var title = events.target.bookTitle.value;
        Meteor.call('makeNewBook', quantity, ISBN, author, publisher, year, price, bkformat, keywords, subject, title, function (error, queryError) {
            if (error) {
                console.error('MAKE book error', error);
                return;
            }
            if (queryError) {
                alert(JSON.stringify(queryError));
                return;
            }
        });
    }
});
