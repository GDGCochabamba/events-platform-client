function LoginController($rootScope, $log, $state, $stateParams, AuthService, $mdToast) {
    var ctrl = this;
    ctrl.resetPassword = resetPassword;
    ctrl.login = login;
    ctrl.$onInit = function () {
        ctrl.userData = {
            email: '',
            password: ''
        };
    }

    function login() {
        AuthService
            .login(ctrl.userData.email, ctrl.userData.password)
            .then(function (e) {
                $state.go('accountAttend');
                $rootScope.$emit('updateHeaderInfo');
            }).catch(function (error) {
                console.log(error);
                showToast('Error, por favor verifica tu email y password.');
            });
    }

    function resetPassword() {
        $state.go('resetPassword');
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
    .module('components.login')
    .controller('LoginController', LoginController);