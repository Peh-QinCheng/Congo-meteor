Meteor.methods({
    'findBook': function (ISBN) {
        check(ISBN, String);
        var statement = 'SELECT * FROM Books WHERE ISBN = ' + '\'' + ISBN + '\'';
        Meteor.publish('book', function() {
            return liveDb.select(
                statement,
                [ { table: 'Books' } ]
            );
        });   
    }
});