import _ from 'lodash';
import notificationsModalTemplate from './../../common/notificationsModal/notificationsModal.html'
import NotificationsModalController from './../../common/notificationsModal/notificationsModal.controller.js'

class HomeController {
  constructor($state, $uibModal, $http, Enums) {
    let getSearchConfig = () => {
      let paramsObj = {};

      // only add queries if we need to
       _.forOwn(this.search, (value, key) => {
        if(value) {
          paramsObj[key] = value;
        }
      });

      let config = {
        params: paramsObj
      };

      return config;
    };

    this.getVolunteers = () => {
      $http.get(api + '/volunteers/', getSearchConfig()
      ).then((res) => {
        this.volunteers = res.data.results;
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

    this.ordering = 'lastName';
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

HomeController.$inject = ["$state", "$uibModal", "$http", "Enums"];

export default HomeController;
