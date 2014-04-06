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
  this.route('users', {path: '/users'});
  this.route('gameDetail', {
    path: '/games/:game_num',
    data: function() {
      alert(this.params.game_num);
    }
  });
  this.route('courseDetail', {
    path: '/courses/:course_name',
    data: function(){
      Session.set('courseSelected', this.params.course_name);
    },
    onStop: function() {
      Session.set('courseSelected', undefined);
    }
  });
});


if (Meteor.isClient) {
  // Client stuff
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
