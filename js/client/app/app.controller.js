class AppController {
  constructor(Alert) {
    console.log(Alert.get());
    this.alerts = Alert.get();
  }
}

AppController.$inject = ['Alert'];
export default AppController;
