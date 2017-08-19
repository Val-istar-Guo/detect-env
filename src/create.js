export default () => {
  let alias = {
    prod: /^production$/,
    dev: /^develop(ment)?$/,
    stage: /^st$/,
    local: (envName) => envName === undefined || envName === null || /(locale)|(^$)/.test(envName),
  };

  let shortcut = {
    'Prod': (envName) => envName === 'prod',
    'Stage': (envName) => envName === 'stage',
    'Dev': (envName) => envName === 'dev',
    'Test': (envName) => envName === 'test',
    'Local': (envName) => envName === 'loacal',
  };

  let getEnvVariable = () => process.env.NODE_ENV;

  function matchAlias(value) {
    for (let name in alias) {
      if (typeof alias[name] === 'function' && alias[name](value)) return name;
      if (alias[name] instanceof RegExp && alias[name].test(value)) return name;
    }

    return value;
  }

  function detector(policy) {
    return detector.detect(policy);
  }

  function clearShortcut() {
    for (let name in shortcut) {
      delete detector[`is${name}`];
    }
  }
  function updateShortcut() {
    const envVariable = getEnvVariable();
    const envName = matchAlias(envVariable);

    for (let name in shortcut) {
      detector[`is${name}`] = shortcut[name](envName);
    }
  }

  detector.detect = function detect(policy) {
    if (!('default' in policy)) throw new Error('detectEnv expect deault value');

    const envVariable = getEnvVariable();
    const name = matchAlias(envVariable);

    return policy[name] || policy.default;
  }


  detector.alias = function(map) {
    for (let name in map) {
      if (!(map[name] instanceof RegExp || typeof map[name] !== 'function'))
        throw new TypeError('[DetectEnv alias]: each alias.xxx should be an RegExp or Function');
    }

    alias = map;

    updateShortcut();
    return detector;
  }

  detector.shortcut = function (map) {
    for (let name in map) {
      if (typeof map[name] !== 'function')
        throw new TypeError('[detect-env shortcut]: each shortcut.xxx should be an Function');
    }

    clearShortcut();
    shortcut = map;

    updateShortcut();
    return detector;
  }

  detector.envVariable = function (variable) {
    if (typeof variable === 'function') {
      getEnvVariable = variable;
    } else {
      getEnvVariable = () => variable;
    }

    updateShortcut();
    return detector;
  }

  updateShortcut();
  return detector;
}

