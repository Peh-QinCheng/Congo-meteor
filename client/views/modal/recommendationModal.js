Template.recommendationModal.onCreated(function () {
    var isbn = Template.currentData();
    this.items = new MysqlSubscription('recommendedBooks', isbn, Session.get(KEY_CURRENT_CUSTOMER));
});

Template.recommendationModal.helpers({
    items: function () {
        return Template.instance().items.reactive();
    }
});

Template.recommendationModal.events({
    'click a': function (e){
        $('#myModal').modal('hide');
    }
});
