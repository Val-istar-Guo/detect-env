/**
 * Normalized the value according to the mapping table
 * @param {*} value The original value
 * @param {Object: Regexp|Function} table The mapping table
 */
export default function normalize(value, table) {
  for (let name in table) {
    if (typeof table[name] === 'function' && table[name](value)) return name;
    if (table[name] instanceof RegExp && table[name].test(value)) return name;
  }

  return value;
}
