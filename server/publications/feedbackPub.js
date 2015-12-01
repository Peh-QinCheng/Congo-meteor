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

    return liveDb.select(function (esc, escId) {
        return feedbackQuery(isbn, sortParam, limit);
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

function escapeString(str) {
    return `'${str}'`;
}

function feedbackQuery(isbn, sortParam, limit) {
    let escapedIsbn = escapeString(isbn);

    let limitQuery;
    if (limit) {
        limitQuery = `LIMIT ${limit};`;
    } else {
        limitQuery = ';';
    }

    return `
        SELECT
          *
        FROM
          (
            # feedback that has been rated
            SELECT
              Feedbacks.login, ISBN, score, content, date, ratings.avg_rating
            FROM
              Feedbacks,
              (SELECT AVG(rating) AS avg_rating, login FROM Ratings GROUP BY login, ISBN) as ratings
            WHERE
              Feedbacks.login=ratings.login
            UNION
              # Feedback that has not been rated
              SELECT
                login,
                ISBN,
                score,
                content,
                date,
                '-' # indicates that it has not been rated
            FROM
              Feedbacks
            WHERE
              login NOT IN (SELECT login FROM Ratings)
          ) AS subquery
        WHERE
          ISBN=${escapedIsbn}
        ORDER BY
          ${sortParam} DESC
        ${limitQuery}
    `;
}
