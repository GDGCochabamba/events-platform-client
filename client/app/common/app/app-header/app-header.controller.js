function AppHeaderController($log, $state, $stateParams, AuthService, $mdToast) {
    var ctrl = this;
    ctrl.logout = function () {
        AuthService.logout().then(function () {
            ctrl.profileData = null;
        }).catch(function (error) {
            console.log(error);
        });
    }
    ctrl.$onInit = function () {
        AuthService.getCurrentUserProfile()
            .then(function (profileData) {
                console.log(profileData);
                ctrl.profileData = profileData;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

angular
    .module('common.app')
    .controller('AppHeaderController', AppHeaderController);