Meteor.publish('customerInvoice', function (login) {
    var table = 'invoices';
    return liveDb.select(function (esc, escId) {
        return (
            'SELECT ISBN,copies,price, order_date FROM Orders o, invoices i where o.invoiceid = i.invoiceid '+
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