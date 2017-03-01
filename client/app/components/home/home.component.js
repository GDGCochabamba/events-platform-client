var home = {
  templateUrl: 'home.html'
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