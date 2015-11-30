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
    },
    bookFeedbacks: function () {
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
        Session.set(KEY_CURRENT_CART, cart)
    },
    'submit form': function (event) {
        event.preventDefault();
        var feedbackText = event.target.feedbackValue.value;

        //  Meteor.call('submitFeed', email, password, function (err, res) {
        //     if (err) {
        //         console.log('OH DAMN SOMETHING REALLY BAD HAPPENED');
        //         return
        //     }
        //     if (res === null) {
        //         alert("Username is already taken!");
        //         return
        //     }
        //     localStorage.setItem(KEY_CURRENT_CUSTOMER, res);
        // });
    },
    'click button.feedback-score': function (event) {
        var changeScoreBy = parseInt(event.target.value);
        var newScore = this.score + changeScoreBy;
        console.log('score clicked:', this.login, this.ISBN, newScore);
    }
});
