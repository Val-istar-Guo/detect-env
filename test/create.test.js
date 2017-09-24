import { expect } from 'chai';
import create from '../src/create';


describe('env creator', function () {
  it('can custom environment variables with string, null, undefined or number', function () {
    expect(create().envVariable('hello word').value).to.be.equal('hello word');
    expect(create().envVariable('').value).to.be.equal('');
    expect(create().envVariable(null).value).to.be.null;
    expect(create().envVariable(undefined).value).to.be.undefined;
    expect(create().envVariable(0).value).to.be.equal(0);
    expect(create().envVariable(1234).value).to.be.equal(1234);
  });

  it('should throw an error when custom enviroment variables with object(except null) and function', function () {
    expect(() => create().envVariable({})).to.throw(TypeError);
    expect(() => create().envVariable(function () {})).to.throw(TypeError);
    expect(() => create().envVariable(() => {})).to.throw(TypeError);
  });

  it('can custom alias', function () {
    const env = create()
      .alias({
        server: /ssr/,
        client: (env) => env === 'cl',
      });

    env.envVariable('cl');
    expect(env.value).to.be.equal('client');

    env.envVariable('client');
    expect(env.value).to.be.equal('client');

    env.envVariable('ssr');
    expect(env.value).to.be.equal('server');

    env.envVariable('server');
    expect(env.value).to.be.equal('server');
  });


  it('can custom shortcut', function () {
    const env = create()
      .shortcut({
        Fool: (env) => env === 'fool' || env === 'idiot',
        Idiot: (env) => env === 'idiot',
        Genius: (env) => env === 'Genius',
      })
      .envVariable('idiot');

    console.log(env);
    expect(env.isFool).to.be.true;
    expect(env.isIdiot).to.be.true;
    expect(env.isGenius).to.be.false;
  });
});
