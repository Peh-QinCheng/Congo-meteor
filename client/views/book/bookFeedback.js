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
        var changeScoreBy = parseInt(event.target.value);
        var newScore = this.score + changeScoreBy;
        console.log('score clicked:', this.login, this.ISBN, newScore);
    }
});
