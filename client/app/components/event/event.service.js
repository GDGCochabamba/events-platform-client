function EventService($log, $firebaseArray, $firebaseObject, $q, AuthService) {
  var refEventList = firebase.database().ref().child('events'),
    refEventAttendees = firebase.database().ref().child('eventAttendees'),
    list = $firebaseArray(refEventList),
    obj,
    profilesRef = firebase.database().ref().child('profiles');
  var service = {
    getByKey: getByKey,
    list: getList,
    getBySlug: getBySlug,
    addAttendeeToEvent: addAttendeeToEvent
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

  /**
   * Add an Attendee to an Event
   *
   * This function could be implemented in a controller like this.
   * EventService.addAttendeeToEvent('-KcAdnjmc9KUI8j2qDG0', '7FFO5VnuygMVW9nxRtBJEbdJ2O13');
   *
   * @param {string} uidEvent - UID of event.
   * @param {string} uidAttendee - UID of Attendee.
   * @return {void}
   */
  function addAttendeeToEvent(uidEvent, uidAttendee) {
    var deferred = $q.defer();
    // Create a firebase object using the reference eventAttendees collection and Event UID.
    var attendee = $firebaseObject(refEventAttendees.child(uidEvent).child(uidAttendee));
    // Add attendee to the attende object
    // We could use here something like this: attende[uidAttendee] = { resources: 1, assisted: 1 }    
    // Save attendee informartion
    attendee
      .$loaded()
      .then(function(response) {
        if ( !response.status ) {
          attendee.status = 'pending';
          attendee.paymentMethod = 'cash';
          attendee.$save().then(function (result) {
            deferred.resolve(result);
          }).catch(function (err) {
            deferred.reject(err);
          });  
        } else {
          deferred.resolve(true);
        }        
      })
      .catch(function (err) {
        deferred.reject(err);
      });
    
    return deferred.promise;
  }

}

angular
  .module('components.event')
  .factory('EventService', EventService);