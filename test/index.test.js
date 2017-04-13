import detectEnv from '../src';

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
