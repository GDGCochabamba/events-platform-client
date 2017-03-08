var header = {
  templateUrl: 'header.html',
  controller: 'HeaderController'
}

angular
  .module('components.header')
  .component('appHeader', header);