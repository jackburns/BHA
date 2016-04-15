class AvailabilityEditController {
  constructor(Enums) {
    this.selectOptions = Enums;
    this.selectOptions.availabilityTimes = ["9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM",
        "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM"];

    let createBlankAvailability = function() {
      return {
        day: "",
        start_time: "",
        end_time: "",
        isValid: false
      };
    };

    this.addNewAvailability = function() {
      this.availability.push(createBlankAvailability());
    };

    this.removeLastAvailability = function() {
      this.availability.pop();
    };

    if(this.availability.length === 0) {
      this.addNewAvailability();
    }
  }
}

AvailabilityEditController.$inject = ['Enums'];
export default AvailabilityEditController;
