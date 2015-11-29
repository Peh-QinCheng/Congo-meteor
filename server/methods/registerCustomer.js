Meteor.methods({
    'registerCustomer': function (email, password) {
        check(email, String);
        check(password, String);
        var response = Async.runSync(function (done) {
            liveDb.db
                .query(
                    'INSERT INTO Customers (login, password) VALUES ( ? , ?)', [email, password], function (error, results, fields) {
                        if (error) {
                            console.log('Error while inserting: ', error);
                            done(null, false);
                        }

                        done(null, true)
                    })
        });

        return response.result ? email : null;
    }
});