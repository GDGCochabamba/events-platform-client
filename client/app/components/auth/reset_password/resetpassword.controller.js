function ResetPasswordController($log, $state, $stateParams, AuthService, $mdToast) {
    var ctrl = this;
    ctrl.resetPassword = resetPassword;
    ctrl.$onInit = function () {
        ctrl.userData = {
            email: '',
        };
    }

    function resetPassword() {
        console.log(ctrl.userData.email);
        AuthService
            .resetPassword(ctrl.userData.email)
            .then(function (e) {
                showToast('En breve recibiras un email con las instrucciones para recuperar tu contraseña.');
                $state.go('login');
            }).catch(function (error) {
                console.log(error);
                showToast('Error, por favor verifica que el email sea correcto.');
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
    .module('components.auth')
    .controller('ResetPasswordController', ResetPasswordController);