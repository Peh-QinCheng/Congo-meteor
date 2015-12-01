Meteor.methods({
    'updateQuantity': function (quantity, ISBN) {
      check(quantity, Number);
      check(ISBN, String);
      liveDb.db.query('UPDATE books SET copies = ? WHERE ISBN = ?', [ quantity, ISBN ]);
    },

    'makeNewBook': function (quantity, ISBN, author, publisher, year, price, bkformat, keywords, subject, title) {
        liveDb.db.query('INSERT INTO Books (copies, ISBN, author, publisher, year, price, bkformat, keywords, subject, title) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [quantity, ISBN, author, publisher, year, price, bkformat, keywords, subject, title]);
    }
});
