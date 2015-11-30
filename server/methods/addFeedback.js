Meteor.methods({
    'addFeedback': function (login, isbn, content, score) {
        check(login, String);
        check(isbn, String);
        check(content, String);
        check(parseInt(score), Number);
        var scoreNumber = parseInt(score);
        var response = Async.runSync(function (done) {
            liveDb.db.query(

                'INSERT INTO Feedbacks (login, ISBN, content, score) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE content=VALUES(content), score=VALUES(score)', 
                [login, isbn, content, scoreNumber], function (error, results, fields) {
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
