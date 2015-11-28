// Data is read from select statements published by server
books = new MysqlSubscription('allBooks');
users = new MysqlSubscription('allUsers');


if (Meteor.isServer) {
  var liveDb = new LiveMysql({
    host: 'localhost',
    port: 3407,
    user: 'root',
    password: '',
    database: 'bookstore'
  });

  var closeAndExit = function() {
    liveDb.end();
    process.exit();
  };
  // Close connections on hot code push
  process.on('SIGTERM', closeAndExit);
  // Close connections on exit (ctrl + c)
  process.on('SIGINT', closeAndExit);

  Meteor.publish('allBooks', function() {
    return liveDb.select(
      'SELECT * FROM Books',
      [ { table: 'Books' } ]
    );
  });

  Meteor.publish('allUsers', function() {
    return liveDb.select(
      'SELECT * FROM Customers',
      [ { table: 'Customers' } ]
    );
  });

  Meteor.methods({
    'new_user': function(email, password) {
      check(email, String);
      check(password, String);
      liveDb.db.query(
        'INSERT INTO Customers (login, password) VALUES ( ? , ?)', [ email, password ]);
    }
  });

}
