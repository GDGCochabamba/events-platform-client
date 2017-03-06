var profile = {
  templateUrl: 'profile.html'
}

angular
  .module('components.profile')
  .component('profile', profile)
  .config(function($stateProvider) {
    $stateProvider
      .state('profile', {
        parent: 'app',
        redirectTo: 'profile.profileList',
        url: '/profile',
        component: 'profile'
      });
  });