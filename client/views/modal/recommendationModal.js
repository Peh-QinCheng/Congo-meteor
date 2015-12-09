Template.recommendationModal.onCreated(function () {
    let tpl = this;
    tpl.autorun(()=> {
        let isbn = Template.currentData();
        this.items = new MysqlSubscription('recommendedBooks', isbn, Session.get(KEY_CURRENT_CUSTOMER));
    });
});

Template.recommendationModal.helpers({
    items: function () {
        return Template.instance().items.reactive();
    },
    subtitle: function () {
        let items = Template.instance().items.reactive();
        if (items.ready){
            let numItems = items.length;
            if (numItems > 0){
                return "Other users also bought..."
            }else{
                return "No recommendations yet!"
            }
        }

    }
});

Template.recommendationModal.events({
    'click a': function (e) {
        $('#myModal').modal('hide');
    }
});
