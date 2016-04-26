let RequestsService = function($http, Alert) {
  let getSearchConfig = (config) => {
    let paramsObj = {};

    // only add queries if we need to
     _.forOwn(config, (value, key) => {
      if(value) {
        paramsObj[key] = value;
      }
    });

    let parsedConfig = {
      params: paramsObj
    };

    return parsedConfig;
  };

  let defaultErrorAlert = (error) => {
    Alert.add('danger', 'An error has occurred');
  };

  let getAssignments = (config, successCallback, errorCallback=defaultErrorAlert) => {
    $http.get(api + '/assignments/', getSearchConfig(config)).then((res) => {
      successCallback(res.data.results);
    }, errorCallback);
  };

  let updateAssignment = (assignment) => {
    return $http.patch(api + '/assignments/' + assignment.id + '/', assignment)
  }

  let getVolunteers = (config, successCallback, errorCallback=defaultErrorAlert) => {
    $http.get(api + '/volunteers/', getSearchConfig(config)).then((res) => {
      successCallback(res.data.results);
    }, errorCallback);
  };

  let getUserAssignments = (user_id) => {
    return $http.get(api + '/volunteers/' + user_id + '/assignments/');
  };

  return { getAssignments , getVolunteers, updateAssignment, getUserAssignments };
};

RequestsService.$inject = ['$http', 'Alert'];
export default RequestsService;
