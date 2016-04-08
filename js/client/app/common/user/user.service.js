let UserService = function ($http, $state, $localStorage, $rootScope) {
  let user = null;

  let getUser = () => {
    return user;
  };

  let signIn = (redirect_state) => {
    $http.get(api + '/volunteers/me/', {
      headers: {
        'Authorization': 'Token ' + $localStorage.djangotoken
      }
    }).then(function(res) {
      $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.djangotoken;
      user = res.data;
      if(redirect_state) {
        $state.go(redirect_state);
      }
    });
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
