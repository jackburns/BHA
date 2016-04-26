let RequestsService = function($http, Alert) {

  let defaultErrorAlert = (error) => {
    Alert.add('danger', 'An error has occurred');
  };

  let getAssignments = (successCallback, errorCallback=defaultErrorAlert) => {
    $http.get(api + '/assignments/11/').then((res) => {console.log(res);});
    $http.get(api + '/assignments/').then((res) => {
      successCallback(res.data.results);
    }, errorCallback);
  };

  let updateAssignment = (assignment) => {
    return $http.patch(api + '/assignments/' + assignment.id + '/', assignment)
  }

  let getVolunteers = (config, successCallback, errorCallback=defaultErrorAlert) => {
    $http.get(api + '/volunteers/', config).then((res) => {
      successCallback(res.data.results);
    }, errorCallback);
  };

  return { getAssignments , getVolunteers, updateAssignment };
};

RequestsService.$inject = ['$http', 'Alert'];
export default RequestsService;
