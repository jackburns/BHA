import LanguageEditModule from './languageEdit'
import LanguageEditController from './languageEdit.controller';
import LanguageEditComponent from './languageEdit.component';
import LanguageEditTemplate from './languageEdit.html';
import Enums from '../enums/enums';

describe('LanguageEdit', () => {
  let $rootScope, makeController;

  beforeEach(window.module(LanguageEditModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      let ctrl = new LanguageEditController(Enums);
      ctrl.availability = [];
      return ctrl;
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('adds a new blank language', () => {
      let ctrl = makeController();
      expect(ctrl.languages).to.have.length(1);
      ctrl.addNewLanguage();
      expect(ctrl.languages).to.have.length(2);
      expect(ctrl.languages[1])
    });

    it('removes the last language', () => {
      let ctrl = makeController();
      console.log(ctrl);
      expect(ctrl.languages).to.have.length(1);
      ctrl.removeLastLanguage();
      expect(ctrl.languages).to.have.length(0);
      ctrl.removeLastLanguage();
      expect(ctrl.languages).to.have.length(0);
    });
  });

  describe('Template', () => {
  });

  describe('Component', () => {
      // component/directive specs
      let component = LanguageEditComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(LanguageEditTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(LanguageEditController);
      });
  });
});
