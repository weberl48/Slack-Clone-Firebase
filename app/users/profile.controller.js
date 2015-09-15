(function() {
  angular.module('angularfireSlackApp')
    .controller('ProfileCtrl', function($state, md5, auth, profile) {
      var profileCtrl = this
      profileCtrl.profile = profile;
      profileCtrl.updateProfile = function() {
        profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
        profileCtrl.profile.$save();
      };
    })
})()
// Getting current user's email from the auth data that was resolved from our router
// hashing it and setting to emailHash on profile.
// display name set from template (ng-model)

//auth :
// - similar to requireNoAuth except inverse
//
