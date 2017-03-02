function EventListController($log, $state, EventService) {
  var ctrl = this;
  ctrl.$onInit  = onInit;

  function onInit() {
    ctrl.list = EventService.list();
  }
}

angular
  .module('components.event')
  .controller('EventListController', EventListController);