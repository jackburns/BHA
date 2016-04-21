let ValidateService = function (Enums) {

  let availability = function (availability) {
    return _.each(availability, function (av) {
      av.isValid = (av.day !== "" && av.start_time !== "" && av.end_time !== "" &&
        Enums.arrays.availability_times.indexOf(av.start_time) < Enums.arrays.availability_times.indexOf(av.end_time));
    });
  };

  let zip = function (zip) {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
  };

  let password = function (password) {
    if (password.length < 8) {
      return "Password needs to be at least 8 characters";
    } else if (password.length > 50) {
      return "Password need to be less than 50 characters";
    } else if (password.search(/\d/) == -1) {
      return "Password needs at least one number";
    } else if (password.search(/[a-zA-Z]/) == -1) {
      return "Password needs at least one letter";
    } else {
      return "";
    }
  };

  let phoneNumber = function (phone) {
    return /1?\s*\W?\s*([2-9][0-8][0-9])\s*\W?\s*([2-9][0-9]{2})\s*\W?\s*([0-9]{4})(\se?x?t?(\d*))?/.test(phone);
  }

  let carrier = function (preferred_contact, carrier) {
    return !(parseInt(preferred_contact) > 0 && parseInt(carrier) <= 0)
  }

  return {
    password: password,
    zip: zip,
    availability: availability,
    phoneNumber: phoneNumber,
    carrier: carrier
  };
};
ValidateService.$inject = ['Enums'];
export default ValidateService;
