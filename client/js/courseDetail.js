/**************************

courseDetail.js

**************************/

if (Meteor.isClient){
  Template.courseDetail.helpers({
    'course' : function(){
      return Courses.findOne({'name' : Session.get('courseSelected')});
    },
    'holes_out' : function(){
      var holes = Courses.findOne({'name' : Session.get('courseSelected')}).holes;
      var holes_out = [];

      for(var i = 0; i<9; i++){
        holes_out[i] = holes[i];
      }

      return holes_out;
    },
    'holes_in' : function(){
      var holes = Courses.findOne({'name' : Session.get('courseSelected')}).holes;
      var holes_in = [];

      for(var i = 9; i<18; i++){
        holes_in[i] = holes[i];
      }

      return holes_in;
    },
    'editmode' : function(){
      if(Session.get('editmode')===true){
        return true;
      }
    }
  });

  Template.courseDetail.events({
    'click #edit_course' : function(){
      Session.set('editmode', true);
    },
    'click #update_course' : function(){

      var Course = {};
      var holes = [];
      var out_tot = 0;
      var in_tot = 0;
      var course_id = Courses.findOne({'name':Session.get('courseSelected')})._id;

      Course.name = $('#course_name').html();

      for(var i=1; i<19; i++){
        var par = ".hole-"+i+"-par";
        var hcp = ".hole-"+i+"-hcp";

        holes[i-1] = {
          'num' : i,
          'par' : parseInt($(par).html()),
          'hcp' : parseInt($(hcp).html())
        }
      }

      for(var i = 0; i<9; i++){
        out_tot = out_tot + holes[i].par;
      }

      for(var i = 9; i<18; i++){
        in_tot = in_tot + holes[i].par;
      }

      Course.holes = holes;
      Course.out_tot = out_tot;
      Course.in_tot = in_tot;
      Course.tot = out_tot + in_tot;

      console.log(course_id);
      console.log(Course);

      Meteor.call('updateCourse', course_id, Course);

      Router.go("/courses/"+Course.name);
      Session.set('editmode', false);
    },
    'click #delete_course' : function(){
      var course = Courses.findOne({'name' : Session.get('courseSelected')});

      if(confirm('Are you sure you want to delete '+course.name+'?')){
        Meteor.call('removeCourse', course._id);
        Router.go('courses');
      }
    }
  });
}
