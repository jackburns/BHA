let RequestsService = function($http, Alert) {

  let defaultErrorAlert = (error) => {
    Alert.add('danger', 'An error has occurred');
  };
  
  let getAssignments = (successCallback, errorCallback=defaultErrorAlert) => {
    $http.get(api + '/assignments/').then((res) => {
      successCallback(res.data.results);
    }, errorCallback);
  };
  
  let getVolunteers = (config, successCallback, errorCallback=defaultErrorAlert) => {
    $http.get(api + '/volunteers/', config).then((res) => {
      successCallback(res.data.results);
    }, errorCallback);
  };
  
  return { getAssignments , getVolunteers };
};

RequestsService.$inject = ['$http', 'Alert'];
export default RequestsService;
