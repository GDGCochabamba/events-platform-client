function AddProfileController($rootScope, $log, $state, $stateParams, ProfileService, $mdToast) {
  var ctrl = this;

  ctrl.$onInit = onInit;
  ctrl.add = add;

  function add() {
    ProfileService.add(ctrl.profile).then(function (ref) {
      var id = ref.key;      
      showToast('Gracias por registrarse a la plataforma de eventos del GDG Cochabamba');
      $log.info('[AddProfileController]', 'added record with id:', id);
      $state.go('viewProfile');      
    }).catch(function (error) {
      showToast('Error, por favor revisa los datos ingresados.');
    });
  }

  function onInit() {
    ctrl.profile = {
      register: true
    };
  }

  function showToast(message) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(message)
      .hideDelay(2000)
    );
  };
}

angular
  .module('components.profile')
  .controller('AddProfileController', AddProfileController);