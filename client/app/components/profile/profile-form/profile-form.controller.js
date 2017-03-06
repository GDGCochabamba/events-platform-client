function ProfileFormController($log, ProfileService) {
  var ctrl = this;

  ctrl.$onInit  = onInit;
  ctrl.doAction = doAction;

  function onInit() {

  }

  function doAction() {
      ctrl.onAction();
  }
}

angular
  .module('components.profile')
  .controller('ProfileFormController', ProfileFormController);
