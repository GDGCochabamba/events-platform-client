var addProfile = {
  bindings: {
  },
  templateUrl: 'add-profile.html',
  controller: 'AddProfileController'
}

angular
  .module('components.profile')
  .component('addProfile', addProfile)
  .config(function($stateProvider) {
    $stateProvider
      .state('register', {
        parent:'app',
        url: '^/register',
        component: 'addProfile'
      }); 
  });