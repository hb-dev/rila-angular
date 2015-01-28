var rilaServices = angular.module('rilaServices', ['ngResource']);

rilaServices.factory('Enrollment', ['$resource', 'REMOTE_URL',
  function($resource, REMOTE_URL){
    return $resource(REMOTE_URL + '/api/enrollments/:id', { id: "@id" }, {
      'create':  { method: 'POST' }
    });
  }
 ]);

rilaServices.factory('Relay', ['$resource', 'REMOTE_URL',
  function($resource, REMOTE_URL){
    return $resource(REMOTE_URL + '/api/relays/:id', { id: "@id" }, {
      'create':  { method: 'POST' }
    });
  }
 ]);

rilaServices.factory('Event', ['$resource', 'REMOTE_URL',
  function($resource, REMOTE_URL){
    return $resource(REMOTE_URL + '/api/events/:id', { id: "@id" }, {
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false }
    });
  }
]);

rilaServices.factory('Run', ['$resource', 'REMOTE_URL',
  function($resource, REMOTE_URL){
    return $resource(REMOTE_URL + '/api/runs/:id', { id: "@id" }, {
      'index':   { method: 'GET', isArray: true },
      'show':   { method: 'GET', isArray: false }
    });
  }
]);

rilaServices.factory('Registration', ['$resource', 'REMOTE_URL',
  function($resource, REMOTE_URL){
    return $resource(REMOTE_URL + '/api/events/latest', {}, {
      'index':   { method: 'GET', isArray: false }
    });
  }
]);
