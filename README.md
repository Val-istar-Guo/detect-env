# DETECT-ENV

[![npm](https://img.shields.io/npm/v/detect-env.svg?style=flat-square)](https://www.npmjs.com/package/detect-env)
[![npm](https://img.shields.io/npm/dm/detect-env.svg?style=flat-square)](https://www.npmjs.com/package/detect-env)

## Install

```
npm install detect-env
```

## Usage

### Use default config

```javascript
import env from 'detect-env';

const NEXT_PAGE_URL = env({
  // if you want to set NET_PAGE_URL = 'prod.example.com'
  // process.env.NODE_ENV can be 'prod' or 'production' according to alias setting
  // but key's name mast be 'prod' according to alias setting
  // if you want to change it, set alias to what you want
  // for better performance, the neat code, the key name must be static
  // rather than automatically correct according to the alias
  prod: 'prod.example.com',
  test: 'test.example.com',
  default: 'dev.example.com',
});

// env.detect() is equal to env()
// I recommend you use env.detect() because it is more readable
// so you can write it as well
const NEXT_PAGE_URL = env.detect({
  prod: 'prod.example.com',
  test: 'test.example.com',
  default: 'dev.example.com',
});


// Suppose process.env.NODE_ENV = 'prod'
console.log(env.isProd); // true
console.log(env.isDev); // false
console.log(env.isTest); // false
console.log(env.isStage); // false
console.log(env.isLocal); // false


// You no longer need to write these obscure code
let NEXT_PAGE_URL;
switch(process.env.NODE_ENV) {
  case 'prod':
    NEXT_PAGE_URL = 'prod.example.com';
    break;
  case 'test':
    NEXT_PAGE_URL = 'test.example.com';
    break;
  default:
    NEXT_PAGE_URL = 'dev.example.com';
}

// Also equal to
const NEXT_PAGE_URL = process.env.NODE_ENV === 'prod' ?
  'prod.example.com' : process.env.NODE_ENV === 'test' ?
  'test.example.com' : 'dev.example.com';

// More example
const getGoodsPageUrl = env.detect({
  prod: id => `prod.example.com?${id}`,
  staging: id => `staging.example.com?${id}`,
  default:id => `dev.example.com?${id}`,
});
```

### Custom Config

`Custom Config` can be use at `version >= 2.0.0`.
Default config may not be able to meet everyone's needs.
You can custom alias, shortcut and env variable.

```javascript
// env.js
import { create } from 'detect-env';


export default create()
  .alias({
    // accept RegExp or function
    // function must return true or false
    prod: /^production$/,
    dev: /^develop(ment)?$/,
    stage: /^st$/,
    local: (envName) => envName === undefined || envName === null || /(locale)|(^$)/.test(envName),
    your_key: your_regexp_or_function,
  })
  .shortcut({
    // The return value of the function will be used to set env.isProd
    // if process.env.NODE_ENV = 'production'
    // envName = 'prod' because alias setting
    'Prod': (envName) => envName === 'prod',
    'Stage': (envName) => envName === 'stage',
    'Dev': (envName) => envName === 'dev',
    'Test': (envName) => envName === 'test',
    'Local': (envName) => envName === 'loacal',
  })
  .envVariable(() => process.env.NODE_ENV)
  // also accept string
  // .envVariable(process.env.NODE_ENV)
```

Then, you can use env in another file:

```javascript
// index.js
import env from './env';

const NEXT_PAGE_URL = env.detect({
  prod: 'prod.example.com',
  test: 'test.example.com',
  default: 'dev.example.com',
});
```

