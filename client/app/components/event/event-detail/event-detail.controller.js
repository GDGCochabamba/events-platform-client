function EventDetailController($log, $state, $stateParams, EventService) {
  var ctrl = this;
  ctrl.view = view;
console.log($state.get());
  function view() {
    $log.info('Going to view event', ctrl.event);
    EventService.update(ctrl.event).then(function(ref){
      $state.go('event.eventList');
    });
  }
}

angular
  .module('components.event')
  .controller('EventDetailController', EventDetailController);
