import AssignmentModule from './assignment'
import AssignmentController from './assignment.controller';
import AssignmentComponent from './assignment.component';
import AssignmentTemplate from './assignment.html';

describe('Assignment', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AssignmentModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AssignmentController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('initializes with allLanguages, a comparator, and futureAssignments', () => {
      let controller = makeController();
      expect(controller).to.have.property('futureAssignments');
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
