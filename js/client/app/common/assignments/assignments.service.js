let AssignmentsService = function ($http, $state, $localStorage, Alert) {

  let getMyAssignments = () => {
    return $http.get(api + '/assignments/me/');
  }

  let getUserAssignments = (user_id) => {
    return $http.get(api + '/volunteers/' + user_id + '/assignments/');
  }


  return { getMyAssignments, getUserAssignments };
};

AssignmentsService.$inject = ['$http', '$state', '$localStorage', 'Alert'];
export default AssignmentsService;
