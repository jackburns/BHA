import _ from 'lodash';

let RequestsService = function($http, Alert) {
  let getSearchConfig = (config) => {
    let paramsObj = {};

    // only add queries if we need to
     _.forOwn(config, (value, key) => {
      if(value !== '' && value !== null && value !== undefined) {
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

  let removeVolunteerFromAssignment = (assignmentId, config, successCallback, errorCallback=defaultErrorAlert) => {
    $http.post(api + '/assignments/' + assignmentId + '/remove_volunteer/', config).then((res) => {
      successCallback(res.data.results);
    }, errorCallback);
  };

  let addVolunteerToAssignment = (assignmentId, config, successCallback, errorCallback=defaultErrorAlert) => {
    $http.post(api + '/assignments/' + assignmentId + '/add_volunteer/', config).then((res) => {
      successCallback(res.data.results);
    }, errorCallback);
  };

  let updateAssignment = (assignment, oldVolunteerIds) => {
    let newVolunteerIds = _.map(assignment.volunteers, 'id');
    let volunteerIdsToAdd = _.difference(newVolunteerIds, oldVolunteerIds);
    let volunteerIdsToRemove = _.difference(oldVolunteerIds, newVolunteerIds);

    _.each(volunteerIdsToAdd, (volunteerId) => {
      addVolunteerToAssignment(assignment.id, {volunteer_id: volunteerId}, () => {});
    });
    _.each(volunteerIdsToRemove, (volunteerId) => {
      removeVolunteerFromAssignment(assignment.id, {volunteer_id: volunteerId}, () => {});
    });
    return $http.patch(api + '/assignments/' + assignment.id + '/', assignment)
  };

  let getVolunteers = (config, successCallback, errorCallback=defaultErrorAlert) => {
    $http.get(api + '/volunteers/', getSearchConfig(config)).then((res) => {
      successCallback(res.data.results);
    }, errorCallback);
  };

  let getUserAssignments = (user_id) => {
    return $http.get(api + '/volunteers/' + user_id + '/assignments/');
  };

  let sendReferral = (friendEmailAddress) => {
    return $http.post(api + '/refer/', {'friend': friendEmailAddress})
  }

  return { getAssignments , getVolunteers, updateAssignment, getUserAssignments, sendReferral };
};

RequestsService.$inject = ['$http', 'Alert'];
export default RequestsService;
