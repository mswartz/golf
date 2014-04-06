/**************************

newCourse.js

**************************/

if (Meteor.isClient){
  Template.newCourse.events({
    'click input#course_submit': function () {

      var Course = {};
      var holes = [];
      var out_tot = 0;
      var in_tot = 0;

      Course.name = $('#course_name').val();

      for(var i=1; i<19; i++){
        var par = ".hole-"+i+"-par";
        var hcp = ".hole-"+i+"-hcp";

        holes[i-1] = {
          'num' : i,
          'par' : parseInt($(par).val()),
          'hcp' : parseInt($(hcp).val())
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

      console.log(Course);

      Meteor.call('addCourse', Course);
      Router.go('courses');
    }
  });
}
