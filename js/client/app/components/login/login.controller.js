class LoginController {
  constructor(Restangular, $http) {
    this.name = 'login';
    this.email = '';
    this.password = '';
    this.error = '';

    this.login = function() {
      let user_data = {
        username: 'jack',
        password: 'amarantos202'
      }
      Date.prototype.yyyymmdd = function() {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = this.getDate().toString();
        return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
      };

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
          username: 'hihihihi8',
          password: 'hihihi111',
          email: 'thing@thing.com'
        }
      }

      $http.post(api + "/auth/login/", user_data, {"Authorization": ""}).then(function(response) {
          console.log(response);
          $http.defaults.headers.common.Authorization = 'Token ' + response.data.key;

          $http.get(api + '/auth/user/').then(function(res) {
            console.log(res);
            $http.get(api + '/volunteers/').then(function(res) {
              console.log(res);
            });
            $http.post(api + "/volunteers/", volunteer_data).then(function(res) {
              console.log(res);
            });
          })

        //  $cookieStore.put('djangotoken', response.token);
      //    $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
        })
    }
  }
}
LoginController.$inject = ['Restangular', '$http'];
export default LoginController;
