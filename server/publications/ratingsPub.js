Meteor.publish('ratedFeedback', function (login) {
    return liveDb.select(function (esc, escId) {
        //return `SELECT * FROM ratings WHERE rater_login=${esc(login)}`
        return `
            SELECT
              *
            FROM
              ratings
            WHERE
              rater_login='sadsadad'
            ORDER BY
              rating DESC;
           `
    }, [{table: 'ratings'}]);
});
