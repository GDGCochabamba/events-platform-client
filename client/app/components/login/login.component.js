var login = {
  templateUrl: 'login.html'
}

angular
  .module('components.login')
  .component('login', login)
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        parent:'app',
        url: '^/login',
        component: 'login'
      });
  });
