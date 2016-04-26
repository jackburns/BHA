import _ from 'lodash';

class VolunteerSearchController {
  constructor($state, Requests, Modals, Enums) {

    this.getVolunteers = () => {
      Requests.getVolunteers(this.search, (volunteers) => {
        this.volunteers = volunteers;
      });
    };

    let viewVolunteer = function(volunteerId) {
      $state.go('volunteer', {volunteerId: volunteerId.toString()});
    };

    let getNumberSelected = () => {
      if(this.volunteers) {
        return _.filter(this.volunteers, {selectedToNotify: true}).length
      } else {
        return 0;
      }
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
      this.willSelectAll = this.volunteers && this.numberSelected === this.volunteers.length ;
    };

    this.getLanguagesDisplay = (languages) => {
      let result = '';
      _.forEach(languages, (language) => {
        result += Enums.languages[language.language_name] + ', ';
      });
      return result.substr(0, result.length - 2);
    };

    this.ordering = 'last_name';
    this.isReverseOrder = false;
    this.volunteers = [];
    this.search = {
      first_name: '',
      last_name: '',
      language: '',
      can_write: false
    };
    this.getVolunteers();
    this.viewVolunteer = viewVolunteer;
    this.updateNumberSelected();
    this.willSelectAll = false;

    this.openNotificationsModal = Modals.openNotifications;

    this.getCheckedVolunteers = function() {
      return _.filter(this.volunteers, {selectedToNotify: true});
    }
  }
}

VolunteerSearchController.$inject = ["$state", "Requests", "Modals", "Enums"];

export default VolunteerSearchController;
