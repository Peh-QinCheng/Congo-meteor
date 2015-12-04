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
