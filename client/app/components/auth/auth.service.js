function AuthService($firebaseAuth) {
  var auth = $firebaseAuth(),
    authData = null;

  function storeAuthData(firebaseUser) {
    authData = firebaseUser;
    return firebaseUser;
  }

  function clearAuthData() {
    authData = null;
  }

  this.login = function(email, password) {
    return auth
      .$signInWithEmailAndPassword(email, password)
      .then(storeAuthData);
  }

  this.logout = function() {
    return auth
      .$signOut()
      .then();
  }  

  this.checkAuth = function() {
    return auth
      .$requireSignIn()
      .then(storeAuthData);
  }

  this.isLogged = function() {
    return !!authData;
  }

  this.getUserData = function() {
    return authData;
  }
}

angular
  .module('components.auth')
  .service('AuthService', AuthService);