let UserService = function ($http, $state, $localStorage, Alert) {
  let user = null;
  const maxFailAttempts = 3;
  let failAttempts = 0;

  let getUser = () => {
    return user;
  };

  let signIn = (callback) => {
    if(failAttempts < maxFailAttempts) {
      $http.get(api + '/volunteers/me/', {
        headers: {
          'Authorization': 'Token ' + $localStorage.djangotoken
        }
      }).then(function(res) {
        failAttempts = 0;
        $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.djangotoken;
        user = res.data;
        if(callback) {
          callback();
        }
      }, function(error) {
        Alert.add('danger', 'Could not log in');
        console.log(error);
        failAttempts++;
      });
    // can't get the volunteer, somethings wrong, abort mission
    } else {
      delete $localStorage.djangotoken;
      $state.go('login');
    }
  }

  let logout = () => {
    $http.post(api + '/auth/logout/').then(() => {
      user = null;
      $http.defaults.headers.common.Authorization = '';
      delete $localStorage.djangotoken;
      $state.go('login');
    });
  }

  let isSignedIn = () => {
    return !!user;
  };

  let isAdmin = () => {
    return user && user.user.is_superuser;
  }

  let getLevel = () => {
    if(user) {
      if(user.isAdmin) {
        return 6;
      } else {
        return user.volunteer_level;
      }
    } else {
      return 0;
    }
  }

  let viewProfile = () => {
    $state.go('volunteer', {
      volunteerId: user.id,
      volunteer: user
    });
  }
  return { getUser, signIn, isSignedIn, isAdmin, logout, getLevel, viewProfile };
};

UserService.$inject = ['$http', '$state', '$localStorage', 'Alert'];
export default UserService;
