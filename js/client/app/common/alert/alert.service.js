let AlertService = function ($timeout) {
  let service = {
      add: add,
      closeAlert: closeAlert,
      closeAlertIdx: closeAlertIdx,
      clear: clear,
      get: get
    },
    alerts = [];

  return service;

  function add(type, msg) {
    let alert = {
      type: type,
      msg: msg,
      close: function () {
        return closeAlert(this);
      }
    };

    $timeout(closeAlert, 5000, true, alert);
    return alerts.push(alert);
  }

  function closeAlert(alert) {
    return closeAlertIdx(alerts.indexOf(alert));
  }

  function closeAlertIdx(index) {
    return alerts.splice(index, 1);
  }

  function clear() {
    alerts = [];
  }

  function get() {
    return alerts;
  }
};

AlertService.$inject = ['$timeout'];
export default AlertService;
