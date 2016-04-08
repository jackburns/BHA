class ResetPasswordController {
  constructor($http, $state, User) {
    this.name = 'resetPassword';
    this.newPassword = '';
    this.newPasswordAgain = '';
    this.email = '';
    this.passwordError = "";

    this.updateState = this.userId && this.token;

    this.resetPassword = () => {
      $http.post(api + '/auth/password/reset/', { email: this.email}).then((res) => {
        console.log(res);
      });
    }

    this.canUpdate = () => {
      this.userId && this.token && this.new_password
    }

    //TODO: dont leave me copied from volunteer
    let checkPassword = () => {
      let password = this.newPassword;
      if (password.length < 8) {
        return "Password needs to be at least 8 characters";
      } else if (password.length > 50) {
        return "Password need to be less than 50 characters";
      } else if (password.search(/\d/) == -1) {
        return "Password needs at least one number";
      } else if (password.search(/[a-zA-Z]/) == -1) {
        return "Password needs at least one letter";
      } else if(password != this.newPasswordAgain) {
        return "Passwords need to match"
      } else {
        return "";
      }
    };

    this.updatePassword = () => {
      this.passwordError = checkPassword();
      if(!this.passwordError) {
        $http.post(api + '/auth/password/reset/confirm/', {
          uid: this.userId,
          token: this.token,
          new_password1: this.new_password,
          new_password2: this.new_password
        });
      }
    }
  }
}

ResetPasswordController.$inject = ['$http', '$state', 'User'];
export default ResetPasswordController;
