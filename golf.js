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
  Template.hello.greeting = function () {
    return "Welcome to golf.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
        Meteor.call('doSomething');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
