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

      $http.post(api + "-token-auth/", user_data, {"Authorization": ""}).then(function(response) {
          console.log(response);
          $http.defaults.headers.common.Authorization = 'Authorization: JWT ' + response.data.token;

          $http.get(api + '/volunteers/me/').then(function(res) {
            console.log(res);
          })
        //  $cookieStore.put('djangotoken', response.token);
      //    $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
        })
    }
  }
}
LoginController.$inject = ['Restangular', '$http'];
export default LoginController;
