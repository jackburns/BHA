import ModalsModule from './modals';

describe('Modals service', function() {
  var Modals, mockUibModal;

  beforeEach(angular.mock.module(ModalsModule.name));
  beforeEach(() => {

    mockUibModal = {open: sinon.spy()};

    window.module(($provide) => {
      $provide.value('$uibModal', mockUibModal);
    });
  });

  beforeEach(inject(function(_Modals_) {
    Modals = _Modals_;
  }));

  describe('getAssignments', () => {
    it('should get assignments', () => {
      Modals.openNotifications(['volunteer1', 'volunteer2']);
      expect(mockUibModal.open.calledOnce).to.be.true;
    });
  });
});