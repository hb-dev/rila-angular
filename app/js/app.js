var rilaApp = angular.module('rilaApp', ['ngRoute', 'rilaControllers', 'rilaServices', 'ui.bootstrap', 'wc.Directives', 'nya.bootstrap.select', 'countrySelect']);

rilaApp.constant('REMOTE_URL', 'https://rilamanager.herokuapp.com');
//rilaApp.constant('REMOTE_URL', 'http://localhost:3000');

rilaApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/results', {
        templateUrl: 'partials/event-list.html',
        controller: 'EventListCtrl'
      }).
      when('/results/:eventId', {
        templateUrl: 'partials/event-detail.html',
        controller: 'EventDetailCtrl'
      }).
      when('/enrollments/new', {
        templateUrl: 'partials/enrollment-create.html',
        controller: 'EnrollmentCreateCtrl'
      }).
      when('/relays/new', {
        templateUrl: 'partials/relay-create.html',
        controller: 'RelayCreateCtrl'
      }).
      when('/registrations', {
        templateUrl: 'partials/registration-list.html',
        controller: 'RegistrationListCtrl'
      }).
      when('/registrations/new', {
        templateUrl: 'partials/registration-new.html',
        controller: 'RegistrationNewCtrl'
      }).
      when('/registrations/confirmation', {
        templateUrl: 'partials/registration-confirmation.html',
        controller: 'RegistrationConfirmationCtrl'
      }).
      otherwise({
        redirectTo: '/results'
      });
  }
]);