var home = {
  templateUrl: 'home.html',
  controller: 'HomeController'
}

angular
  .module('components.home')
  .component('home', home)
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        parent:'app',
        url: '^/',
        component: 'home'
      });
  });