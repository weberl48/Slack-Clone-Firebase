(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name angularfireSlackApp
     * @description
     * # angularfireSlackApp
     *
     * Main module of the application.
     */
    angular
      .module('angularfireSlackApp', [
        'firebase',
        'angular-md5',
        'ui.router'
      ])
      .config(function($stateProvider, $urlRouterProvider) {
          $stateProvider
            .state('home', {
              url: '/',
              templateUrl: 'home/home.html'
            })
            .state('login', {
              url: '/login',
              controller: 'AuthCtrl as authCtrl',
              templateUrl: 'auth/login.html',
              resolve: {
                requireNoAuth: function($state, Auth) {
                  return Auth.$requireAuth().then(function(auth) {
                    $state.go('home');
                  }, function(error) {
                    return;
                  });
                }
              }
            })
            .state('register', {
              url: '/register',
              controller: 'AuthCtrl as authCtrl',
              templateUrl: 'auth/register.html',
              resolve: {
                requireNoAuth: function($state, Auth) {
                  return Auth.$requireAuth().then(function(auth) {
                    $state.go('home');
                  }, function(error) {
                    return;
                  });
                }
              }
            })
            .state('profile', {
              url: '/profile',
              controller: 'ProfileCtrl as profileCtrl',
              templateUrl: 'users/profile.html',
              resolve: {
                auth: function($state, Users, Auth) {
                  return Auth.$requireAuth().catch(function() {
                    $state.go('home');
                  });
                },
                profile: function(Users, Auth) {
                  return Auth.$requireAuth().then(function(auth) {
                    return Users.getProfile(auth.uid).$loaded();
                  });
                }
              }
            })
            // resolving two dependencies:
            // - channels,  promising  $firebaseArray
            // - profile, displayName set, otherwise they're taken to the profile state
            // - if user not authenticated redirect to home
            .state('channels', {

                url: '/channels',
                controller: 'ChannelsCtrl as channelsCtrl',
                templateUrl: 'channels/index.html',
                resolve: {
                  requireNoAuth: function($state, Auth) {
                    return Auth.$requireAuth().then(function(auth) {
                      $state.go('channels');
                    }, function(error) {
                      return;
                    });
                  }
                },

                profile: function($state, Auth, Users) {
                  return Auth.$requireAuth().then(function(auth) {
                    return Users.getProfile(auth.uid).$loaded().then(function(profile) {
                      if (profile.displayName) {
                        return profile;
                      } else {
                        $state.go('profile');
                      }
                    });
                  }, function(error) {
                    $state.go('home');
                  });
                }
              }
              .state('channels.create', {
                url: '/create',
                templateUrl: 'channels/create.html',
                controller: 'ChannelsCtrl as channelsCtrl'
              })
            }) $urlRouterProvider.otherwise('/');
      })
  .constant('FirebaseUrl', 'https://slack-firebase.firebaseio.com/');
})()

// $requireAuth:
// - firebaseAuth service function
// - returns a promise (auth obj)
