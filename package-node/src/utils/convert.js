import { JSDOM } from "jsdom";

export const htmlStringToDOM = (html) => {
  const dom = new JSDOM(html);
  if (dom.window.document.body.textContent === html) {
    throw new Error(
      `Error converting HTML string to DOM. Please check if the HTML string is valid.`
    );
  }
  return dom.window.document.body;
};
