import create from './create';


export default create()
  .alias({
    prod: /^production$/,
    dev: /^develop(ment)?$/,
    stage: /^st$/,
    local: (envName) => envName === undefined || envName === null || /(local)|(^$)/.test(envName),
  })
  .shortcut({
    prod: (envName) => envName === 'prod',
    stage: (envName) => envName === 'stage',
    dev: (envName) => envName === 'dev',
    test: (envName) => envName === 'test',
    local: (envName) => envName === 'loacal',
  })
  .envVariable(process ? process.env.NODE_ENV : '');
