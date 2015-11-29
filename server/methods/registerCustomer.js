Meteor.methods({
    'registerCustomer': function (email, password) {
        check(email, String);
        check(password, String);
        liveDb.db.query(
            'INSERT INTO Customers (login, password) VALUES ( ? , ?)', [email, password]);
        return email;

    }
});