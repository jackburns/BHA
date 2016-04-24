let AssignmentsService = function ($http, $state, $localStorage, Alert) {

  let getMyAssignments = (callback) => {
    $http.get(api + '/assignments/me/', {
    }).then(function(res) {
      console.log(res);
      if(callback) {
        callback();
      }
    }, function(error) {
    });
  }

  return { getMyAssignments };
};

AssignmentsService.$inject = ['$http', '$state', '$localStorage', 'Alert'];
export default AssignmentsService;
