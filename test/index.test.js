import { expect } from 'chai';
import env from '../src/jsnext';


describe('Default env detector', function () {

  context('Alias', function() {

    const easyRead = (variable) => {
      if (variable === undefined) return 'undefined';
      else if (variable === null) return null;
      else if (variable === '') return 'empty string';
      else return variable;
    }

    const prodAlias = ['prod', 'production'];
    prodAlias.forEach(function (envName) {
      process.env.NODE_ENV = envName;
      it(`should judge as prod env when process.env.NODE_ENV equal ${easyRead(envName)}`, function () {
        expect(env.detect({
          prod: 'prod.miaooo.me',
          default: 'default.miaooo.me',
        })).to.equal('prod.miaooo.me');
        expect(env({
          prod: 'prod.miaooo.me',
          default: 'default.miaooo.me',
        })).to.equal('prod.miaooo.me');
      });
    });

    const devAlias = ['dev', 'develop', 'development'];
    devAlias.forEach(function (envName) {
      it(`should judge as dev env when process.env.NODE_ENV equal '${easyRead(envName)}'`, function () {
        process.env.NODE_ENV = envName;

        expect(env.detect({
          dev: 'dev.miaooo.me',
          default: 'default.miaooo.me',
        })).to.equal('dev.miaooo.me');
        expect(env({
          dev: 'dev.miaooo.me',
          default: 'default.miaooo.me',
        })).to.equal('dev.miaooo.me');
      });
    });

    const stageAlias = ['stage', 'st'];
    stageAlias.forEach(function (envName) {
      it(`should judge as stage env when process.env.NODE_ENV equal '${easyRead(envName)}'`, function () {
        process.env.NODE_ENV = envName;

        expect(env.detect({
          stage: 'stage.miaooo.me',
          default: 'default.miaooo.me',
        })).to.equal('stage.miaooo.me');
        expect(env({
          stage: 'stage.miaooo.me',
          default: 'default.miaooo.me',
        })).to.equal('stage.miaooo.me');
      });
    });


    it("should judge as test env when process.env.NODE_ENV equal 'test'", function () {
        process.env.NODE_ENV = 'test';

        expect(env.detect({
          test: 'test.miaooo.me',
          default: 'default.miaooo.me',
        })).to.equal('test.miaooo.me');
        expect(env({
          test: 'test.miaooo.me',
          default: 'default.miaooo.me',
        })).to.equal('test.miaooo.me');
    });

    const localAlias = [undefined, null, 'local', ''];
    localAlias.forEach(function (envName) {
      it.skip(`should judge as local env when process.env.NODE_ENV equal ${easyRead(envName)}`, function () {
        process.env.NODE_ENV = envName;

        expect(env.detect({
          local: 'local.miaooo.me',
          default: 'default.miaooo.me',
        })).to.equal('local.miaooo.me');
        expect(env({
          local: 'local.miaooo.me',
          default: 'default.miaooo.me',
        })).to.equal('local.miaooo.me');
      });
    });
  });

  // context('Detect Function', function () {
  //   it('should throw error when param no default key')
  //   it('should return value that is specified for the current environment')
  //   it('should returns the default value when no value is specified for the current environment')
  //   it('should not throw err when default key is set to undefined, null, 0 or empty string')
  // });

  // context('Shortcut in the prod enviroment', function() {
  //   it ('isProd should be true')
  //   it ('isDev should be true')
  //   it ('isStage should be true')
  //   it ('isTest should be true')
  //   it ('isLocal should be true')
  // });

});
