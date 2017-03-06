function LoginController($log, $state, $stateParams, AuthService, $mdToast) {
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
                $state.go('home');
            }).catch(function (error) {
                console.log(error);
                showToast('Error, por favor verifica tu email y password.');
            });
    }

    function resetPassword() {
        AuthService
            .resetPassword(ctrl.userData.email)
            .then(function (e) {
                showToast('En breve recibiras un email con las instrucciones para recuperar tu contraseña.');
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
    .module('components.login')
    .controller('LoginController', LoginController);