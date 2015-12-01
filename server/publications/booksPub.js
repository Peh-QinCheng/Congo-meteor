Meteor.publish('allBooks', function () {
    return liveDb.select(
        'SELECT * FROM books',
        [{table: 'books'}]
    );
});

Meteor.publish('bookByISBN', function (isbn) {
    var table = 'books';
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
    }])
});

Meteor.publish('recommendedBooks', function (isbn, login) {
    console.log(`ISBN: ${isbn}, LOGIN: ${login}`)
    return liveDb.select(function (esc, escId) {
        // Orders by other users (who have bought the same book) on other books,
        // grouped by books, ordered by diff number of users who ordered the same book
        return (`
                SELECT ISBN, COUNT(DISTINCT login) AS count
                FROM Orders o JOIN invoices i ON o.invoiceid = i.invoiceid
                WHERE i.login IN (
                    SELECT i2.login FROM Orders o2 JOIN invoices i2 ON o2.invoiceid = i2.invoiceid
                    WHERE o2.ISBN = ${esc(isbn)} AND i2.login != ${esc(login)}
                    )
                AND ISBN != ${esc(isbn)}
                GROUP BY ISBN ORDER BY count DESC
                `)
    }, [{
        table: 'books',
        condition: function (row, newRow) {
            // Only refresh the results when the row matching the specified id is
            // changed.
            return row.id === id
                    // On UPDATE queries, newRow must be checked as well
                || (newRow && newRow.id === id);
        }
    }])
});