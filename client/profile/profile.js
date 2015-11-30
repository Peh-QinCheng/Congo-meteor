Template.profile.onCreated(function () {
    this.data.profile = new MysqlSubscription('customerProfile', Template.currentData().login);
    this.data.invoices = new MysqlSubscription('customerInvoice', Template.currentData().login);
});

Template.userInfo.helpers({
    profile: function (context) {
        var profile = context.profile;
        profile.depend();
        if (profile.ready()) {
            return profile.length === 0 ? 'No such customer found!' : profile[0];
        } else {
            return 'Loading...'
        }
    }
});

Template.orderHistory.helpers({
    invoices: function (context) {
        var invoices= context.invoices;
        invoices.depend();
        if (invoices.ready()) {
            console.log(invoices);
            return invoices.length === 0 ? ['No invoices found!'] : invoices;
        } else {
            return []
        }
    }
});