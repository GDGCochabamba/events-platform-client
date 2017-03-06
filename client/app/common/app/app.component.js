var app = {
  template: `
    <div class="align" >
      <h1>GDG Cochabamba</h1>
      <div ui-view></div> 
    </div>
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