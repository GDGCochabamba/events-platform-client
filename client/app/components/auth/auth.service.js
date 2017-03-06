function AuthService($firebaseAuth, $q) {
  var auth = $firebaseAuth(),
    authData = null;

  function storeAuthData(firebaseUser) {
    authData = firebaseUser;
    return firebaseUser;
  }

  function clearAuthData() {
    authData = null;
  }

  this.login = function (email, password) {
    return auth
      .$signInWithEmailAndPassword(email, password)
      .then(storeAuthData);
  }

  this.logout = function () {
    return auth
      .$signOut()
      .then();
  }

  this.checkAuth = function () {
    return auth
      .$requireSignIn()
      .then(storeAuthData);
  }

  this.isLogged = function () {
    return !!authData;
  }

  this.getUserData = function () {
    return authData;
  }

  this.resetPassword = function() {
    var deferred = $q.defer();
    var authData = $firebaseAuth().$getAuth();
    if (authData) {
      $firebaseAuth().$sendPasswordResetEmail(authData.email).then(function () {
        // Email sent.
        deferred.resolve(authData)
      }, function (error) {
        // An error happened.
        deferred.reject('Error while reseting password.');
      });
    } else {
      deferred.reject('user not logged in.');
    }
    return deferred.promise;
  }
}

angular
  .module('components.auth')
  .service('AuthService', AuthService);