import normalize from './normalize';
// import { bindShortcut, ufunctionpdateShortcut, clearShortcut } from './shortcut';
import createShortcut from './createShortcut';


export default () => {
  let alias = {};
  let shortcutHandles = {};
  let originalEnv = null;


  const detector = policy => detector.detect(policy);
  detector.value = null;


  detector.detect = policy => {
    if (!('default' in policy)) throw new TypeError('[detect-env detect()] expect deault value');

    const name = detector.value;
    return policy[name] || policy.default;
  }


  detector.alias = table => {
    for (let name in table) {
      if (!(table[name] instanceof RegExp || typeof table[name] === 'function')) {
        const message = `[detect-env alias()]: each alias.xxx should be an RegExp or Function, but get ${typeof table[name]}`;
        throw new TypeError(message);
      }
    }
    alias = table;

    detector.value = normalize(originalEnv, alias);
    detector.is = createShortcut(shortcutHandles, detector.value);

    return detector;
  }

  detector.shortcut = function (handles) {
    for (let name in handles) {
      if (typeof handles[name] !== 'function') {
        const message = `[detect-env shortcut()]: each shortcut.xxx should be an Function, but get ${typeof handles[name]}`;
        throw new TypeError(message);
      }
    }

    shortcutHandles = handles;
    detector.is = createShortcut(handles, detector.value);
    return detector;
  }

  detector.envVariable = function (variable) {
    if (variable !== null && typeof variable === 'object' || typeof variable === 'function') {
      throw new TypeError(`[detect-env envVariable()] param should not be ${typeof variable}`);
    }

    originalEnv = variable;
    detector.value = normalize(variable, alias);
    detector.is = createShortcut(shortcutHandles, detector.value);

    return detector;
  }


  return detector;
}
