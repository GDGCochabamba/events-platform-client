var app = {
  template: `
    <app-header></app-header>
    <div class="main-container" ui-view></div> 
    <app-footer></app-footer>
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