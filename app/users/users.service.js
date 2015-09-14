(function() {

  angular.module('angularfireSlackApp')
    .factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl) {
      var usersRef = new Firebase(FirebaseUrl + 'users');
      var users = $firebaseArray(usersRef)
      var Users = {
        getProfile: function(uid) {
          return $firebaseObject(usersRef.child(uid));
        },
        getDisplayName: function(uid) {
          return users.$getRecord(uid).displayName;
        },
        all: users
      };
      return Users;
    });

})()
//purpose:
// - get spefific user data
// - get list of all users

// usersRef:
// - firebase is stored in a tree structure
// - child nodes accessable by adding path to firebase url
// - FirebaseUrl + 'Users' = https://slack-firebase.firebaseio.com/users

// $firebaseArray:
// - will return a pseudo array
// - methods like splice(), pop() will not work
// - $add, $remove manipulate serve data

// getProfile(uid):
  // - get a $firebaseObject of specific user profile
  // - 
