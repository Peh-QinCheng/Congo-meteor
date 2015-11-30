Meteor.methods({
    "checkout": function (login, items) {

        liveDb.db
            .query(
                'INSERT INTO Invoices (login) VALUES (?)', [login], function (err, res) {
                    if (err) {
                        console.log('Error while inserting into Invoives: ', err);
                        return;
                    }

                    var id = res.insertId;
                    _.each(items, function (item) {
                        if (item.price !== 0) {
                            console.log('Inserting into Invoice %s: %s', id, JSON.stringify(item));
                            liveDb.db.query(
                                'INSERT INTO Orders (invoiceid, ISBN, price, copies) VALUES (?, ?, ?, ?)',
                                [id, item.ISBN, item.price, item.copies],
                                function (err, res) {
                                    if (err) {
                                        console.log('Error while inserting into Orders: ', err)
                                    }
                                }
                            )
                        }
                    })
                })
    }
});