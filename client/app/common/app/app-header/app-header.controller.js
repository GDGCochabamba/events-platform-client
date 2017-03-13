function AppHeaderController($rootScope, $log, $state, $stateParams, AuthService, $mdToast) {
    var ctrl = this;
    ctrl.logout = function () {
        AuthService.logout().then(function () {
            ctrl.profileData = null;
            $state.go('home');
        }).catch(function (error) {
            console.log(error);
        });
    }
    ctrl.$onInit = function () {
      updateHeaderInfo();
    }

    function updateHeaderInfo() {
      AuthService
        .getCurrentUserProfile()
        .then(function (profileData) {
            console.log(profileData);
            console.log('from profile section');
            ctrl.profileData = profileData;
        })
        .catch(function (error) {
          console.log('error from profile section');
            console.log(error);
        });
    }

    $rootScope.$on('updateHeaderInfo', updateHeaderInfo);

}

angular
    .module('common.app')
    .controller('AppHeaderController', AppHeaderController);