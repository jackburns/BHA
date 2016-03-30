import faker from 'faker'
import _ from 'lodash'

class VolunteerController {
  constructor($state, $scope) {

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

    vm.makeVolunteer = function(id, firstName, middleName, lastName, languages) {
      return {
        id: id,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        languages: _.map(languages, (lang) => {
          return {
            name: lang,
            vocal: vm.randomTrueFalse(),
            written: vm.randomTrueFalse(),
          }
        }),
        birthday: faker.date.past(),
        gender: "Other",
        role: "User",
        volunteerLevel: "beenObserved",
        createdAt: faker.date.recent(),
        notes: faker.random.words(Math.random() * 40 + 80),
        contact: {
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          zip: faker.address.zipCode(),
          phoneNumber: faker.phone.phoneNumber(),
          email: faker.internet.email(),
          preferredContact: {
            email: vm.randomTrueFalse(),
            phone: vm.randomTrueFalse()
          }
        },
        hours: Math.floor(30 + Math.random() * 30)
      };
    };

    vm.getVolunteer = function(volunteerId) {
      //$http.get(...)

      switch(volunteerId) {
        case 0:
          return vm.makeVolunteer(0, 'Bill', 'Ungar', 'Brown', ['German']);
        case 1:
          return vm.makeVolunteer(1, 'Ellie', 'Walter', 'White', ['Portuguese, Spanish']);
        case 2:
          return vm.makeVolunteer(2, 'Tom', 'Jerry', 'Jones', ['Spanish', 'French']);
        default:
          return vm.makeVolunteer(vm.volunteerId, faker.name.firstName(), '', faker.name.lastName(), ['Ukranian', 'Swedish', 'Afrikaans']);
      };
    };

    vm.volunteer = vm.getVolunteer(vm.volunteerId);

    vm.generateSchedule = function() {

      let schedule = _.map(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], (day) => {
        var am = vm.randomTrueFalse();
        var pm = vm.randomTrueFalse();
        var ret = {day: day, am: am, pm: pm};
        return ret;
      });

      return schedule;
    };

    vm.schedule = vm.generateSchedule();
    vm.days = _.map(vm.schedule, (day) => { return day.day; });
    vm.ams = _.map(vm.schedule, (day) => { return day.am; });
    vm.pms = _.map(vm.schedule, (day) => { return day.pm; });

    vm.editMode = false;

    vm.toggleEditMode = function() {
      vm.editMode = !vm.editMode;
      console.log(vm.editMode);
    };


  };
};

VolunteerController.$inject = ["$state", "$scope"];

export default VolunteerController;
