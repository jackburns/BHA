class AvailabilityEditController {
  constructor(Enums) {
    this.selectOptions = Enums;

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
