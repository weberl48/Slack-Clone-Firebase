(function(){
angular.module('angularfireSlackApp')
  .factory('Auth', function($firebaseAuth, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(ref);
    return auth;
  });
})()
// $firebaseAuth
  // - service that AngularFire provides
  // - wraps authentication methods provided by the Firebase client library
  // - can be injected into anu\y contoller, service, or factory

// ref
  // - creating a refference to our Firebase
