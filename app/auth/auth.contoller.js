(function () {
  angular.module('angularfireSlackApp')
    .controller('AuthCtrl', function(Auth, $state){
      // ref to this
      var authCtrl = this;
      //userObj used with ng-model directive on form
      authCtrl.user = {
        email: '',
        password: ''
      };

      authCtrl.login = function () {
        Auth.$authWithPassword(authCtrl.user).then(function (auth){
          $state.go('home');
        }, function (error){
          authCtrl.error = error;
        });
      };
      authCtrl.register = function (){
        Auth.$createUser(authCtrl.user).then(function (user){
          authCtrl.login();
        }, function (error){
          authCtrl.error = error;
        });
      };
    });
}) ()

// $state:
  // - service porvided by ui-router
  // - control stat of our application
  // - go() fucntion to redirect app to spefific state
  // - follow controller as syntax create reference to this

// $authWithPassword
  // - firebaseAuth function for loggin in users

// $createUSer
  // - firebaseAuth function for creating users

// this vs $scope
  // - on surface two are interchangeable
  // - pushing everything to $scope not always neccessary
  // - think of controllers as classes
  // - one purpose of controllers like classes is isolation
  // - limit which properties are exposed to $scope

  //note: it is considered good practice to encapsulate this to
  //      the controller with a variable to avoid conflict through confusion of this
