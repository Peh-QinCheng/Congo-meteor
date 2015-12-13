const limitStatistics = 5;

Template.statistics.onCreated(function () {
    this.mostPopularBooks = new MysqlSubscription('mostPopularBooks', null, 'copies', limitStatistics);
    this.mostPopularAuthors = new MysqlSubscription('mostPopularAuthors', limitStatistics);
    this.mostPopularPublishers = new MysqlSubscription('mostPopularPublishers', limitStatistics);
});

Template.statistics.helpers({
    mostPopularBooks: () => {
        Session.get(KEY_MAKE_FEEDBACKS_REACTIVE);
        return Template.instance().mostPopularBooks.reactive();
    },
    mostPopularAuthors: () => {
        Session.get(KEY_MAKE_FEEDBACKS_REACTIVE);
        return Template.instance().mostPopularAuthors.reactive();
    },
    mostPopularPublishers: () => {
        Session.get(KEY_MAKE_FEEDBACKS_REACTIVE);
        return Template.instance().mostPopularPublishers.reactive();
    }
});

Template.statistics.events({
    'submit form.statistics-controls': function (event) {
        event.preventDefault();
        let pageState = Template.instance();
        let queryLimit = event.target.queryLimit.value;

        pageState.mostPopularBooks = new MysqlSubscription('mostPopularBooks', null, 'copies', queryLimit);
        pageState.mostPopularAuthors = new MysqlSubscription('mostPopularAuthors', queryLimit);
        pageState.mostPopularPublishers = new MysqlSubscription('mostPopularPublishers', queryLimit);

        Session.set(KEY_MAKE_FEEDBACKS_REACTIVE, !Session.get(KEY_MAKE_FEEDBACKS_REACTIVE));
    }
});
