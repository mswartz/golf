Meteor.methods({
	'addCourse' : function(course){
		Courses.insert(course);
	},
	'removeCourse' : function(course){
		Courses.remove(course);
	},
	'updateCourse' : function(id, course){
		Courses.update(id, {$set:
			{'name': course.name,
			'holes': course.holes,
			'out_tot':course.out_tot,
			'in_tot':course.in_tot,
			'tot':course.tot}},
			{multi : true}
		);
	},
	'addRound' : function(){
		//add a round
	}
});
