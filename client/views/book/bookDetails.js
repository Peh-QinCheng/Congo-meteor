Template.bookDetails.onCreated(function () {
    let tpl = this;
    tpl.autorun(()=> {
        let pageState = Template.currentData();
        tpl.books = new MysqlSubscription('bookByISBN', pageState.ISBN);
        tpl.currentBookFeedback = new MysqlSubscription('bookFeedbacks', pageState.ISBN, pageState.sortBy, pageState.limit);
    });
});

Template.bookDetails.onDestroyed(function () {
    this.books.stop();
    this.currentBookFeedback.stop();
});

Template.bookDetails.helpers({
    bookData: () =>{
        var books = Template.instance().books;
        books.depend();
        if (books.ready()) {
            //console.log(books)
            return books[0];
        }
    },
    allFeedback: function () {
        Session.get(KEY_MAKE_FEEDBACKS_REACTIVE);
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
                author: book.author,
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
        let pageState = Template.instance();
        pageState.currentBookFeedback.stop();
        let queryLimit = event.target.queryLimit.value;
        let sortBy = 'helpfulness';
        pageState.currentBookFeedback = new MysqlSubscription('bookFeedbacks', Template.currentData().ISBN, sortBy, queryLimit);
        Session.set(KEY_MAKE_FEEDBACKS_REACTIVE, !Session.get(KEY_MAKE_FEEDBACKS_REACTIVE));
    }
});
