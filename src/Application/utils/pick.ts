/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Create an object composed of the picked object properties
 * @param object - The source object
 * @param keys - An array of keys to pick from the object
 * @returns An object composed of the picked properties
 */
export const pick = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[]
): Pick<T, K> => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {} as Pick<T, K>);
};
