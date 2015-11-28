Template.register.events({
    'submit form': function(events){
      var email = events.target.email.value; 
      var password = events.target.password.value;
      Meteor.call('new_user', email, password);
    }
});