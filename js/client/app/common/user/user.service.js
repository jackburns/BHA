let UserService = function ($http, $state, $localStorage, $rootScope) {
  let user = null;
  let maxFailAttempts = 3;
  let failAttempts = 0;
  let getUser = () => {
    return user;
  };

  let signIn = (redirect_state) => {
    if(failAttempts < maxFailAttempts) {
      $http.get(api + '/volunteers/me/', {
        headers: {
          'Authorization': 'Token ' + $localStorage.djangotoken
        }
      }).then(function(res) {
        maxFailAttempts = 0;
        $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.djangotoken;
        user = res.data;
        if(redirect_state) {
          $state.go(redirect_state);
        }
      }, function(error) {
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
      delete $localStorage.djangotoken;
      $state.go('login');
    });
  }

  let isSignedIn = () => {
    return !!user;
  };

  let isAdmin = () => {
    return user && user.is_staff;
  }

  return { getUser, signIn, isSignedIn, isAdmin, logout };
};

UserService.$inject = ['$http', '$state', '$localStorage'];
export default UserService;
