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

Meteor.publish('filteredSortedBooks', function (filterParams, sortBy) {
    return liveDb.select(function (esc, escId) {
        return booksQuery(filterParams, sortBy);
    }, [
        { table: 'books'},
        { table: 'feedbacks'}
    ]);
});

Meteor.publish('recommendedBooks', function (isbn, login) {
    return liveDb.select(function (esc, escId) {
        // Orders by other users (who have bought the same book) on other books,
        // grouped by books, ordered by diff number of users who ordered the same book
        return (`
                SELECT ISBN, COUNT(DISTINCT login) AS count
                FROM orders o JOIN invoices i ON o.invoiceid = i.invoiceid
                WHERE i.login IN (
                    SELECT i2.login FROM orders o2 JOIN invoices i2 ON o2.invoiceid = i2.invoiceid
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

function booksQuery (filterParams, sortBy, limit) {

    const orderQuery = sortBy ? `ORDER BY ${sortBy} DESC`: '';

    let filterQuery = '';
    if (filterParams) {
        filterQuery = 'WHERE';
        let first = true;
        _.each(filterParams, function(value, key) {
            if (!value) {
                return;
            }

            if (first) {
                first = false;
                filterQuery += ` ${key}='${value}'`;
                return;
            }

            filterQuery += ` AND ${key}='${value}'`;
        });
    }

    let limitQuery = '';
    if (limit) {
        limitQuery = `LIMIT ${limit}`;
    }

    return `
        SELECT
          *
        FROM
          (
            SELECT
              books.ISBN, title, author, publisher, year, price, bkformat, keywords, subject, copies, avg_score
            FROM
              books,
              (SELECT AVG(score) as avg_score, ISBN FROM feedbacks GROUP BY ISBN) as feedback_scores
            WHERE
              books.ISBN=feedback_scores.ISBN
            UNION
            SELECT
              *,
              -1 # books without feedback will have score -1
            FROM
              books
            WHERE
              ISBN NOT IN (SELECT ISBN FROM feedbacks)
          ) AS subquery
        ${filterQuery}
        ${orderQuery}
        ${limitQuery};`;
}

