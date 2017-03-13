function EventDetailController($log, $state, $stateParams, $mdDialog, EventService, AuthService) {
  var ctrl = this;
  ctrl.view = view;
  ctrl.isOpen = false; //not sure if this is really working
  ctrl.subscribeToEvent = subscribeToEvent;


  ctrl.$onInit = function () {
    if (!ctrl.event) {
      $state.go('home');
    }

    ctrl.user = AuthService.getUserData();
  }

  function view() {
    $log.info('Going to view event', ctrl.event);
    EventService.update(ctrl.event).then(function (ref) {
      $state.go('event.eventList');
    });
  }

  function subscribeToEvent() {    
    if (ctrl.user) {
      var confirm = $mdDialog.confirm()
          .title('Confirmar asistencia')
          .textContent('¿Asistiras al evento?')
          .ariaLabel('Eventos')
          .ok('Sí')
          .cancel('No');

      $mdDialog.show(confirm).then(function() {
        EventService.addAttendeeToEvent(ctrl.event.$id, ctrl.user.uid);
      });
      
    } else {
      var confirm = $mdDialog.confirm()
          .title('Asistir al evento!')
          .textContent('Debes iniciar sesión para continuar.')
          .ariaLabel('Eventos')
          .ok('Iniciar sesión')
          .cancel('Cerrar');

      $mdDialog.show(confirm).then(function() {
        $state.go('login');
      });
    }
  }
}

angular
  .module('components.event')
  .controller('EventDetailController', EventDetailController);
