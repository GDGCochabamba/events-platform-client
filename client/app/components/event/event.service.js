function EventService($log, $firebaseArray, $firebaseObject, $q, AuthService) {
  var refEventList = firebase.database().ref().child('events'),
    refEventAttendees = firebase.database().ref().child('eventAttendees'),
    list = $firebaseArray(refEventList),
    obj,
    profilesRef = firebase.database().ref().child('profiles');
  var service = {
    getByKey: getByKey,
    list: getList
  };

  return service;

  function getByKey(key) {
    var deferred = $q.defer();

    obj = $firebaseObject(refEventList.child(key));
    obj.$loaded().then(function (response) {
      deferred.resolve(response);
    }, function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  function getList() {
    return $firebaseArray(refEventList);
  }
}

angular
  .module('components.event')
  .factory('EventService', EventService);