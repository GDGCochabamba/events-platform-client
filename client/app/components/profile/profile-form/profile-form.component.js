var profileForm = {
	bindings: {
	    profile: '<',
	    submitText: '@',
	    onAction: '&',
			showUserFields: '='
	},
	templateUrl: 'profile-form.html',
	controller: 'ProfileFormController'
}

angular
  .module('components.profile')
  .component('profileForm', profileForm);