import angular from 'angular';
import uiRouter from 'angular-ui-router';
import assignmentComponent from './assignment.component';

let assignmentModule = angular.module('assignment', [
  uiRouter
])

.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state('assignment', {
    url: '/assignments/:assignmentId',
    controller: ['$scope', 'assignment', ($scope, assignment) => {
      $scope.$resolve = {assignment};
    }],
    template: '<assignment assignment="$resolve.assignment"></assignment>',
    resolve: {
      assignment: ['$http', '$stateParams', ($http, $stateParams) => {
        if($stateParams.assignment) {
          return assignment
        } else {
          return $http.get(api + '/assignments/' + $stateParams.assignmentId + '/').then((res) => {
            return res.data;
          }, (error) =>{
            console.log(error);
          });
        }
      }]
    }
  });
}])

.component('assignment', assignmentComponent);

export default assignmentModule;
