var event = {
  templateUrl: 'event.html'
}

angular
  .module('components.event')
  .component('event', event)
  .config(function($stateProvider) {
    $stateProvider
      .state('event', {
        parent: 'app',
        url: '^/event',
        component: 'event'
      });
  });