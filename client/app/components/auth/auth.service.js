function AuthService($firebaseAuth, $q, $firebaseObject) {
  var auth = $firebaseAuth(),
    authData = null;
  var profileRef = firebase.database().ref().child('profiles')
  function storeAuthData(firebaseUser) {
    authData = firebaseUser;
    sessionStorage.authData = angular.toJson(firebaseUser);
    console.log(sessionStorage);
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
    var deferred = $q.defer();
    auth.$signOut().then(function() {
      console.log('Signed out');
      clearAuthData();
      deferred.resolve('Signed out');
    }).catch(function(error) {
      console.log('Error signing out:', error);
      deferred.reject(error);
    });
    return deferred.promise;
  }

  this.checkAuth = function () {
    return auth
      .$requireSignIn()
      .then(storeAuthData);
  }

  this.isLogged = function () {
    return !!this.getUserData();
  }

  this.getUserData = function () {
    var storedAuthData = angular.fromJson(sessionStorage.authData);
    if (storedAuthData) {
      authData = storedAuthData;
    };
    return authData;
  }

  this.getCurrentUserProfile = function() {
    var deferred = $q.defer();
    var authData = this.getUserData();
    if (authData) {
      var obj = $firebaseObject(profileRef.child(authData.uid));
        obj.$loaded().then(function (response) {
            deferred.resolve(response);
        }, function (error) {
            deferred.reject(error);
        });
    } else {
      deferred.reject('user not logged in.');
    }
    return deferred.promise;
  }

  this.resetPassword = function () {
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