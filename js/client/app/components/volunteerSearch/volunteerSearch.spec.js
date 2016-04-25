import VolunteerSearchModule from './volunteerSearch'
import VolunteerSearchController from './volunteerSearch.controller';
import VolunteerSearchComponent from './volunteerSearch.component';
import VolunteerSearchTemplate from './volunteerSearch.html';
import _ from 'lodash';

describe('VolunteerSearch', () => {
  let $rootScope, $componentController, makeController, mockRequests, mockModals, mockEnums;

  let mockVolunteers = [
    { selectedToNotify: false },
    { selectedToNotify: false },
    { selectedToNotify: false }
  ];


  beforeEach(window.module(VolunteerSearchModule.name));
  beforeEach(inject((_$rootScope_, _$componentController_) => {
    $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    
    mockRequests = {getVolunteers: sinon.stub()};
    mockRequests.getVolunteers.callsArgWith(1, mockVolunteers);

    mockModals = {openNotifications: sinon.spy()};
    mockEnums = {};

    makeController = () => {
      return $componentController(VolunteerSearchModule.name, {
        '$scope': $rootScope,
        'Requests': mockRequests,
        'Modals': mockModals,
        'Enums': mockEnums
      })
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {

    it('initializes with ordering and isReverseOrder', () => {
      let controller = makeController();
      expect(controller.ordering).to.equal('last_name');
      expect(controller.isReverseOrder).to.equal(false);
    });

    it('initializes with selectAll unchecked', () => {
      let controller = makeController();
      expect(controller.willSelectAll).to.be.false;
    });

    it('updates order and order direction', () => {
      let controller = makeController();
      controller.updateOrder('firstName');
      expect(controller.ordering).to.equal('firstName');

      controller.updateOrder('languages');
      expect(controller.ordering).to.equal('languages');
    });

    it('reverses sort order when selecting the current sort field', () => {
      let controller = makeController();
      controller.updateOrder('first_name');
      expect(controller.isReverseOrder).to.equal(false);

      controller.updateOrder('first_name');
      expect(controller.isReverseOrder).to.equal(true);

      controller.updateOrder('first_name');
      expect(controller.isReverseOrder).to.equal(false);
    });

    it('sets all volunteers notify status to that of selectAll checkbox', () => {
      let ctrl = makeController();

      ctrl.willSelectAll = true;
      ctrl.selectAll();
      _.each(ctrl.volunteers, (volunteer) => {
        expect(volunteer.selectedToNotify).to.be.true;
      });

      ctrl.willSelectAll = false;
      ctrl.selectAll();
      _.forEach(ctrl.volunteers, (volunteer) => {
        expect(volunteer.selectedToNotify).to.be.false;
      });
    });

    it('updates number volunteers selected and selectAll checkbox', () => {
      let ctrl = makeController();
      expect(ctrl.numberSelected).to.equal(0);
      expect(ctrl.willSelectAll).to.be.false;

      _.each(ctrl.volunteers, (volunteer) => {
        volunteer.selectedToNotify = true;
      });

      ctrl.updateNumberSelected();
      expect(ctrl.numberSelected).to.equal(ctrl.volunteers.length);
      expect(ctrl.willSelectAll).to.be.true;

      ctrl.volunteers[0].selectedToNotify = false;
      ctrl.updateNumberSelected();
      expect(ctrl.numberSelected).to.equal(ctrl.volunteers.length - 1);
      expect(ctrl.willSelectAll).to.be.false;
    });
  });

  describe('Template', () => {
  });

  describe('Component', () => {
    // component/directive specs
    let component = VolunteerSearchComponent;

    it('includes the intended template',() => {
      expect(component.template).to.equal(VolunteerSearchTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(VolunteerSearchController);
    });
  });
});
