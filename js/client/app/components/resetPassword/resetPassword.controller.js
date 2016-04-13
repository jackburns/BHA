class ResetPasswordController {
  constructor($http, $state, $stateParams, Alert) {
    this.name = 'resetPassword';
    this.newPassword = '';
    this.newPasswordAgain = '';
    this.email = '';
    this.passwordError = "";

    this.updateState = $stateParams.userId && $stateParams.token;

    this.resetPassword = () => {
      $http.post(api + '/auth/password/reset/', { email: this.email}).then((res) => {
        Alert.add('success', 'Password reset email sent');
      }, (error) => {
        console.log(error);
        Alert.add('danger', 'Email not valid');
      });
    };

    this.canUpdate = () => {
      return this.userId && this.token && this.newPassword;
    };

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
          uid: $stateParams.userId,
          token: $stateParams.token,
          new_password1: this.newPassword,
          new_password2: this.newPassword
        }).then(() => {
          Alert.add('success', 'Password successfully updated');
          $state.go('login');
        }, (error) => {
          console.log(error);
          Alert.add('danger', 'Password could not be updated');
        });
      }
    };
  }
}

ResetPasswordController.$inject = ['$http', '$state', '$stateParams', 'Alert'];
export default ResetPasswordController;
