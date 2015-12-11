Meteor.publish('ratedFeedback', function (login) {
    return liveDb.select(function (esc, escId) {
        return `
            SELECT
              feedbacks.login, feedbacks.ISBN, feedbacks.score, feedbacks.content, feedbacks.date, ratings.rating
            FROM
              feedbacks, ratings
            WHERE
              feedbacks.login=ratings.login
              AND
                ratings.rater_login='sda'
            ORDER BY
              rating DESC;`;
    }, [
        {table: 'ratings'},
        {table: 'feedbacks'}
    ]);
});
