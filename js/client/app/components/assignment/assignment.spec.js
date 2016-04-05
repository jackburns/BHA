import AssignmentModule from './assignment'
import AssignmentController from './assignment.controller';
import AssignmentComponent from './assignment.component';
import AssignmentTemplate from './assignment.html';
import Enums from '../../common/enums/enums';

describe('Assignment', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AssignmentModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AssignmentController(Enums);
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('initializes with allLanguages, a comparator, and futureAssignments', () => {
      let controller = makeController();
      expect(controller).to.have.property('allLanguages');
      expect(controller).to.have.property('startsWithComparator');
      expect(controller).to.have.property('futureAssignments');
    })

    it('filters strings upon if it starts with expected substring', () => {
      let controller = makeController();
      expect(controller.startsWithComparator('awef', '')).to.be.true;
      expect(controller.startsWithComparator('', '')).to.be.true;
      expect(controller.startsWithComparator('abcdefg', 'abcdefg')).to.be.true;
      expect(controller.startsWithComparator('abcdefg', 'ABCDEFG')).to.be.true;
      expect(controller.startsWithComparator('abcdefg', 'a')).to.be.true;
      expect(controller.startsWithComparator('abcdefg', 'b')).to.be.false;
      expect(controller.startsWithComparator('abcdefg', 'abcdefz')).to.be.false;
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
