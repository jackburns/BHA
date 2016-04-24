import AddAssignmentModule from './addAssignment'
import AddAssignmentController from './addAssignment.controller';
import AddAssignmentComponent from './addAssignment.component';
import AddAssignmentTemplate from './addAssignment.html';

describe('AddAssignment', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AddAssignmentModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AddAssignmentController();
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
      expect(AddAssignmentTemplate).to.match(/{{\s?vm\.name\s?}}/g);
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
