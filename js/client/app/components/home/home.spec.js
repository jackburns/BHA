import HomeModule from './home'
import HomeController from './home.controller';
import HomeComponent from './home.component';
import HomeTemplate from './home.html';
import _ from 'lodash';

describe('Home', () => {
  let $rootScope, makeController;

  beforeEach(window.module(HomeModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new HomeController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('initializes with three dummy volunteers', () => {
      let controller = makeController();
      expect(controller).to.have.property('volunteers');
      expect(controller.volunteers).to.have.length(3);
    });

    it('initializes with ordering and isReverseOrder', () => {
      let controller = makeController();
      expect(controller.ordering).to.equal('lastName');
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
      controller.updateOrder('firstName');
      expect(controller.isReverseOrder).to.equal(false);

      controller.updateOrder('firstName');
      expect(controller.isReverseOrder).to.equal(true);

      controller.updateOrder('firstName');
      expect(controller.isReverseOrder).to.equal(false);
    });
    
    it('sets all volunteers notify status to that of selectAll checkbox', () => {
      let ctrl = makeController();
      _.forEach(ctrl.volunteers, (volunteer) => {
        expect(volunteer.selectedToNotify).to.be.false;
      });

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


    // notifications modal tests
    it('disables notify button when no selections', () => {
      let controller = makeController();
      expect(controller).to.have.property('notifyModalOpen');
      expect(controller.notifyModalOpen).to.equal(false);
      
      expect(controller).to.have.property('selectedVolunteers');
      expect(controller.selectedVolunteers).to.have.length(0);

      expect(controller).to.have.property('notifyButtonEnabled');
      expect(controller.notifyButtonEnabled).to.equal(false);
    });

    it('enables notify button when one selection', () => {
      let controller = makeController();
      controller.selectVolunteer(1);
      expect(controller.selectedVolunteers).to.have.length(1);
      expect(controller.notifyButtonEnabled).to.equal(true);
    });

    it('adds volunteer to selected list when volunteer is selected', () => {
      let controller = makeController();
      controller.selectVolunteer(1);
      expect(controller.selectedVolunteers.indexOf(1)).to.be.above(-1);
    });

    it('removes volunteer from selected list when volunteer is deselected', () { 
      let controller = makeController();
      controller.selectVolunteer(1);
      controller.selectVolunteer(2);
      controller.selectVolunteer(3);
      controller.deselectVolunteer(2);
      expect(controller.selectedVolunteers.indexOf(2)).to.equal(-1);
    });

    it('retrieves correct information about a volunteer', () => {
      let controller = makeController();
      let volunteer1 = {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        languages; ['Spanish'],
        email: 'john@smith.com',
	phoneNumber: '6178762348',
	preferredContact: 'Email'
      };

      controller.selectVolunteer(1);
      let volunteerInfo = controller.getVolunteerInfo(1);
      expect(volunteerInfo).to.have.property('email');
      expect(volunteerInfo.email).to.equal('john@smith.com');

      expect(volunteerInfo).to.have.property('firstName');
      expect(volunteerInfo.email).to.equal('John');
      
      expect(volunteerInfo).to.have.property('lastName');
      expect(volunteerInfo.email).to.equal('Smith');

      expect(volunteerInfo).to.have.property('phoneNumber');
      expect(volunteerInfo.phoneNumber).to.equal('6178762348');

      expect(volunteerInfo).to.have.property('preferredContact');
      expect(volunteerInfo.preferredContact).to.equal('Email');
    });


    it('places volunteers in correct table', () => {
      let controller = makeController();
      let volunteer1 = {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        languages; ['Spanish'],
        email: 'john@smith.com',
	phoneNumber: '6178762348',
	preferredContact: 'Email'
      };

      let volunteer2 = {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        languages; ['Spanish'],
        email: 'jane@smith.com',
	phoneNumber: '6178562348',
	preferredContact: 'Text'
      };

      controller.selectVolunteer(1);
      controller.selectVolunteer(2);

      let emailVolunteers = controller.getEmailVolunteers();
      let textVolunteers = controller.getTextVolunteers();

      expect(emailVolunteers.indexOf(2)).to.equal(-1);
      expect(emailVolunteers.indexOf(1)).to.be.above(-1);
      expect(emailVolunteers.indexOf(1)).to.equal(-1);
      expect(emailVolunteers.indexOf(2)).to.be.above(-1);
    });  
  });

  describe('Template', () => {
  });

  describe('Component', () => {
      // component/directive specs
      let component = HomeComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(HomeTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(HomeController);
      });
  });
});
