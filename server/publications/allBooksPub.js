Meteor.publish('allBooks', function () {
    return liveDb.select(
        'SELECT * FROM Books',
        [{table: 'Books'}]
    );
});
