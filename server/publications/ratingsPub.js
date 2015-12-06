Meteor.publish('ratedFeedback', function (login) {
    return liveDb.select(function (esc, escId) {
        return `SELECT * FROM ratings WHERE rater_login=${esc(login)}`
    }, [{table: 'ratings'}]);
});
