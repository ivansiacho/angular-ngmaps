(function () {
  'use strict';
  // import modules
  require('./components/main.js');

  angular.module('App', [
    // dependencies
    'ngRoute',
    // modules
    'Main'
  ])
  .config(function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "./components/main.html",
          controller: "MainController"
        })
        .otherwise({
           redirectTo: '/'
        });
  });
})();
