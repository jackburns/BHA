class LoginController {
  constructor(Restangular, $http, User, $sessionStorage) {
    this.name = 'login';
    this.email = '';
    this.password = '';
    this.error = '';

    this.login = () => {
      Date.prototype.yyyymmdd = function() {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = this.getDate().toString();
        return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
      };

      let user_data = {
        username: this.email,
        password: this.password
      }

      var d = new Date();
      var dString = d.yyyymmdd();

      let volunteer_data = {
        first_name: 'hi',
        last_name: 'something',
        middle_name: 'whydoweevenhavethis',
        contact: {
          street: '.',
          city: '..',
          state: '...',
          zip: '....',
          phone_number: '.....',
          email: 'thing@thing.com',
          preferred_contact: '0'
        },
        birthday: dString,
        sex: 0,
        user: {
          username: 'hihihihi9',
          password: 'hihihi111',
          email: 'thing@thing.com'
        }
      }

      $http.post(api + "/auth/login/", user_data, {"Authorization": ""}).then(function(response) {
        console.log(response);
        $http.defaults.headers.common.Authorization = 'Token ' + response.data.key;
        $sessionStorage.djangotoken = response.data.key;
        User.signIn('home');
      });
    }
  }
}
LoginController.$inject = ['Restangular', '$http','User', '$sessionStorage'];
export default LoginController;
