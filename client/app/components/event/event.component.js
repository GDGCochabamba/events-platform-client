var event = {
  templateUrl: 'event.html',
  controller: 'EventController'
}

angular
  .module('components.event')
  .component('event', event)
  .config(function($stateProvider) {
    $stateProvider
      .state('event', {
        url: '^/event/:keyEvent',
        component: 'event'
      });
  });