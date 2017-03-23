function ProfileService($log, $firebaseArray, $firebaseObject, $firebaseAuth, $q, AuthService) {
    var ref = firebase.database().ref().child('profiles'),
        list = $firebaseArray(ref);

    var service = {
        add: add,
        createProfile: createProfile,
        getByKey: getByKey,
        edit: edit,
        getCurrentUserProfile: getCurrentUserProfile,
        resetPassword: resetPassword
    };

    return service;

    function add(profile) {
        var deferred = $q.defer();
        var user = $firebaseAuth().$createUserWithEmailAndPassword(profile.email, profile.password).then(function (authData) {
            var fprofile = $firebaseObject(ref.child(authData.uid));
            fprofile.firstName = profile.firstName;
            fprofile.lastName = profile.lastName;
            fprofile.birthDate = "";
            fprofile.phone = "";
            fprofile.gender = "";
            fprofile.email = profile.email;
            fprofile.$save().then(function (result) {
                deferred.resolve(result);
            }).catch(function (err) {
                deferred.reject(err);
            });
        });
        return deferred.promise;
    }

    function edit(key, profile) {
        var deferred = $q.defer();
        $firebaseObject(ref.child(key)).$loaded().then(function(fprofile) {            
            fprofile.firstName = profile.firstName;
            fprofile.lastName = profile.lastName;
            fprofile.birthDate = profile.birthDate;
            fprofile.phone = profile.phone;
            fprofile.gender = profile.gender;
            fprofile.$save().then(function (result) {
                deferred.resolve(result);
            }).catch(function (err) {
                deferred.reject(err);
            });
        }).catch(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    }

    function getByKey(key) {
        var deferred = $q.defer();
        var obj = $firebaseObject(ref.child(key));
        obj.$loaded().then(function (response) {
            deferred.resolve(response);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function getCurrentUserProfile() {
        return AuthService.getCurrentUserProfile();
    }

    function resetPassword() {
        var deferred = $q.defer();
        var authData = $firebaseAuth().$getAuth();
        if (authData) {
            $firebaseAuth().$sendPasswordResetEmail(authData.email).then(function() {
            // Email sent.
                deferred.resolve(authData)
            }, function(error) {
            // An error happened.
                deferred.reject('Error while reseting password.');
            });
        } else {
            deferred.reject('user not logged in.');
        }
        return deferred.promise;
    }

    function createProfile(user, authData) {
        var profileRef = $firebase(ref.child('profile'));
        return profileRef.$set(authData.uid, user);
    };
}

angular
    .module('components.auth')
    .factory('ProfileService', ProfileService);