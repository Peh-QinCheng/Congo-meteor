Meteor.methods({
    'addFeedback': function (login, isbn, content, score) {
        check(login, String);
        check(isbn, String);
        check(content, String);
        var scoreNumber = parseInt(score);
        check(scoreNumber, Number);
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
    },
    'addFeedbackRating': function (login, isbn, raterLogin, raterRating) {
        check(login, String);
        check(isbn, String);
        check(raterLogin, String);
        var scoreNumber = parseInt(raterRating);
        check(scoreNumber, Number);
        var response = Async.runSync(function (done) {
            liveDb.db.query(
                'INSERT INTO Ratings (login, ISBN, rater_login, rating) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE rating=VALUES(rating)', 
                [login, isbn, raterLogin, scoreNumber], function (error, results, fields) {
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
