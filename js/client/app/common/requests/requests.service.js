let RequestsService = function($http) {
  
  let getAssignments = (callback) => {
    $http.get(api + '/assignments/').then((res) => {
      callback(res.data.results);
    }, (error) => {
      console.log(error);
      return error;
    });
  };
  
  let getVolunteers = (config, callback) => {
    $http.get(api + '/volunteers/', config).then((res) => {
      callback(res.data.results);
    });
  };
  
  return { getAssignments , getVolunteers };
};

RequestsService.$inject = ['$http'];
export default RequestsService;
