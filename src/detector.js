import create from './create';


export default create()
  .alias({
    prod: /^production$/,
    dev: /^develop(ment)?$/,
    stage: /^st$/,
    local: (envName) => envName === undefined || envName === null || /(local)|(^$)/.test(envName),
  })
  .shortcut({
    Prod: (envName) => envName === 'prod',
    Stage: (envName) => envName === 'stage',
    Dev: (envName) => envName === 'dev',
    Test: (envName) => envName === 'test',
    Local: (envName) => envName === 'loacal',
  })
  .envVariable(process ? process.env.NODE_ENV : '');
