/**
 *
 * @param {String} html
 * @returns {HTMLElement}
 */
export const htmlStringToDOM = (html) => {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html").body;
};
