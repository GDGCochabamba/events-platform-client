var app = {
  templateUrl: 'app.html'
}

angular
  .module('common.app')
  .component('app', app)
  .config(function($stateProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        component: 'app'
      });
  });