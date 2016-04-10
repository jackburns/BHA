import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import uiBootstrap from 'angular-ui-bootstrap';
import Restangular from 'restangular';
import ngStorage from 'ng-storage';

angular.module('app', [
    uiRouter,
    Common.name,
    Components.name,
    'restangular',
    'ngStorage',
    uiBootstrap
  ])
  .config(['$locationProvider', 'RestangularProvider', ($locationProvider, RestangularProvider) => {
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
    // injected global variable from webpack
    RestangularProvider.setBaseUrl(api);
  }])
  .run(['$rootScope', '$state', 'User', '$localStorage', ($rootScope, $state, User, $localStorage) => {

    let anonStates = [
      'login',
      'volunteerApplication'
    ];
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams) {

      // If user isnt signed in BUT we have auth token, sign in and then redirect
      // Else redirect to login page
      if (!User.isSignedIn() && $localStorage.djangotoken) {
        event.preventDefault();
        User.signIn(toState.name);
      } else if (!User.isSignedIn() && !_.includes(anonStates, toState.name)) {
        event.preventDefault();
        $state.go('login');
      }
   });
 }])
 .component('app', AppComponent);
