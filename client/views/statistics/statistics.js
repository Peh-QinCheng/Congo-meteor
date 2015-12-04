const limitStatistics = 5;

Template.statistics.onCreated(function () {
    this.mostPopularBooks = new MysqlSubscription('filteredSortedBooks', null, 'copies', limitStatistics);
    this.mostPopularAuthors = new MysqlSubscription('mostPopularAuthors', limitStatistics);
    this.mostPopularPublishers = new MysqlSubscription('mostPopularPublishers', limitStatistics);
});

Template.statistics.helpers({
    mostPopularBooks: () => {
        return Template.instance().mostPopularBooks.reactive();
    },
    mostPopularAuthors: () => {
        return Template.instance().mostPopularAuthors.reactive();
    },
    mostPopularPublishers: () => {
        return Template.instance().mostPopularPublishers.reactive();
    }
});
