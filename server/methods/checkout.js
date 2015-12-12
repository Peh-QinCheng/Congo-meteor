Meteor.methods({
    "checkout": function (login, items) {
        let checkoutCb = function (err, res) {
            if (err) {
                console.error('Error while inserting into Invoives: ', err);
                return items;
            }

            var id = res.insertId;
            return _.map(items, function (item) {
                if (item.copies !== 0) {
                    // shitty async waterfall
                    let success = _.reduce([
                            (memo)=> {
                                return Async.runSync((done)=> {
                                    liveDb.db.query(
                                        'SELECT * FROM books WHERE ISBN = ? AND copies >= ?',
                                        [item.ISBN, item.copies],
                                        function (err, res) {
                                            if (err) {
                                                console.error('Error while selecting from books: ', err);
                                                done(err, false);
                                                return
                                            }
                                            if (res.length < 1) {
                                                console.log('Insufficient copies!');
                                                done("Insufficient Copies of book", false);
                                                return
                                            }

                                            done(null, true)
                                        }
                                    )
                                })
                            },
                            (memo)=> {
                                if (memo.error) {
                                    console.log(`Aborting insert into orders due to error: ${memo.error}`);
                                    return memo;
                                }

                                return Async.runSync((done)=> {
                                    liveDb.db.query(
                                        'INSERT INTO orders (invoiceid, ISBN, price, copies) VALUES (?, ?, ?, ?)',
                                        [id, item.ISBN, item.price, item.copies],
                                        function (err, res) {
                                            if (err) {
                                                console.error('Error while inserting into Orders: ', err);
                                                done(err, false);
                                                return
                                            }
                                            done(null, true)
                                        }
                                    )
                                })
                            },
                            (memo) => {
                                if (memo.error) {
                                    console.log('Aborting update to books due to error!');
                                    return memo;
                                }

                                return Async.runSync((done)=> {
                                    liveDb.db.query(
                                        'UPDATE books SET copies = copies - ? WHERE ISBN = ?',
                                        [item.copies, item.ISBN],
                                        function (err, res) {
                                            if (err) {
                                                // NO POINTS NO ROLLBACK
                                                console.error('Error while updating book copies: ', err);
                                                done(err, false);
                                                return
                                            }
                                            done(null, true)
                                        }
                                    )
                                });

                            }
                        ],

                        (memo, fn) => {
                            return fn(memo)
                        }, true);

                    console.log("Item status: ", success);
                    return success.error ? item : null;
                }
            })
        };
        let {error, result} = Async.runSync((done)=> {
            liveDb.db.query('INSERT INTO invoices (login) VALUES (?)', [login], (err, res)=> {
                done(err, res);
            })
        });
        return checkoutCb(error, result);
    }
});
