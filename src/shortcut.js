/**
 * Bind the shortcut keys that determine the environment to the object
 * @param {Object} obj The object to be bundle
 * @param {Object: Function} shortcut the shortcut mapping table
 * @param {*} env The environment variable
 */
export function bindShortcut(obj, shortcut, env) {
  for (let name in shortcut) {
    obj[`is${name}`] = shortcut[name](env);
  }
}

export function updateShortcut(...arg) {
  bindShortcut(...arg);
}

/**
 * Clean up the shortcut keys on the object
 * @param {Object} obj The object to be clear shortcut
 * @param {Object: Function} shortcut THe shortcut used in bindShortcut
 */
export function clearShortcut(obj, shortcut) {
  for (let name in shortcut) {
    delete obj[`is${name}`];
  }
}
