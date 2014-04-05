Courses = new Meteor.Collection("courses");

Router.configure({
  layoutTemplate: 'masterLayout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('newCourse', {path: '/newcourse'});
  this.route('newGame', {path: '/newgame'});
  this.route('games', {path: '/games'});
  this.route('courses', {path: '/courses'});
  this.route('gameDetail', {
    path: '/games/:game_num',
    data: function () {
      alert(this.params.game_num);
    }
  });
  this.route('courseeDetail', {
    path: '/courses/:course_name',
    data: function () {
      alert(this.params.course_name);
    }
  });
});

if (Meteor.isClient) {
  //New Course
  Template.newCourse.events({
    'click input#course_submit': function () {

      var Course = {};
      var holes = [];

      Course.name = $('#course_name').val();

      for(var i=1; i<18; i++){
        var par = ".hole-"+i+"-par";
        var hcp = ".hole-"+i+"-hcp";

        holes[i] = {
          'par' : parseInt($(par).val()),
          'hcp' : parseInt($(hcp).val())
        }
      }

      Course.holes = holes;

     Meteor.call('addCourse', Course);
    }
  });

  // Courses
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
}//isClient

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
