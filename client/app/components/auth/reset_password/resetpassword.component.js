var resetPassword = {
  templateUrl: 'resetpassword.html',
  controller: 'ResetPasswordController'
}

angular
  .module('components.auth')
  .component('resetPassword', resetPassword)
  .config(function($stateProvider) {
    $stateProvider
      .state('resetPassword', {
        parent:'app',
        url: '^/resetPassword',
        component: 'resetPassword'
      });
  });
