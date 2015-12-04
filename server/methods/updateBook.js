Meteor.methods({
    'updateQuantity': function (quantity, ISBN) {
        check(quantity, Number);
        check(ISBN, String);
        liveDb.db.query('UPDATE books SET copies = ? WHERE ISBN = ?', [quantity, ISBN]);
    },

    'makeNewBook': function (quantity, ISBN, author, publisher, year, price, bkformat, keywords, subject, title) {
        var response = Async.runSync(function (done) {
            liveDb.db.query(
                'INSERT INTO books (copies, ISBN, author, publisher, year, price, bkformat, keywords, subject, title) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [quantity, ISBN, author, publisher, year, price, bkformat, keywords, subject, title],
                function (error, results, fields) {
                    if (error) {
                        done(error);
                        return;
                    }

                    done();
                });
        });

        return response.error;
    }
});
