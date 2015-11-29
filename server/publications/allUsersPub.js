Meteor.publish('allCustomers', function () {
    return liveDb.select(
        'SELECT * FROM Customers',
        [{table: 'Customers'}]
    );
});