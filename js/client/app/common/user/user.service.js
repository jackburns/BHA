let UserService = function ($http, $state) {
  let user = {
    is_signed_in: false
  };

  let getUser = () => {
    return user;
  };

  let signIn = (redirect_state) => {
    $http.get(api + '/volunteers/me/').then(function(res) {
      res.data.is_signed_in = true;
      user = res.data;
      if(redirect_state) $state.go(redirect_state);
    });
  }

  let isSignedIn = () => {
    return user.is_signed_in;
  };

  let isAdmin = () => {
    // replace with role enum
    return user.admin === 'admin';
  }

  return { getUser, signIn, isSignedIn, isAdmin };
};

UserService.$inject = ['$http', '$state'];
export default UserService;
