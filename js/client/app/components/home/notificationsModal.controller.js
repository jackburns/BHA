class NotificationsModalController {
  constructor($scope, $state, $uibModalInstance, items, $http) {
    $scope.items = items;
    $scope.notificationMessage = "There is a new appointment for you from the BHA.";
    
    $scope.emailVolunteers = [{
      firstName: "John",
      lastName: "Smith",
      email: "jon@smith.com"
    }, {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@smith.com"
    }];
    
    $scope.textVolunteers = [{
      id: 1,
      firstName: "Bob",
      lastName: "Guy",
      phoneNumber: "6179672390"
    }, {
      id: 2,
      firstName: "Rob",
      lastName: "Guy",
      phoneNumber: "6152738293"
    }, {
      id: 3,
      firstName: "Sally",
      lastName: "Gal",
      phoneNumber: "6152118293"
    }];
    
    var getVolunteerEmails = function() {
      var emails = [];
      $scope.emailVolunteers.forEach(function(volunteer) {
        emails.push(volunteer.email);
      });
      
      return emails;
    };
    
    var getVolunteerPhoneNums = function() {
      var phoneNums = [];
      $scope.textVolunteers.forEach(function(volunteer) {
        phoneNums.push({id: volunteer.id, phoneNumber: volunteer.phoneNumber});
      });
      
      return phoneNums;
    };

    // removes the given volunteer from the given list
    $scope.removeFromTable = function(volunteerList, volunteer) {
      var index = volunteerList.indexOf(volunteer);
      volunteerList.splice(index, 1);
    };
    
    
    $scope.sendNotifications = function() {
      $uibModalInstance.close();
      
      var postObject = {
        message: $scope.notificationMessage,
	emails: getVolunteerEmails(),
	texts: getVolunteerPhoneNums()
      };
      
      console.log(postObject);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}

NotificationsModalController.$inject = ["$scope", "$state", "$uibModalInstance", "items", "$http"];

export default NotificationsModalController;
