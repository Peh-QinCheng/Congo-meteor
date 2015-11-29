Meteor.methods({
    'registerCustomer': function (email, password) {
        check(email, String);
        check(password, String);

        var response = Async.runSync(function (done) {
            liveDb.db
                .query(
                    'INSERT INTO Customers (login, password) VALUES ( ? , ?)', [email, password])
                .on('error', function (err) {
                    console.log('Error while inserting: ', err);
                    done(null,false)
                });

            setTimeout(function () {
                done(null, true)
            }, 1000);
        });

        return response.result ? email : null;
    }
});