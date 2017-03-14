function AccountService($q, $firebaseArray, $firebaseObject, $firebaseStorage) {
  var eventAttendesRef = firebase.database().ref('eventAttendees');
  var imageStorageRef = firebase.storage().ref('images/attendees');

  return {
    getEvents: getEvents,
    uploadImage: uploadImage,
    getEventInformation: getEventInformation,
    changePaymentMethod: changePaymentMethod
  };

  function getEvents() {
    return $firebaseArray(eventAttendesRef).$loaded();
  }

  function getEventInformation(uidEvent, uidAttendee) {
    var deferred = $q.defer();

    $firebaseObject(eventAttendesRef.child(uidEvent).child(uidAttendee))
      .$loaded()
      .then(function (response) {        
        deferred.resolve(response);
      }, function (error) {        
        deferred.reject(error);
      });

    return deferred.promise;
  }

  function changePaymentMethod(uidEvent, uidAttendee, paymentMethod) {
    var deferred = $q.defer();

    var attendee = $firebaseObject(eventAttendesRef.child(uidEvent).child(uidAttendee));

    attendee
      .$loaded()
      .then(function() {

        attendee.paymentMethod = paymentMethod;

        attendee
          .$save()
          .then(function (result) {
            deferred.resolve(result);
          }).catch(function (err) {
            deferred.reject(err);
          });
      });

    return deferred.promise;
  }

  function uploadImage(fileImage, uidEvent, uidAttendee) {
    var storageRef = imageStorageRef.child( uidAttendee + '/' + uidEvent + '/' + fileImage.name );
    var deferred = $q.defer();

    $firebaseStorage(storageRef)
      .$put(fileImage)
      .$complete(function(response) {              
        var attendee = $firebaseObject(eventAttendesRef.child(uidEvent).child(uidAttendee));

        attendee
          .$loaded()
          .then(function() {

            attendee.image = response.downloadURL;

            attendee
              .$save()
              .then(function (result) {
                deferred.resolve(result);
              }).catch(function (err) {
                deferred.reject(err);
              });
          });
      });

    return deferred.promise;
  }

}

angular
  .module('components.account')
  .service('AccountService', AccountService);
