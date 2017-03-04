function EventController($log, $state, $stateParams, EventService) {
  var ctrl = this;

  ctrl.$onInit  = onInit;
  ctrl.view = view;

  function view() {
      $log.info('Going to view event', ctrl.event);
      EventService.update(ctrl.event).then(function(ref){
        $state.go('event.eventList');
      });
  }

  function onInit() {
      ctrl.key = $stateParams.keyEvent;

      EventService.getByKey(ctrl.key).then(function(event){
        $log.info('[EventController]', 'event on init: ', event);
        ctrl.event = event;
      });
  }
}

angular
  .module('components.event')
  .controller('EventController', EventController);
