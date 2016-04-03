let UserService = function ($http, $state, $localStorage) {
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
      console.log(user);
      if(redirect_state) $state.go(redirect_state);
    });
  }

  let isSignedIn = () => {
    return !!user;
  };

  let isAdmin = () => {
    return user.is_staff;
  }

  return { getUser, signIn, isSignedIn, isAdmin };
};

UserService.$inject = ['$http', '$state', '$localStorage'];
export default UserService;
