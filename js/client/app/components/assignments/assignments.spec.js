import AssignmentModule from './assignment'
import AssignmentController from './assignment.controller';
import AssignmentComponent from './assignment.component';
import AssignmentTemplate from './assignment.html';

describe('Assignment', () => {
  let $rootScope, $componentController, makeController, mockModals, mockRequests;

  beforeEach(window.module(AssignmentModule.name));

  beforeEach(() => {
    mockRequests = {
      getAssignments: sinon.stub(),
      getVolunteers: sinon.stub()
    };

    mockModals = {
      openNotifications: sinon.stub()
    };
  });

  beforeEach(inject((_$rootScope_, _$componentController_) => {
    $rootScope = _$rootScope_;
    $componentController = _$componentController_;

    makeController = () => {
      return $componentController(AssignmentModule.name, {
        '$scope': $rootScope,
        'Modals': mockModals,
        'Requests': mockRequests
      })
    };
  }));
  
  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('initializes with futureAssignments fetched from the API', () => {
      mockRequests.getAssignments.callsArgWith(0, [0, 1]);
      let controller = makeController();

      expect(controller).to.have.property('futureAssignments');
      expect(controller.futureAssignments).to.have.length(2);
    });

    it('opens the notifications modal after fetching all volunteers', () => {
      mockRequests.getVolunteers.callsArgWith(1, [55, 82]);
      let controller = makeController();
      controller.openNotificationsModal('es');

      expect(mockRequests.getVolunteers.calledOnce).to.be.true;
      expect(mockModals.openNotifications.calledOnce).to.be.true;
      expect(mockModals.openNotifications.calledWith([55, 82])).to.be.true;
    })
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
