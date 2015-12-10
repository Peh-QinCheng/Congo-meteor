Meteor.publish('ratedFeedback', function (login) {
    return liveDb.select(function (esc, escId) {
        //return `SELECT * FROM ratings WHERE rater_login=${esc(login)}`
        return `
            SELECT
              AVG(rating) as avg_rating, ISBN
            FROM
              ratings
            WHERE
              ISBN IN ( #All books that I have rated feedbacks
                SELECT
                  ISBN
                FROM
                  ratings
                WHERE
                  rater_login='${login}'
              )
            GROUP BY
              ISBN
            ORDER BY
              avg_rating DESC`
    }, [{table: 'ratings'}]);
});
