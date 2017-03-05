function EventService($log, $firebaseArray, $firebaseObject, $q, AuthService) {
  var refEventList = firebase.database().ref().child('events'),
    refEventAttendees = firebase.database().ref().child('eventAttendees'),
    list = $firebaseArray(refEventList),
    obj,
    profilesRef = firebase.database().ref().child('profiles');
  var service = {
    getByKey: getByKey,
    list: getList,
    getBySlug: getBySlug
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

  function getBySlug(slug) {
    var deferred = $q.defer();
    var refBySlug = refEventList.orderByChild('slug').equalTo(slug);

    $firebaseArray(refBySlug).$loaded().then(function(response) {
      deferred.resolve(response[0]);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }
}

angular
  .module('components.event')
  .factory('EventService', EventService);