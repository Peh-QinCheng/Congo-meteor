Template.bookDetails.onCreated(function () {
    var pageState = Template.currentData();
    this.books = new MysqlSubscription('bookByISBN', pageState.ISBN);
    this.currentBookFeedback = new MysqlSubscription('bookFeedbacks', pageState.ISBN, pageState.sortBy, pageState.limit);
});

Template.bookDetails.onDestroyed(function () {
    this.books.stop();
    this.currentBookFeedback.stop();
});

Template.bookDetails.helpers({
    title: function () {
        // you know what fk ironrouter
        var books = Template.instance().books;
        books.depend();
        if (books.ready()) {
            return books.length === 0 ? 'No book found!' : books[0].title;
        }
    },
    allFeedback: function () {
        Template.instance().currentBookFeedback.depend();
        return Template.instance().currentBookFeedback.reactive();
    }
});

Template.bookDetails.events({
    'click button.cart': function (e) {
        var cart = Session.get(KEY_CURRENT_CART);
        var book = Template.instance().books[0];
        var item = cart[book.ISBN];
        if (item) {
            item.copies += 1;
        } else {
            cart[book.ISBN] = {
                ISBN: book.ISBN,
                title: book.title,
                price: book.price,
                copies: 1
            }
        }
        Session.set(KEY_CURRENT_CART, cart);
    },
    'submit form.feedback-input-form': function (event) {
        event.preventDefault();
        var content = event.target.feedbackValue.value;
        var score = event.target.bookScore.value;
        var login = Session.get(KEY_CURRENT_CUSTOMER);
        Meteor.call('addFeedback', login, this.ISBN, content, score, function (error, queryError) {
            if (error) {
                console.error('feeback', error);
                return;
            }
            if (queryError) {
                if (queryError.code === 'ER_DUP_ENTRY') {
                    alert('Cannot add feedback, you can only enter your feedback once.');
                    return;
                }

                console.error(queryError);
                return;
            }
        });
    },
    'submit form.sort-feedback-form': function (event) {
        event.preventDefault();
        var queryLimit = event.target.queryLimit.value;

        let limitParameter = '';
        if (queryLimit) {
            limitParameter = `&limit=${queryLimit}`;
        } else {
            limitParameter = '';
        }

        // lousy way to remove params from url because successive calls for the button will only add params to the url
        var urlWithoutParams = stripUrlParams(Router.current().url);
        var url = `${urlWithoutParams}?sort_by=helpfulness${limitParameter}`;
        Router.go(url);
        location.reload();
    }
});

function stripUrlParams(url) {
    return url.replace(/\?.*/, '');
}
