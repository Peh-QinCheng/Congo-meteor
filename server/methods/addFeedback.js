Meteor.methods({
    'addFeedback': function (login, isbn, content) {
        check(login, String);
        check(isbn, String);
        check(content, String);
        var response = Async.runSync(function (done) {
            liveDb.db.query(
                'INSERT INTO Feedbacks (login, ISBN, content) VALUES ( ?, ?, ?)', 
                [login, isbn, content], function (error, results, fields) {
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