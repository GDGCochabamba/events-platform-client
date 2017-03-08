var appHeader = {
  templateUrl: 'app-header.html',
  controller: 'AppHeaderController'
}

angular
  .module('common.app')
  .component('appHeader', appHeader);