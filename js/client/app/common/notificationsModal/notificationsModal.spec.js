import NotificationsModalController from './notificationsModal.controller';

describe('NotificationsModal', () => {
  let $rootScope, makeController, $scope, uibModalInstance, http, volunteerList, Enums;
  
  beforeEach(inject(($injector) => {
    uibModalInstance = {
      close: function() {},
      dismiss: function(str) {}
    };
    
    http = {
      post: function(url, obj) {}
    };
    
    Enums = {
      carriers: {
        0: "Sprint",
        1: "Verizon",
        2: "AT&T",
        3: "Other"
      },
      preferred_contact: {
        0: "Email",
        1: "Text",
        2: "Both"
      }
    };
    
    volunteerList = [{
      id: 1,
      first_name: "Tom",
      last_name: "Jones",
      contact: {
        phone_number: "6177778772",
        carrier: 1,
        email: "a@b.com",
        preferred_contact: 0
      }
    }, {
      id: 2,
      first_name: "Bob",
      last_name: "Smith",
      contact: {
        phone_number: "2207318972",
        carrier: 3,
        email: "hi@b.com",
        preferred_contact: 1
      }
    }, {
      id: 3,
      first_name: "Rob",
      last_name: "Smits",
      contact: {
        phone_number: "1670892037",
        carrier: 2,
        email: "rob@b.com",
        preferred_contact: 1
      }
    }];
    
    makeController = ($scope) => {
      return new NotificationsModalController($scope, {}, uibModalInstance, http, volunteerList, Enums);
    };
  }));

  describe('Controller', () => {
    it('properly initializes list of selected volunteers', () => {
      var $scope = {};
      
      let controller = makeController($scope);
      expect($scope).to.have.property('allVolunteers');
      expect($scope).to.have.property('selectedVolunteers');
      expect($scope.selectedVolunteers.length).to.equal(3);
      
      for (var i = 0; i < 3; i++) {
        var curObj = $scope.selectedVolunteers[i];
        expect(curObj).to.have.property('id');
        
        if (curObj.id === 1) {
          expect(curObj).to.have.property('fullName');
          expect(curObj.fullName).to.equal('Tom Jones');
          expect(curObj).to.have.property('phoneNumber');
          expect(curObj.phoneNumber).to.equal('6177778772');
          expect(curObj).to.have.property('carrier');
          expect(curObj.carrier).to.equal(1);
          expect(curObj).to.have.property('email');
          expect(curObj.email).to.equal('a@b.com');
          expect(curObj).to.have.property('contactMethod');
          expect(curObj.contactMethod).to.equal('Email');
          expect(curObj).to.have.property('onlyEmail');
          expect(curObj.onlyEmail).to.equal(false);
        } else if (curObj.id === 2) {
          expect(curObj).to.have.property('fullName');
          expect(curObj.fullName).to.equal('Bob Smith');
          expect(curObj).to.have.property('phoneNumber');
          expect(curObj.phoneNumber).to.equal('2207318972');
          expect(curObj).to.have.property('carrier');
          expect(curObj.carrier).to.equal(3);
          expect(curObj).to.have.property('email');
          expect(curObj.email).to.equal('hi@b.com');
          expect(curObj).to.have.property('contactMethod');
          expect(curObj.contactMethod).to.equal('Email');
          expect(curObj).to.have.property('onlyEmail');
          expect(curObj.onlyEmail).to.equal(true);
        } else {
          expect(curObj.id).to.equal(3);
          expect(curObj).to.have.property('fullName');
          expect(curObj.fullName).to.equal('Rob Smits');
          expect(curObj).to.have.property('phoneNumber');
          expect(curObj.phoneNumber).to.equal('1670892037');
          expect(curObj).to.have.property('carrier');
          expect(curObj.carrier).to.equal(2);
          expect(curObj).to.have.property('email');
          expect(curObj.email).to.equal('rob@b.com');
          expect(curObj).to.have.property('contactMethod');
          expect(curObj.contactMethod).to.equal('Text');
          expect(curObj).to.have.property('onlyEmail');
          expect(curObj.onlyEmail).to.equal(false);
        }
      }
    });
    
    it('removes a volunteer from the list on x click', () => {
      var $scope = {};
      
      let controller = makeController($scope);
      expect($scope).to.have.property('removeFromTable');
      $scope.removeFromTable($scope.selectedVolunteers[1]);
      expect($scope.selectedVolunteers.length).to.equal(2);
      for (var i = 0; i < 2; i++) {
        expect($scope.selectedVolunteers[i].id).not.to.equal(2);
      }
    });
    
    it('generates the correct post object', () => {
      var $scope = {};
      
      let controller = makeController($scope);
      expect($scope).to.have.property('notificationSubject');
      expect($scope).to.have.property('notificationMessage');
      expect($scope).to.have.property('notificationTextMessage');
      expect($scope).to.have.property('getPostObject');
      
      $scope.notificationSubject = "BHA Assignment";
      $scope.notificationMessage = "Hello, there is a new assignment for you!";
      $scope.notificationTextMessage = "New assignment waiting";
      let postObj = $scope.getPostObject();
      
      expect(postObj).to.have.property('subject');
      expect(postObj).to.have.property('message');
      expect(postObj).to.have.property('textMessage');
      expect(postObj).to.have.property('emails');
      expect(postObj).to.have.property('texts');
      
      expect(postObj.subject).to.equal("BHA Assignment");
      expect(postObj.message).to.equal("Hello, there is a new assignment for you!");
      expect(postObj.textMessage).to.equal("New assignment waiting");
      
      let postEmails = postObj.emails;
      expect(postEmails.length).to.equal(2);
      
      var numProperEmails = 0;
      for (var i = 0; i < 2; i++) {
        var curObj = postEmails[i];
        expect(curObj).to.have.property('email');
        expect(curObj).to.have.property('id');
        if (curObj.id === 1 && curObj.email === "a@b.com") {
          numProperEmails++;
        }
        
        if (curObj.id === 2 && curObj.email === "hi@b.com") {
          numProperEmails++;
        }
      }
      
      expect(numProperEmails).to.equal(2);
      
      let postTexts = postObj.texts;
      expect(postTexts.length).to.equal(1);
      expect(postTexts[0]).to.have.property('id');
      expect(postTexts[0]).to.have.property('phoneNumber');
      expect(postTexts[0]).to.have.property('carrier');
      expect(postTexts[0].id).to.equal(3);
      expect(postTexts[0].phoneNumber).to.equal('1670892037');
      expect(postTexts[0].carrier).to.equal('AT&T');
    });
    
    it('Properly updates based on All contact method', () => {
      var $scope = {};
      
      let controller = makeController($scope);
      expect($scope.contactMethodAll).to.equal("");
      expect($scope).to.have.property('updateAllContactMethods');
      $scope.contactMethodAll = 'Email';
      $scope.updateAllContactMethods();
      for (var i; i < $scope.selectedVolunteers.length; i++) {
        expect($scope.selectedVolunteers[i].contactMethod).to.equal('Email');
      }
      
      $scope.contactMethodAll = 'Text';
      $scope.updateAllContactMethods();
      for (var i; i < $scope.selectedVolunteers.length; i++) {
        if ($scope.selectedVolunteers[i].onlyEmail) {
          expect($scope.selectedVolunteers[i].contactMethod).to.equal('Email');
        } else {
          expect($scope.selectedVolunteers[i].contactMethod).to.equal('Text');
        } 
      }
    });
  });
});
