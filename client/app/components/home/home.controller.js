function HomeController($state) {

  this.$onInit = function() {
    $state.go('eventDetail', {eventSlug: 'international-womens-day-2017'})
  }

}

angular
  .module('components.home')
  .controller('HomeController', HomeController);