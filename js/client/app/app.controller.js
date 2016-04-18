class AppController {
  constructor(Alert) {
    this.alerts = Alert.get();
  }
}

AppController.$inject = ['Alert'];
export default AppController;
