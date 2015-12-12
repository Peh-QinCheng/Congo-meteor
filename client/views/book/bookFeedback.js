Template.bookFeedback.events({
    'click button.book-feedback-score': function (event) {
        event.preventDefault();
        console.log(event.target);
        var newRating = parseInt(event.target.value);
        var feedbackLogin = this.login;
        var feedbackIsbn = this.ISBN;
        var raterLogin = Session.get(KEY_CURRENT_CUSTOMER);
        console.log(feedbackLogin, feedbackIsbn, raterLogin, newRating);
        Meteor.call('addFeedbackRating', feedbackLogin, feedbackIsbn, raterLogin, newRating, function (error, queryError) {
            if (error) {
                console.error(error);
                return;
            }
            if (queryError) {
                console.error(queryError);
                // todo filter alerts
                alert(queryError);
            }
        });
    }
});
