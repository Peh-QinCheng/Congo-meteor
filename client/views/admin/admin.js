books = new MysqlSubscription('allBooks');

Template.adminBookList.helpers({
    currentCustomer: function () {
        return localStorage.getItem(KEY_CURRENT_CUSTOMER)
    },

    books: function () {
      return books.reactive();
    }
});

Template.adminBookList.events({
    'submit form': function (events) {
        events.preventDefault();
        var quantity= Number(events.target.quantity.value);
        var ISBN = events.target.ISBN.value
        console.log((typeof quantity === "number"));
        Meteor.call('updateQuantity', quantity, ISBN);
    }
});