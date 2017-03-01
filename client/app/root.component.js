var root = {
  template:`
    <div ui-view></div>
  `
}

angular
  .module('eventsPlatformClient')
  .component('root', root);