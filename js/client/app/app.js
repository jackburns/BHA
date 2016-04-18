import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import uiBootstrap from 'angular-ui-bootstrap';
import Restangular from 'restangular';
import ngStorage from 'ng-storage';

let app = angular.module('app', [
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

    // level > 5 means only admin access
    let statePermissions = [
      {name: 'volunteerSearch', level: 6},
      {name: 'assignment', level: 1}
    ];

    let anonStates = [
      'login',
      'volunteerApplication',
      'resetPassword',
      'resetPasswordUpdate'
    ];

    let isAnonState = (toStateName) => {
      return _.includes(anonStates, toStateName);
    }

    let isValidPermissions = (toStateName) => {
      let userLevel = User.getLevel();
      let state = _.find(statePermissions, (state) => {
        return toStateName === state.name;
      });
      if(state) {
        return userLevel >= state.level;
      } else {
        return true;
      }
    }

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams) {
      if (!User.isSignedIn()) {
        console.log('not signed in');
        // If user isnt signed in BUT we have auth token, sign in and then redirect
        if($localStorage.djangotoken) {
          console.log('token');
          event.preventDefault();
          User.signIn(() => {
            $state.go(toState, toParams);
          });
        // Check for Anon State
        } else if(!isAnonState(toState.name)) {
          console.log('not anon');
          event.preventDefault();
          $state.go('login');
        }
      // Else check state permissions
      } else if(!isValidPermissions(toState.name)){
        console.log('not valid permissions');
        event.preventDefault();
        $state.go('home');
      }
   });
 }])
 .component('app', AppComponent);
