function ViewProfileController($rootScope, $log, $state, $stateParams, ProfileService, $mdToast) {
  var ctrl = this;

  ctrl.$onInit = onInit;
  ctrl.edit = edit;
  ctrl.showEditUserInfo = false;
  ctrl.resetPassword = resetPassword;

  function edit() {
    ProfileService.edit(ctrl.key, ctrl.profile).then(function (ref) {
      showToast('Cambios realizados.');
      var id = ref.key;
      $log.info('[ViewProfileController]', 'edited record with id:', id);
      $state.go('eventDetail', {eventSlug: 'international-womens-day-2017'})
    }).catch(function(error){
      console.log(error);
      showToast('Error.');
    });
  }

  function resetPassword() {
    ProfileService.resetPassword().then(function (result) {
      showToast('En breve recibiras un email con las instrucciones para recuperar tu contraseña.');
    }).catch(function (error) {
      console.log(error);
    });
  }

  function onInit() {
    ProfileService.getCurrentUserProfile().then(function (profile) {
      ctrl.key = profile.$id;
      $log.info('[ViewProfileController]', 'profile on init: ', profile);
      $rootScope.$emit('updateHeaderInfo');
      ctrl.profile = profile;
    }).catch(function (error) {
      console.log(error);
    });
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
  .controller('ViewProfileController', ViewProfileController);