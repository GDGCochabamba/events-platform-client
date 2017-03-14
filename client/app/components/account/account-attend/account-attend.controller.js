function AccountAttendController(cfpLoadingBar, $state, $scope, AccountService, AuthService) {

  var ctrl = this;
  var eventId = '-KeMOcNxFy30UdXC-UsA'; // we need to remove this after IWD

  ctrl.$onInit = onInit;
  ctrl.changePaymentMethod = changePaymentMethod;

  function onInit() {    
    ctrl.user = AuthService.getUserData();
    AccountService
      .getEventInformation(eventId, ctrl.user.uid)
      .then(function(event) {
        if ( !event.status ) {
          $state.go('eventDetail', { eventSlug: 'international-womens-day-2017' });
        }
        ctrl.event = event;

        ctrl.event.status = ctrl.event.status == 'pending' ? 'Por confirmar' : 'Confirmado';
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function changePaymentMethod() {
    cfpLoadingBar.start();    
    AccountService
      .changePaymentMethod(eventId, ctrl.user.uid, ctrl.event.paymentMethod)
      .then(function(response) {
        cfpLoadingBar.complete();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  $scope.uploadImage = _uploadImage;

  function _uploadImage(fileInput) {
    var userData;

    cfpLoadingBar.start();    

    AccountService
      .uploadImage(fileInput.files[0], eventId, ctrl.user.uid)
      .then(function() {
        cfpLoadingBar.complete();
      });
      
  }

}

angular
  .module('components.account')
  .controller('AccountAttendController', AccountAttendController);