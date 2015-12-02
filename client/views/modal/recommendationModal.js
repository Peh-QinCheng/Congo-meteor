Template.recommendationModal.onCreated(function () {
    var isbn = Template.currentData();
    this.items = new MysqlSubscription('recommendedBooks', isbn, Session.get(KEY_CURRENT_CUSTOMER));
});

Template.recommendationModal.helpers({
    items: function () {
        let items = Template.instance().items.reactive();
        return items;
    }
});