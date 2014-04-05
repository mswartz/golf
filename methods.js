Meteor.methods({
	'addCourse' : function(course){
		Courses.insert(course);
	},
	'removeCourse' : function(course){
		Courses.remove(course);
	},
	'addRound' : function(){
		//add a round
	}
});
