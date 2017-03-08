var app = {
  template: `
    <app-header></app-header>
    <div ui-view></div> 
  `
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