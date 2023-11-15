import { JSDOM } from "jsdom";

export const htmlStringToDOM = (html) => {
  let dom;
  try {
    dom = new JSDOM(html);
  } catch (e) {
    throw new Error(
      `Error converting HTML string to DOM. Please check if the HTML string is valid. Error: ${e.message}`
    );
  }
  return dom.window.document.body;
};
