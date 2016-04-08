class NotificationsModalController {
  constructor($scope, $state, $uibModalInstance, $http, volunteerList) {
    $scope.allVolunteers = volunteerList;
    $scope.selectedVolunteers = [];
    $scope.notificationMessage = "There is a new appointment for you from the BHA.";
    $scope.notificationSubject = "Alert from BHA";

    // get the list of selected volunteers
    $scope.allVolunteers.forEach(function(volunteerObj) {
      console.log(volunteerObj);
      var newObj = {
        id: volunteerObj.id,
        fullName: volunteerObj.first_name + ' ' + volunteerObj.last_name,
        phoneNumber: volunteerObj.contact.phone_number,
        carrier: volunteerObj.contact.carrier,
        email: volunteerObj.contact.email,
        showEmail: volunteerObj.contact.preferred_contact != 1,
        onlyEmail: volunteerObj.contact.carrier === 18 || volunteerObj.contact.preferred_contact != 1
      };

      $scope.selectedVolunteers.push(newObj);
    });

    // removes the given volunteer from the given list
    $scope.removeFromTable = function(volunteerList, volunteer) {
      var index = volunteerList.indexOf(volunteer);
      volunteerList.splice(index, 1);
    };

    $scope.updateEmailAll = function(volunteer) {
      var allForceEmail = true;
      $scope.selectedVolunteers.forEach(function (volunteer) {
        if (!volunteer.showEmail) {
          allForceEmail = false;
        }
      });

      $scope.emailAll = allForceEmail;
    }

    $scope.forceEmailAll = function() {
      $scope.selectedVolunteers.forEach(function (volunteer) {
        volunteer.showEmail = volunteer.onlyEmail || $scope.emailAll;
      });
    }

    var getPostObject = function() {
      var selectedEmails = [];
      var selectedTexts = [];

      $scope.selectedVolunteers.forEach(function(volunteerObj) {
        if (volunteerObj.showEmail) {
          selectedEmails.push({
            id: volunteerObj.id,
            email: volunteerObj.email
          });
        } else {
          selectedTexts.push({
            id: volunteerObj.id,
            phoneNumber: volunteerObj.phoneNumber,
            carrier: volunteerObj.carrier
          });
        }
      });

      return {
        subject: $scope.notificationSubject,
        message: $scope.notificationMessage,
        emails: selectedEmails,
        texts: selectedTexts
      };
    };

    // send list of volunteer IDs to the back end
    $scope.sendNotifications = function() {
      var postObject = getPostObject();
      console.log(postObject);

      $http.post(api + '/notify', postObject).then(
        function(response) {
          console.log(response);
          $uibModalInstance.close();
        },
        function(error) {
          console.log(error);
        });
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}

NotificationsModalController.$inject = ["$scope", "$state", "$uibModalInstance", "$http", "volunteerList"];

export default NotificationsModalController;