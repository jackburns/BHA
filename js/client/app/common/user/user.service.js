let UserService = function () {
  let user = {
    isSignedIn: false
  };

  let getUser = () => {
    return user;
  };

  let signIn = (newUser) => {
    newUser = {
      firstName: 'Mikey',
      lastName: 'Weintraub',
      contact: {
        email: 'mikey@mikeymike.com',
        phone: '555-555-5555'
      },
      hours: 56,
      role: 'admin',
      volunteerLevel: 'beenObserved'
    };
    newUser.isSignedIn = true;
    user = newUser;
  }

  signIn();

  let isSignedIn = () => {
    return user.isSignedIn;
  };

  let isAdmin = () => {
    // replace with role enum
    return user.admin === 'admin';
  }

  return { getUser, isSignedIn, isAdmin };
};

export default UserService;
