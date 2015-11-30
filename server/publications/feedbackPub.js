Meteor.publish('bookFeedbacks', function (isbn) {
    var table = 'Feedbacks';
    return liveDb.select(function (esc, escId) {
        return (
            'SELECT * from ' + escId(table) +
            'where `ISBN`=' + esc(isbn)
        );
    }, [{
        table: table,
        condition: function (row, newRow) {
            // Only refresh the results when the row matching the specified id is
            // changed.
            return row.id === id
                    // On UPDATE queries, newRow must be checked as well
                || (newRow && newRow.id === id);
        }
    }]);
});
