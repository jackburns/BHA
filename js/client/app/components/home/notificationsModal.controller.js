class NotificationsModalController {
  constructor($scope, $state, $uibModalInstance, $http, volunteerList) {
    $scope.allVolunteers = volunteerList;
    $scope.selectedVolunteers = [];
    $scope.notificationMessage = "There is a new appointment for you from the BHA.";
    
    // get the list of selected volunteers
    $scope.allVolunteers.forEach(function(volunteerObj) {
      var newObj = {
        fullName: volunteerObj.firstName + ' ' + volunteerObj.lastName,
        contact: ""
      };
      
      if (volunteerObj.selectedToNotify) {
        if (volunteerObj.preferredContact === 'Text' && volunteerObj.carrier != 'Other') {
          newObj['contact'] = volunteerObj.phoneNum;
        } else {
          newObj['contact'] = volunteerObj.email;
        }
        
        $scope.selectedVolunteers.push(newObj);
      }
    });

    // removes the given volunteer from the given list
    $scope.removeFromTable = function(volunteerList, volunteer) {
      var index = volunteerList.indexOf(volunteer);
      volunteerList.splice(index, 1);
    };
    
    var getSelectedIDs = function() {
      var selectedIDs = [];
      $scope.selectedVolunteers.forEach(function(volunteerObj) {
        selectedIDs.push(volunteerObj.id);
      });
      
      return selectedIDs;
    };
    
    // send list of volunteer IDs to the back end
    $scope.sendNotifications = function() {
      $uibModalInstance.close();
      
      var postObject = {
        message: $scope.notificationMessage,
        ids: getSelectedIDs()
      };
      
      console.log(postObject);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}

NotificationsModalController.$inject = ["$scope", "$state", "$uibModalInstance", "$http", "volunteerList"];

export default NotificationsModalController;
