import { expect } from 'chai';
import env from '../src/detector';


describe('Default env detector:', function () {
  const easyRead = (variable) => {
    if (variable === undefined) return 'undefined';
    else if (variable === null) return null;
    else if (variable === '') return 'empty string';
    else return variable;
  }

  const prodAlias = ['prod', 'production'];
  prodAlias.forEach(function (envName) {
    it(`should judge as prod env when process.env.NODE_ENV equal ${easyRead(envName)}`, function () {
      env.envVariable(envName);
      expect(env.value).to.equal('prod');
    });
  });

  const devAlias = ['dev', 'develop', 'development'];
  devAlias.forEach(function (envName) {
    it(`should judge as dev env when process.env.NODE_ENV equal '${easyRead(envName)}'`, function () {
      env.envVariable(envName);
      expect(env.value).to.equal('dev');
    });
  });

  const stageAlias = ['stage', 'st'];
  stageAlias.forEach(function (envName) {
    it(`should judge as stage env when process.env.NODE_ENV equal '${easyRead(envName)}'`, function () {
      env.envVariable(envName);
      expect(env.value).to.equal('stage');
    });
  });

  it("should judge as test env when process.env.NODE_ENV equal 'test'", function () {
    env.envVariable('test');
    expect(env.value).to.equal('test');
  });

  const localAlias = [undefined, null, 'local', ''];
  localAlias.forEach(function (envName) {
    it(`should judge as local env when process.env.NODE_ENV equal ${easyRead(envName)}`, function () {
      env.envVariable(envName);
      expect(env.value).to.equal('local');
    });
  });

  context('Detect Function', function () {
    it('should throw error when param no default key', function () {
      expect(() => env.detect({
        prod: 'prod.miaooo.me',
      })).to.throw(TypeError);
    });

    it('should return value that is specified for the current environment', function () {
      env.envVariable('prod');
      expect(env.detect({
        prod: 'prod.miaooo.me',
        local: 'local.miaooo.me',
        default: 'default.miaooo.me',
      })).to.equal('prod.miaooo.me');

      env.envVariable(null);
      expect(env({
        prod: 'prod.miaooo.me',
        local: 'local.miaooo.me',
        default: 'default.miaooo.me',
      })).to.equal('local.miaooo.me');

      env.envVariable(undefined);
      expect(env({
        prod: undefined,
        local: 'local.miaooo.me',
        default: 'default.miaooo.me',
      })).to.equal('local.miaooo.me');
    });

    it('should returns the default value when no value is specified for the current environment', function () {
      env.envVariable('test');
      expect(env.detect({
        prod: null,
        local: 'local.miaooo.me',
        default: 'default.miaooo.me',
      })).to.equal('default.miaooo.me');
    });

    it('should not throw err when default key is set to undefined, null, 0 or empty string', function () {
      env.envVariable('test');

      expect(() => env.detect({
        prod: 'prod.miaooo.me',
        default: null,
      })).to.not.throw();

      expect(() => env.detect({
        prod: 'prod.miaooo.me',
        default: undefined,
      })).to.not.throw();

      expect(() => env.detect({
        prod: 'prod.miaooo.me',
        default: 0,
      })).to.not.throw();

      expect(() => env.detect({
        prod: 'prod.miaooo.me',
        default: '',
      })).to.not.throw();
    })
  });

  context('Shortcut in the prod enviroment', function() {
    before(function () {
      env.envVariable('prod');
    });

    it ('isProd should be true', function () {
      expect(env.isProd).to.be.true;
    })
    it ('isDev should be true', function () {
      expect(env.isDev).to.be.false;
    })
    it ('isStage should be true', function () {
      expect(env.isStage).to.be.false;
    })
    it ('isTest should be true', function () {
      expect(env.isTest).to.be.false;
    })
    it ('isLocal should be true', function () {
      expect(env.isLocal).to.be.false;
    })
  });

});
