var auth = {
  template: '<div ui-view></div>'
}

angular
  .module('components.auth')
  .component('auth', auth)
  .config(function($stateProvider) {
    $stateProvider
      .state('auth', {
        redirectTo: 'auth.login',
        url: '/auth',
        component: 'auth'
      });
  });