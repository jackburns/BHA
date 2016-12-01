import _ from 'lodash';
import moment from 'moment';

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

    this.setHoursSearch = (search) => {
      if (search === 'year') {
        this.search.hours_starting_at = moment().startOf('year');
        this.search.hours_ending_at = moment();
      }
      else if (search === 'month') {
        this.search.hours_starting_at = moment().startOf('month');
        this.search.hours_ending_at = moment();
      }
      else if (search === 'week') {
        this.search.hours_starting_at = moment().startOf('week');
        this.search.hours_ending_at = moment();
      }
      else if (search === 'last year') {
        this.search.hours_starting_at = moment().subtract(1, 'year').startOf('year');
        this.search.hours_ending_at = moment().subtract(1, 'year').endOf('year');
      }
      else if (search === 'last month') {
        this.search.hours_starting_at = moment().subtract(1, 'month').startOf('month');
        this.search.hours_ending_at = moment().subtract(1, 'month').endOf('month');
      }
      else if (search === 'last week') {
        this.search.hours_starting_at = moment().subtract(1, 'week').startOf('week');
        this.search.hours_ending_at = moment().subtract(1, 'week').endOf('week');
      }
      this.search.hours_starting_at = this.search.hours_starting_at.toDate();
      this.search.hours_ending_at = this.search.hours_ending_at.toDate();
      this.getVolunteers();
    };

    this.ordering = 'last_name';
    this.isReverseOrder = false;
    this.volunteers = [];
    this.search = {
      first_name: '',
      last_name: '',
      language: '',
      can_write: '',
      hours_starting_at: '',
      hours_ending_at: ''
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
