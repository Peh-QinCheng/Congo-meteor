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
    }, [{table: 'feedbacks'}, {table: 'ratings'}]);
});

Meteor.publish('feedbackHistory', function (login) {
    return liveDb.select(function (esc, escId) {
        return feedbackQuery(null, null, null, login);
    }, [{table: 'feedbacks'}]);
});

function escapeString(str) {
    return `'${str}'`;
}

function feedbackQuery(isbn, sortParam, limit, login) {
    let limitQuery = getLimitQuery(limit);

    let loginQuery = '';
    if (login) {
        loginQuery = `login=${escapeString(login)}`;
    }

    let isbnQuery = '';
    if (isbn) {
        isbnQuery = `ISBN=${escapeString(isbn)}`
    }

    let filterQuery;
    if (isbnQuery && loginQuery) {
        filterQuery = `WHERE ${isbnQuery} AND ${loginQuery}`;
    } else {
        filterQuery = `WHERE ${isbnQuery || loginQuery}`;
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
              (SELECT AVG(rating) AS avg_rating, login, ISBN as book FROM ratings GROUP BY login, ISBN) as ratings
            WHERE
              feedbacks.login=ratings.login AND feedbacks.ISBN = ratings.book
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
`              feedbacks f
            WHERE NOT EXISTS(
                SELECT 1
                FROM ratings r
                WHERE r.login = f.login AND f.ISBN = r.ISBN
            )
          ) AS subquery
        ${filterQuery}
        ORDER BY
          ${sortParam} DESC
        ${limitQuery};
    `;
}
