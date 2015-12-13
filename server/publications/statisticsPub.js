Meteor.publish('mostPopularAuthors', function (limit) {
    let limitQuery = '';
    if (limit) {
        limitQuery = `LIMIT ${limit}`;
    }
    return liveDb.select(`
        SELECT
          author, SUM(copies) as copies_sold
        FROM
          books
        GROUP BY
          author
        ORDER BY
          copies_sold DESC
        ${limitQuery};`,
        [{table: 'books'}]
    );
});

Meteor.publish('mostPopularPublishers', function (limit) {
    let limitQuery = '';
    if (limit) {
        limitQuery = `LIMIT ${limit}`;
    }
    return liveDb.select(`
        SELECT
          publisher, COUNT(publisher) as copies_sold
        FROM
          books
        GROUP BY
          publisher
        ORDER BY
          copies_sold DESC
        ${limitQuery};`,
        [{table: 'books'}]
    );
});

Meteor.publish('mostPopularBooks', function (filterParams, sortBy) {
    return liveDb.select(function (esc, escId) {
        return (`
            SELECT
              books.ISBN, books.title, SUM(orders.copies) AS copies
            FROM orders, books
            WHERE invoiceid IN (
              SELECT invoiceid
              FROM invoices
              WHERE EXTRACT(YEAR_MONTH FROM order_date) = EXTRACT(YEAR_MONTH FROM NOW())
            )
            AND books.ISBN = orders.ISBN
            GROUP BY books.ISBN
            ORDER BY popz DESC
            LIMIT 10;
    `)
    }, [
        {table: 'orders'},
        {table: 'books'}
    ]);
});
