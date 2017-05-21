(function () {
  'use strict';

  require('./components/main.js');

  angular.module('App', [
    // dependencies
    'ngRoute',
    // modules
    'Main'
  ])
  .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
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
    }
  ]);
})();
