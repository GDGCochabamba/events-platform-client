var eventList = {
  bindings: {
    eventList: '<'
  },
  templateUrl: 'event-list.html',
  controller: 'EventListController'
};

angular
  .module('components.event')
  .component('eventList', eventList)
  .config(function($stateProvider) {
    $stateProvider
      .state('eventList', {
        redirectTo: 'home',
        parent: 'app',
        url: '^/events',
        component: 'eventList',
        resolve: {
          eventList: function(EventService) {
            return EventService.list();
          }
        }
      });
  });
