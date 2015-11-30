Meteor.publish('allCustomers', function () {
    return liveDb.select(
        'SELECT * FROM Customers',
        [{table: 'Customers'}]
    );
});

Meteor.publish('customerProfile', function (login) {
    var table = 'Customers';
    return liveDb.select(function (esc, escId) {
        return (
            'SELECT * from ' + escId(table) +
            'where `login`=' + esc(login)
        );
    }, [{
        table: table,
        condition: function (row, newRow) {
            return row.id === id
                    // On UPDATE queries, newRow must be checked as well
                || (newRow && newRow.id === id);
        }
    }])
});