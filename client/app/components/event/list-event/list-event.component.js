var eventList = {
  templateUrl: 'list-event.html',
  controller: 'EventListController'
};

angular
  .module('components.event')
  .component('eventList', eventList)
  .config(function($stateProvider) {
    $stateProvider
      .state('eventsList', {
        parent: 'app',
        url: '^/events',
        component: 'eventList'
      });
  });
