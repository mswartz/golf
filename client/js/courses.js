/**************************

courses.js

**************************/

if(Meteor.isClient){
  Template.courses.helpers({
    'courses' : function(){
      return Courses.find().fetch();
    }
  });

  Template.courses.events({
    'click #delete_course' : function(){
      if(confirm('are you sure you want to delete '+this.name+"?")){
        Meteor.call('removeCourse', this._id);
      }
    }
  });
}
