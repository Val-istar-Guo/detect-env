# DETECT-ENV

[![npm](https://img.shields.io/npm/v/detect-env.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dm/detect-env.svg?style=flat-square)]()

# Install

```
npm install detect-env
```

```
yarn add detect-env
```

## Usage

```javascript
const NEXT_PAGE_URL = detectEnv({
  production: 'prod.example.com',
  test: 'test.example.com',
  default: 'dev.example.com',
});

// It is equal to
let NEXT_PAGE_URL;
switch(process.env.NODE_ENV) {
  case 'production':
    NEXT_PAGE_URL = 'prod.example.com';
    break;
  case 'test':
    NEXT_PAGE_URL = 'test.example.com';
    break;
  default:
    NEXT_PAGE_URL = 'dev.example.com';
}

// Also equal to
const NEXT_PAGE_URL = process.env.NODE_ENV === 'production' ?
  'prod.example.com' : process.env.NODE_ENV === 'test' ?
  'test.example.com' : 'dev.example.com';

// More example
const getGoodsPageUrl = detectEnv({
  prod: id => `prod.example.com?${id}`,
  staging: id => `staging.example.com?${id}`,
  default:id => `dev.example.com?${id}`,
});
```
