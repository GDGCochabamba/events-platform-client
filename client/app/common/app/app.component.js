var app = {
  template: `
    <h1>GDG Cochabamba</h1>
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