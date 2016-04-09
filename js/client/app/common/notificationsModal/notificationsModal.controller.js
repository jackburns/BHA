class NotificationsModalController {
  constructor($scope, $state, $uibModalInstance, $http, volunteerList, Enums) {
    $scope.allVolunteers = volunteerList;
    $scope.selectedVolunteers = [];
    $scope.notificationMessage = "There is a new appointment for you from the BHA.";
    $scope.notificationSubject = "Alert from BHA";
    $scope.emailAll = false;

    // get the list of selected volunteers
    $scope.allVolunteers.forEach(function(volunteerObj) {
      var vContact = volunteerObj.contact;
      var emailStart = Enums.carriers[vContact.carrier] === "Other" || Enums.preferred_contact[vContact.preferred_contact] != "Text";
      var newObj = {
        id: volunteerObj.id,
        fullName: volunteerObj.first_name + ' ' + volunteerObj.last_name,
        phoneNumber: vContact.phone_number,
        carrier: vContact.carrier,
        email: vContact.email,
        showEmail: emailStart,
        onlyEmail: emailStart
      };

      $scope.selectedVolunteers.push(newObj);
    });

    // removes the given volunteer from the given list
    $scope.removeFromTable = function(volunteer) {
      var index = $scope.selectedVolunteers.indexOf(volunteer);
      $scope.selectedVolunteers.splice(index, 1);
    };

    $scope.updateEmailAll = function() {
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

    $scope.getPostObject = function() {
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
            carrier: Enums.carriers[volunteerObj.carrier]
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
      var postObject = $scope.getPostObject();

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

NotificationsModalController.$inject = ["$scope", "$state", "$uibModalInstance", "$http", "volunteerList", "Enums"];

export default NotificationsModalController;