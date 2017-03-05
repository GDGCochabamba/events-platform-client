var eventDetail = {
  bindings: {
    event: '<'
  },
  templateUrl: 'event-detail.html',
  controller: 'EventDetailController'
}

angular
  .module('components.event')
  .component('eventDetail', eventDetail)
  .config(function($stateProvider) {
    $stateProvider
      .state('eventDetail', {
        parent: 'app',
        url: '^/:eventId',
        params: {
          eventId: null
        },
        component: 'eventDetail',
        resolve: {
          event: function(EventService, $transition$) {
            var eventId = $transition$.params().eventId;            
            return EventService.getByKey(eventId);
          }
        }
      });
  });