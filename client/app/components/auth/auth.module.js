angular
  .module('components.auth', [
    'ui.router'
  ])
  .run(function($transitions, $state, AuthService) {
    $transitions.onStart({
      to: function(state) {        
        return !!(state.data && state.data.requiredAuth);
      }
    }, function() {
      return AuthService
        .checkAuth()
        .catch(function() {
          return $state.target('auth.login');
        });
    });

    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      return AuthService
        .checkAuth()
        .then(function(){
          return $state.target('app');
        })
        .catch(function() {});
    });
  });