import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import bootstrap from 'angular-ui-bootstrap';
import Restangular from 'restangular';
import ngStorage from 'ng-storage';

angular.module('app', [
    uiRouter,
    Common.name,
    Components.name,
    'restangular',
    'ngStorage'
  ])
  .config(['$locationProvider', 'RestangularProvider', ($locationProvider, RestangularProvider) => {
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
    // injected global variable from webpack
    RestangularProvider.setBaseUrl(api);
  }])
  .run(['$rootScope', '$state', 'User', '$localStorage', ($rootScope, $state, User, $localStorage) => {
    console.log(User.isSignedIn());
    console.log($localStorage.djangotoken);

    if (!User.isSignedIn() && $localStorage.djangotoken) {
      User.signIn('home');
    }

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
     if (!User.isSignedIn()) {
        $state.go("/login");
     }
   });
 }])
 .component('app', AppComponent);
