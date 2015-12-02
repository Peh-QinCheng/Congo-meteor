Meteor.publish('bookFeedbacks', function (isbn, sortBy, limit) {
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
            table: 'feedbacks'
        },
        {
            table: 'ratings'
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
              feedbacks.login, ISBN, score, content, date, ratings.avg_rating
            FROM
              feedbacks,
              (SELECT AVG(rating) AS avg_rating, login FROM ratings GROUP BY login, ISBN) as ratings
            WHERE
              feedbacks.login=ratings.login
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
              feedbacks
            WHERE
              login NOT IN (SELECT login FROM ratings)
          ) AS subquery
        WHERE
          ISBN=${escapedIsbn}
        ORDER BY
          ${sortParam} DESC
        ${limitQuery}
    `;
}
