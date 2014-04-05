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
  this.route('courseDetail', {
    path: '/courses/:course_name',
    data: function () {
      Session.set('courseSelected', this.params.course_name);
    }
  });
});

if (Meteor.isClient) {
  //New Course
  Template.newCourse.events({
    'click input#course_submit': function () {

      var Course = {};
      var holes_out = [];
      var holes_in = [];
      var out_tot = 0;
      var in_tot = 0;

      Course.name = $('#course_name').val();

      for(var i=0; i<9; i++){
        var par = ".hole-"+i+"-par";
        var hcp = ".hole-"+i+"-hcp";

        holes_out[i] = {
          'par' : parseInt($(par).val()),
          'hcp' : parseInt($(hcp).val())
        }
      }

      for(var i=0; i<9; i++){
        var par = ".hole-"+i+"-par";
        var hcp = ".hole-"+i+"-hcp";

        holes_in[i] = {
          'par' : parseInt($(par).val()),
          'hcp' : parseInt($(hcp).val())
        }
      }

      for(var i = 0; i<holes_out.length; i++){
        out_tot = out_tot + holes_out[i].par;
      }

      for(var i = 0; i<holes_in.length; i++){
        in_tot = in_tot + holes_in[i].par;
      }

      Course.holes_out = holes_out;
      Course.out_tot = out_tot;
      Course.holes_in = holes_in;
      Course.in_tot = in_tot;
      Course.tot = out_tot + in_tot;

      console.log(Course);

      Meteor.call('addCourse', Course);
      Router.go('courses');
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


  // Courses
  Template.courseDetail.helpers({
    'course' : function(){
      return Courses.findOne({'name' : Session.get('courseSelected')});
    }
  });


}//isClient

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
