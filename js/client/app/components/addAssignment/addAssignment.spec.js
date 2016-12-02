import AddAssignmentModule from './addAssignment'
import AddAssignmentController from './addAssignment.controller';
import AddAssignmentComponent from './addAssignment.component';
import AddAssignmentTemplate from './addAssignment.html';

describe('AddAssignment', () => {
  let $rootScope, $componentController, mockUser, makeController;

  beforeEach(window.module(AddAssignmentModule.name));
  beforeEach(inject((_$rootScope_, _$componentController_) => {
    $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    mockUser = {
      getUser: sinon.stub().returns({
        id: 0
      })
    };
    makeController = () => {
      return $componentController(AddAssignmentModule.name, {
        $http: {},
        $filter: {},
        Enums: {},
        Alert: {},
        User: mockUser,
        $state: {}
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
    it('has language name in template [REMOVE]', () => {
      expect(AddAssignmentTemplate).to.contain('vm.info.language_name');
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AddAssignmentComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AddAssignmentTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AddAssignmentController);
      });
  });
});
