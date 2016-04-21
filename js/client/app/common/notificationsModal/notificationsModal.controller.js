class NotificationsModalController {
  constructor($scope, $state, $uibModalInstance, $http, volunteerList, Enums) {
    $scope.allVolunteers = volunteerList;
    $scope.selectedVolunteers = [];
    $scope.notificationMessage = "There is a new appointment for you from the BHA.";
    $scope.notificationTextMessage = "There is a new appointment for you from the BHA.";
    $scope.notificationSubject = "Alert from BHA";
    $scope.contactMethodAll = "";
    $scope.contactMethods = ["Email", "Text"];
    $scope.notificationsSent = false;
    $scope.error = false;

    // get the list of selected volunteers
    $scope.allVolunteers.forEach(function(volunteerObj) {
      var vContact = volunteerObj.contact;
      var noTexting = Enums.carriers[vContact.carrier] === "Other";
      var contact;
      if (noTexting || Enums.preferred_contact[vContact.preferred_contact] != "Text") {
        contact = "Email";
      } else {
        contact = "Text";
      }
      var newObj = {
        id: volunteerObj.id,
        fullName: volunteerObj.first_name + ' ' + volunteerObj.last_name,
        phoneNumber: vContact.phone_number,
        carrier: vContact.carrier,
        email: vContact.email,
        contactMethod: contact,
        onlyEmail: noTexting
      };

      $scope.selectedVolunteers.push(newObj);
    });

    // removes the given volunteer from the given list
    $scope.removeFromTable = function(volunteer) {
      var index = $scope.selectedVolunteers.indexOf(volunteer);
      $scope.selectedVolunteers.splice(index, 1);
    };

    $scope.updateAllContactMethods = function() {
      $scope.selectedVolunteers.forEach(function (volunteer) {
        if (!volunteer.onlyEmail) {
          volunteer.contactMethod = $scope.contactMethodAll;
        }
      });
    }

    $scope.getPostObject = function() {
      var selectedEmails = [];
      var selectedTexts = [];

      $scope.selectedVolunteers.forEach(function(volunteerObj) {
        if (volunteerObj.contactMethod === 'Email') {
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
        textMessage: $scope.notificationTextMessage,
        emails: selectedEmails,
        texts: selectedTexts
      };
    };

    // send list of volunteer IDs to the back end
    $scope.sendNotifications = function() {
      var postObject = $scope.getPostObject();

      $http.post(api + '/notify/', postObject).then(
        function(response) {
          console.log(response);
          $uibModalInstance.close();
          $scope.notificationsSent = true;
        },
        function(error) {
          console.log(error);
          $scope.error = true;
        });
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}

NotificationsModalController.$inject = ["$scope", "$state", "$uibModalInstance", "$http", "volunteerList", "Enums"];

export default NotificationsModalController;