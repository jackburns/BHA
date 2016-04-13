import _ from 'lodash'

class VolunteerController {
  constructor($state, $scope, $http, Enums) {

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
      return false;
    }

    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
    }

    const vm = this;

    vm.randomTrueFalse = () => {
      return (Math.floor(Math.random() * 2)) == 0 ? false : true;
    }

    vm.volunteerId = parseInt($state.params.volunteerId);

    vm.getVolunteer = function(volunteerId) {
      $http.get(api + '/volunteers/' + volunteerId.toString() + '/')
      .then((res) => {
        vm.volunteer = res.data;
      });
    };

    vm.getVolunteer(vm.volunteerId);

    vm.editMode = false;

    vm.toggleEditMode = function() {
      if (vm.editMode) {
        vm.getVolunteer(vm.volunteerId);
      }

      vm.editMode = !vm.editMode;
    };

    vm.saveChanges = function() {
      $http.put(
        api + '/volunteers/' + vm.volunteerId.toString() + '/',
        vm.volunteer
      )
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.error(err);
      });

      vm.editMode = false;
    };

    vm.languages = Enums.languages;
    vm.volunteerLevels = Enums.volunteer_levels;
  };
};

VolunteerController.$inject = ["$state", "$scope", "$http", "Enums"];

export default VolunteerController;
