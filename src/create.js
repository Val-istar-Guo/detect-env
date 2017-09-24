import normalize from './normalize';
import { bindShortcut, updateShortcut, clearShortcut } from './shortcut';


export default () => {
  let alias = {};
  let shortcut = {};
  let originalEnv = null;


  function detector(policy) {
    return detector.detect(policy);
  }

  detector.value = null;

  detector.detect = function detect(policy) {
    if (!('default' in policy)) throw new TypeError('[detect-env detect()] expect deault value');

    const name = detector.value;
    return policy[name] || policy.default;
  }


  detector.alias = function(table) {
    for (let name in table) {
      if (!(table[name] instanceof RegExp || typeof table[name] === 'function')) {
        const message = `[detect-env alias()]: each alias.xxx should be an RegExp or Function, but get ${typeof table[name]}`;
        throw new TypeError(message);
      }
    }
    alias = table;

    detector.value = normalize(originalEnv, alias);
    updateShortcut(detector, shortcut, detector.value);

    return detector;
  }

  detector.shortcut = function (newShortcut) {
    for (let name in newShortcut) {
      if (typeof newShortcut[name] !== 'function') {
        const message = `[detect-env shortcut()]: each shortcut.xxx should be an Function, but get ${typeof newShortcut[name]}`;
        throw new TypeError(message);
      }
    }

    const oldShortcut = shortcut;

    clearShortcut(detector, oldShortcut);
    shortcut = newShortcut;
    bindShortcut(detector, newShortcut, detector.value);

    return detector;
  }

  detector.envVariable = function (variable) {
    if (variable !== null && typeof variable === 'object' || typeof variable === 'function') {
      throw new TypeError(`[detect-env envVariable()] param should not be ${typeof variable}`);
    }

    originalEnv = variable;
    detector.value = normalize(variable, alias);
    updateShortcut(detector, shortcut, detector.value);

    return detector;
  }

  return detector;
}
