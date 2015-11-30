Meteor.methods({
    'updateQuantity': function (quantity, ISBN) {
      check(quantity, Number);
      check(ISBN, String);
      liveDb.db.query('UPDATE books SET copies = ? WHERE ISBN = ?', [ quantity, ISBN ]);
    }  
});
