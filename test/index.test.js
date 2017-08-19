import detectEnv, { create } from '../src/jsnext';
// const detectEnv = require('../dist/bundle');
// const { create } = require('../dist/bundle');

test('throw error when detectEnv param no default key', () => {
  expect(() => {
    detectEnv({
      production: {
        host: 'miaooo.me',
      },
      develop: {
        host: 'test.miaooo.me',
      },
    });
  }).toThrow();
});

test('return value that key equal process.env.NODE_ENV', () => {
  process.env.NODE_ENV = 'test';

  expect(detectEnv({
    production: 'miaooo.me',
    test: 'test.miaooo.me',
    default: 'dev.miaooo.me',
  })).toBe('test.miaooo.me');
});

test('return default value when no obj key equal process.env.NODE_ENV', () => {
  process.env.NODE_ENV = 'develop';

  expect(detectEnv({
    production: 'miaooo.me',
    default: 'dev.miaooo.me',
  })).toBe('dev.miaooo.me');
});

test('do not throw error when set `default = undefined`', () => {
  process.env.NODE_ENV = 'develop';

  expect(detectEnv({
    production: true,
    default: undefined,
  })).toBeUndefined();
});

test('alias is effective', () => {
  const env = create()
    .alias({
      production: /pd/,
    });

  process.env.NODE_ENV = 'pd';

  expect(env({
    production: 'prod.miaooo.me',
    default: 'default.miaooo.me',
  })).toBe('prod.miaooo.me');
});

test('custom envVariable', () => {
  const envVariable = 'prod';

  const env = create()
    .envVariable(() => envVariable);

  expect(env.detect({
    prod: 'prod.miaooo.me',
    default: 'default.miaooo.me',
  })).toBe('prod.miaooo.me');

  expect(env.detect({
    production: 'prod.miaooo.me',
    default: 'default.miaooo.me',
  })).toBe('default.miaooo.me');
});

test('shortcut test and custom shortcut', () => {
  process.env.NODE_ENV = 'st';
  let env = create();

  expect(env.isStage).toBeTruthy();
  expect(env.isProd).not.toBeTruthy();
  expect(env.isLocal).not.toBeTruthy();
  expect(env.isDev).not.toBeTruthy();
  expect(env.isTest).not.toBeTruthy();


  process.env.NODE_ENV = 't';
  env = create()
    .shortcut({
      'Test': (envName) => envName === 't',
    })

  expect(env.isTest).toBeTruthy();
  expect(env.isProd).toBeUndefined();

});
