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
          templateUrl: 'auth/login.html'
        })
        .state('register', {
          url: '/register',
          controller: 'AuthCtrl as authCtrl',
          templateUrl: 'auth/register.html'
        })

      $urlRouterProvider.otherwise('/');
    })
    .constant('FirebaseUrl', 'https://slack-firebase.firebaseio.com/');
})()
