import angular from 'angular';
import uiRouter from 'angular-ui-router';
import volunteerComponent from './volunteer.component';

let volunteerModule = angular.module('volunteer', [
  uiRouter
])

.config(['$stateProvider', ($stateProvider) => {
  console.log($stateProvider);
  $stateProvider.state('volunteer', {
    url: '/volunteers/:volunteerId',
    controller: ['$scope', 'volunteer', ($scope, volunteer) => {
      $scope.$resolve = {volunteer};
    }],
    template: '<volunteer volunteer="$resolve.volunteer"></volunteer>',
    resolve: {
      volunteer: ['$http', '$stateParams', ($http, $stateParams) => {
        console.log($stateParams);
        if($stateParams.volunteer) {
          return volunteer
        } else {
          return $http.get(api + '/volunteers/' + $stateParams.volunteerId + '/').then((res) => {
            return res.data;
          }, (error) =>{
            console.log(error);
          });
        }
      }]
    }
  });
}])

.component('volunteer', volunteerComponent);

export default volunteerModule;
