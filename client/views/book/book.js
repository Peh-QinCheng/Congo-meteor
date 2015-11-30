Template.bookDetails.onCreated(function () {
    this.books = new MysqlSubscription('bookByISBN', Template.currentData().ISBN);
    this.currentBookFeedback = new MysqlSubscription('bookFeedbacks', Template.currentData().ISBN);
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

function generateTestBooks() {
    var no = 5;
    var result = [];
    for (var i = 0; i < no; i++) {
        result.push({
            login: 'user1',
            ISBN: '0319',
            score: 5,
            content: 'Feedback here',
            date: new Date()
        });
    };
    return result;
}

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
        Session.set(KEY_CURRENT_CART, cart)
    },
    'submit form': function (event) {
        event.preventDefault();
        var content = event.target.feedbackValue.value;
        var score = event.target.bookScore.value;
        var login = localStorage.getItem(KEY_CURRENT_CUSTOMER);
        Meteor.call('addFeedback', login, this.ISBN, content, score, function (error, queryError) {
            if (error) {
                console.error(error);
                return;
            }
            if (queryError) {
                console.error(queryError);
                return;
            }
        });
    },
    'click button.feedback-score': function (event) {
        var changeScoreBy = parseInt(event.target.value);
        var newScore = this.score + changeScoreBy;
        console.log('score clicked:', this.login, this.ISBN, newScore);
    }
});
