Template.bookFeedback.onCreated(function () {
    var currentFeedback = this.data;
    this.currentFeedbackRating = new MysqlSubscription('feedbackRating', currentFeedback.login, Template.currentData().ISBN);
});

Template.bookFeedback.helpers({
    rating: function () {
        Template.instance().currentFeedbackRating.depend();
        var queryResult = Template.instance().currentFeedbackRating.reactive()[0];
        if (queryResult) {
            return queryResult['AVG(rating)'] || '-'
        }
        return '-'
    }
});

Template.bookFeedback.events({
    'click button.feedback-score': function (event) {
        var newRating = parseInt(event.target.value);
        var feedbackLogin = this.login;
        var feedbackIsbn = this.ISBN;
        var raterLogin = localStorage.getItem(KEY_CURRENT_CUSTOMER);
        Meteor.call('addFeedbackRating', feedbackLogin, feedbackIsbn, raterLogin, newRating, function (error, queryError) {
            if (error) {
                console.error(error);
                return;
            }
            if (queryError) {
                console.error(queryError);
                return;
            }
        });
    }
});
