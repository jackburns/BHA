import AssignmentModule from './assignment'
import AssignmentController from './assignment.controller';
import AssignmentComponent from './assignment.component';
import AssignmentTemplate from './assignment.html';

describe('Assignment', () => {

  let $rootScope, $componentController, mockUser, mockModals, makeController;

  beforeEach(window.module(AssignmentModule.name));
  beforeEach(inject((_$rootScope_, _$componentController_) => {
    $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    mockUser = {
      isAdmin: sinon.stub()
    };
    mockModals = {
      openNotifications: sinon.stub()
    };
    makeController = () => {
      return $componentController(AssignmentModule.name, {
        $scope: $rootScope,
        $state: {},
        User: mockUser,
        Modals: mockModals,
        Alert: {},
        Requests: {},
        Enums: {}
      }, {
        assignment: {}
      });
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(AssignmentTemplate).to.contain('vm.assignment.language_name');
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AssignmentComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AssignmentTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AssignmentController);
      });
  });
});
