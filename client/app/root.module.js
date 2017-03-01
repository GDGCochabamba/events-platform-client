angular
  .module('eventsPlatformClient', [
    'common',
    'components',
    'ui.router',
    'templates',
    'ngMaterial'
  ])
  .config(function($mdThemingProvider, $urlRouterProvider, $locationProvider) {

    var primaryPalette = $mdThemingProvider.extendPalette('blue', {
      '400': '#0177c1'
    });

    var accentPalette = $mdThemingProvider.extendPalette('yellow', {
      '400': '#ffc107'
    });

    var warnPalette = $mdThemingProvider.extendPalette('yellow', {
      '400': '#ff6e6e'
    });

    $mdThemingProvider.definePalette('primaryPalette', primaryPalette);
    $mdThemingProvider.definePalette('accentPalette', accentPalette);
    $mdThemingProvider.definePalette('warnPalette', warnPalette);

    $mdThemingProvider.theme('default')
      .primaryPalette('primaryPalette', {
        'default': '400'
      })
      .accentPalette('accentPalette', {
        'default': '400'
      })
      .warnPalette('warnPalette', {
        'default': '400'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

  });