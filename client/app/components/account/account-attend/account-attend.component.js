var accountAttend = {
  bindings: {
    events: '<'
  },
  templateUrl: 'account-attend.html',
  controller: 'AccountAttendController'
}

angular
  .module('components.account')
  .component('accountAttend', accountAttend)
  .config(function($stateProvider) {
    $stateProvider
      .state('accountAttend', {
        parent: 'account',
        url: '/attend-iwd2017',
        component: 'accountAttend',
        resolve: {
          events : function(AccountService) {
            return AccountService.getEvents();
          }
        }
      });
  });