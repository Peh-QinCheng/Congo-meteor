Meteor.publish('customerInvoice', function (login) {
    var table = 'Invoices';
    return liveDb.select(function (esc, escId) {
        // 'SELECT * FROM Orders o , Invoices i where o.invoiceid = i.invoiceid AND i.login =
        return (
            'SELECT * FROM Orders o, Invoices i where o.invoiceid = i.invoiceid '+
                'AND i.login='+ esc(login)
        );
    }, [{
        table: table
        //,
        //condition: function (row, newRow) {
        //    return row.id === id
        //            // On UPDATE queries, newRow must be checked as well
        //        || (newRow && newRow.id === id);
        //}
    }])
});