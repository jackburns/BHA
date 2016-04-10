import LanguageSelectModule from './languageSelect'
import LanguageSelectController from './languageSelect.controller';
import LanguageSelectComponent from './languageSelect.component';
import LanguageSelectTemplate from './languageSelect.html';
import Enums from '../enums/enums';

describe('LanguageSelect', () => {
  let $rootScope, makeController;

  beforeEach(window.module(LanguageSelectModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new LanguageSelectController(Enums);
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('compares strings upon if it starts with expected case-insensitive substring', () => {
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

  describe('Template', () => {
  });

  describe('Component', () => {
      // component/directive specs
      let component = LanguageSelectComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(LanguageSelectTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(LanguageSelectController);
      });
  });
});
