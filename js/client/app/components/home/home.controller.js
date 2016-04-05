import _ from 'lodash';
import notificationsModalTemplate from './notificationsModal.html'
import NotificationsModalController from './notificationsModal.controller'

class HomeController {
  constructor($state, $uibModal) {
    
    //TODO: Delete function once GET /volunteers/ API is set up
    let makeVolunteer = function(id, firstName, lastName, languages, email, phoneNum, preferredContact, carrier) {
      return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        languages: languages,
        selectedToNotify: false,
        email: email,
        phoneNum: phoneNum,
        preferredContact: preferredContact,
        carrier: carrier
      };
    };

    let getVolunteers = function() {
      //TODO: Replace with API call to GET /volunteers/
      return [
        makeVolunteer(0, 'Bill', 'Brown', ['German'], 'bill@brown.com', '6172228374', 'Text', 'Verizon'),
        makeVolunteer(1, 'Ellie', 'White', ['Portuguese, Spanish'], 'ellie@white.com', '6172328374', 'Text', 'Other'),
        makeVolunteer(3, 'Tom', 'Jones', ['Spanish', 'French'], 'tom@jones.com', '6182228374', 'Email', 'Sprint')
      ];
    };

    let getAllLanguages = function() {
      //TODO: Replace with API call
      return ['Spanish', 'German', 'French', 'Portuguese'];
    };

    let viewVolunteer = function(volunteerId) {
      $state.go('volunteer', {volunteerId: volunteerId.toString()});
    };

    let getNumberSelected = () => {
      return _.filter(this.volunteers, {selectedToNotify: true}).length;
    };

    this.updateOrder = function(ordering) {
      this.isReverseOrder = (this.ordering === ordering) ? !this.isReverseOrder : false;
      this.ordering = ordering;
    };

    this.selectAll = function() {
      _.forEach(this.volunteers, (volunteer) => {
        volunteer.selectedToNotify = this.willSelectAll;
      });
      this.numberSelected = getNumberSelected();
    };

    this.updateNumberSelected = function() {
      this.numberSelected = getNumberSelected();
      this.willSelectAll = this.numberSelected === this.volunteers.length;
    };

    this.allLanguages = getAllLanguages();

    this.ordering = 'lastName';
    this.isReverseOrder = false;
    this.volunteers = getVolunteers();
    this.viewVolunteer = viewVolunteer;
    this.updateNumberSelected();
    
    // modal stuff
    this.openNotificationsModal = function(volunteerList) {
      var modalInstance = $uibModal.open({
        animation: true,
        template: notificationsModalTemplate,
        controller: NotificationsModalController,
        size: 'md',
        resolve: {
          volunteerList: function() {
            return volunteerList;
          }
        }
      });
    };
    
    this.getCheckedVolunteers = function() {
      var checked = [];
      this.volunteers.forEach(function(volunteerObj) {
        if (volunteerObj.selectedToNotify) {
          checked.push(volunteerObj);
        }
      });

      return checked;
    }
  }
}

HomeController.$inject = ["$state", "$uibModal"];

export default HomeController;
