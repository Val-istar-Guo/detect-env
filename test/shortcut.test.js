import { bindShortcut, updateShortcut, clearShortcut } from '../src/shortcut';
import { expect } from 'chai';


describe('Module shortcut:', function () {
  const obj = {};
  const shortcut = {
    'Prod': (env) => env === 'prod',
    'Stage': (env) => env === 'stage',
    'Dev': (env) => env === 'dev',
    'Test': (env) => env === 'test',
    'Local': (env) => env === 'loacal',
  };

  context('The obj is bind shortcut in the prod environment', function () {
    bindShortcut(obj, shortcut, 'prod');

    it('should have isProd, isStage, isDev, isTest, isLocal attribute', function () {
      expect(obj).to.have.own.property('isProd')
      expect(obj).to.have.own.property('isStage')
      expect(obj).to.have.own.property('isDev')
      expect(obj).to.have.own.property('isTest')
      expect(obj).to.have.own.property('isLocal')
    });

    it('isProd should be true and ohter be false', function () {
      expect(obj.isProd).to.be.true;
      expect(obj.isStage).to.be.false;
      expect(obj.isDev).to.be.false;
      expect(obj.isTest).to.be.false;
      expect(obj.isLocal).to.be.false;
    });
  });
});
