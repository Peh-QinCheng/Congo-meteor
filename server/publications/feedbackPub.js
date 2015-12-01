Meteor.publish('bookFeedbacks', function (isbn, sortBy, limit) {
    var table = 'Feedbacks';

    var sortParam;
    switch (sortBy) {
        case 'date':
            sortParam = 'date';
            break;
        case 'helpfulness':
            sortParam = 'avg_rating';
            break;
        default:
            sortParam = 'date';
            break;
    }

    let limitQuery;
    if (limit) {
        limitQuery = `LIMIT ${limit};`;
    } else {
        limitQuery = ';';
    }

    return liveDb.select(function (esc, escId) {
        return (
            `SELECT
              Feedbacks.login, ISBN, score, content, date, ratings.avg_rating
            FROM
              Feedbacks,
              (SELECT AVG(rating) AS avg_rating, login FROM Ratings WHERE ISBN=${esc(isbn)} GROUP BY login) as ratings
            WHERE
              Feedbacks.ISBN=${esc(isbn)} AND Feedbacks.login=ratings.login
            ORDER BY
              ${sortParam} DESC
            #   avg_rating DESC
            ${limitQuery}
            `
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
