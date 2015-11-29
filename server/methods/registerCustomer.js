Meteor.methods({
    'registerCustomer': function (email, password) {
        try {
            check(email, String);
            check(password, String);
            liveDb.db.query(
                'INSERT INTO Customers (login, password) VALUES ( ? , ?)', [email, password]);
            return email;
        } catch (err) {
            console.log('Error while inserting new customer: ', err)
        }
    }
});