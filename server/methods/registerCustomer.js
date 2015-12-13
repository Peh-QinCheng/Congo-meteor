Meteor.methods({
    'registerCustomer': function (credentials) {
        console.log(credentials)
        let response = Async.runSync(function (done) {
            liveDb.db.query(
                'INSERT INTO customers (login, password, name, credit_num, address, phone_num) VALUES (? , ?, ?, ?, ?, ?)',
                credentials, function (error, results, fields) {
                    if (error) {
                        console.error('Error while inserting: ', error);
                        done(null, false);
                    }

                    done(null, true)
                })
        });

        return response.result ? credentials[0]: null;
    }
});
