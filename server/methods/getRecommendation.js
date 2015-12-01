Meteor.methods({
    getRecommendation: function (isbn) {
        var table = 'Books';
        return liveDb.select(function (esc, escId) {
            //SELECT * FROM BOOKS WHERE ISBN IN ( SELECT ISBN FROM Orders o , Invoices i WHERE o.invoiceid = i.invoiceid)
            return (
                // Orders by other users (who have bought the same book) on other books,
                // grouped by books, ordered by diff number of users who ordered the same book
                'SELECT ISBN, COUNT(DISTINCT login) AS count' +
                'FROM Orders o JOIN Invoices i ON o.invoiceid = i.invoiceid' +
                'WHERE i.login IN (' +
                    // Other users who have bought the same book
                    'SELECT i2.login ' +
                    'FROM Orders o2 JOIN Invoices i2 ON o2.invoiceid = i2.invoiceid' +
                "WHERE o2.ISBN = $(esc(isbn)) AND i2.login != $(esc(login))" +
                ') ' +
                'AND ISBN != $(esc(isbn))' +
                'GROUP BY ISBN' +
                'ORDER BY count DESC'
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
        }])
    }
});