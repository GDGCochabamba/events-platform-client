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
        url: '^/:eventSlug',
        params: {
          eventSlug: null
        },
        component: 'eventDetail',
        resolve: {
          event: function(EventService, $transition$) {
            var eventSlug = $transition$.params().eventSlug;
            return EventService.getBySlug(eventSlug);
          }
        }
      });
  });