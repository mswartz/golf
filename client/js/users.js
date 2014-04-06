/**************************

courses.js

**************************/

if(Meteor.isClient){
  Template.users.helpers({
    'users' : function(){
      return Meteor.users.find().fetch();
    }
  });
}
