var account = {
  template: '<div ui-view></div>'
}

angular
  .module('components.account')
  .component('account', account)
  .config(function($stateProvider) {
    $stateProvider
      .state('account', {
        parent: 'app',
        url: '^/account',
        component: 'account',
        redirectTo: 'accountAttend'
      });
  });