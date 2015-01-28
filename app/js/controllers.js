var rilaControllers = angular.module('rilaControllers', []);

rilaControllers.controller('EventListCtrl', ['$scope', 'Event', function($scope, Event) {
  $scope.events = Event.index();
}]);

rilaControllers.controller('EventDetailCtrl', ['$scope', '$routeParams', 'Event', function($scope, $routeParams, Event) {
  $scope.theEvent = Event.show({id: $routeParams.eventId}, function(theEvent) {
    $scope.runs = theEvent.runs;
    $scope.selectedRun = $scope.runs[0];
  });
  $scope.showTotal = true;
}]);

rilaControllers.controller('RegistrationNewCtrl', ['$scope', '$routeParams', 'Run', function($scope, $routeParams, Run) {
  $scope.runs = Run.index()
}]);

rilaControllers.controller('RegistrationListCtrl', ['$scope', '$routeParams', 'Registration', function($scope, $routeParams, Registration) {
  $scope.theEvent = Registration.index(function(theEvent) {
    $scope.runs = theEvent.runs;
  });
}]);

rilaControllers.controller('RegistrationConfirmationCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  console.log($rootScope);
  $scope.confirmation_id = $rootScope.confirmation_id;
  $scope.confirmation_price = $rootScope.confirmation_price;  
}]);

rilaControllers.controller('EnrollmentCreateCtrl', ['$scope', '$routeParams', 'Enrollment', 'Run', '$rootScope', '$location', function($scope, $routeParams, Enrollment, Run, $rootScope, $location) {
  $scope.errors = {}
  $scope.enrollment = new Enrollment();
  $scope.enrollment.runner_country = "Deutschland";
  $scope.enrollment.run_slug = $routeParams.run_id;
  $scope.run = Run.show({id: $scope.enrollment.run_slug});
  $scope.enrollment.agb = false;
  $scope.enrollment.newsletter = true;
  $scope.titles = ["Dr.", "Prof.", "Prof. Dr."];
  $scope.genders = ["Männlich", "Weiblich"];

  $scope.format = 'dd.MM.yyyy';
  $scope.maxDate = new Date();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };


  $scope.submit = function() {

    $scope.isSaving = true;

    function success(response) {
      console.log("success", response)
      $rootScope.confirmation_id = response.id;
      $rootScope.confirmation_price = response.price;
      $location.path("/registrations/confirmation");
    }

    function failure(response) {
      console.log("failure", response);
      $scope.errors = response.data;
      $scope.hasErrors = true;
      $scope.responseStatus = response.status;
      console.log($scope.errors);
      $scope.isSaving = false;
    }

    Enrollment.create($scope.enrollment, success, failure);
  };
}]);

rilaControllers.controller('RelayCreateCtrl', ['$scope', '$routeParams', 'Relay', 'Enrollment', 'Run', '$location', '$rootScope', function($scope, $routeParams, Relay, Enrollment, Run, $location, $rootScope) {
  $scope.errors = {}
  $scope.relay = new Relay();  
  $scope.relay.run_slug = $routeParams.run_id;
  $scope.run = Run.show({id: $scope.relay.run_slug});

  $scope.relay.contact_country = "Deutschland";
  $scope.relay.agb = false;
  $scope.relay.newsletter = true;  
  $scope.titles = ["Dr.", "Prof.", "Prof. Dr."];
  $scope.genders = ["Männlich", "Weiblich"];
  $scope.format = 'dd.MM.yyyy';
  $scope.maxDate = new Date();

  $scope.open = function($event, datePicker) {
    $event.preventDefault();
    $event.stopPropagation();
    datePicker.opened = true;
  };

  $scope.relay.enrollments_attributes = [];
  for (var i=0; i<4; ++i ){
    enrollment = new Enrollment();
    enrollment.run_slug = $scope.relay.run_slug;
    $scope.relay.enrollments_attributes.push(enrollment);
  }

  $scope.submit = function() {

    $scope.isSaving = true;

    function success(response) {
      console.log("success", response)
      $rootScope.confirmation_id = response.id;
      $rootScope.confirmation_price = response.price;
      $location.path("/registrations/confirmation");
    }

    function failure(response) {
      console.log("failure", response);
      $scope.errors = response.data;
      $scope.hasErrors = true;
      $scope.responseStatus = response.status;
      console.log($scope.errors);
      $scope.isSaving = false;
    }

    Relay.create($scope.relay, success, failure);
  };

}]);