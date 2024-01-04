/**
 * @description remove duplicates in array
 * @param {Object} arr array to filter
 * @returns
 */
export const removeDuplicates = (arr) => {
  return arr.filter((el, idx) => arr.indexOf(el) === idx);
};

/**
 * @description set the first character to uppercase
 * @param {string} str string to transform
 * @returns
 */
export const ucFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
