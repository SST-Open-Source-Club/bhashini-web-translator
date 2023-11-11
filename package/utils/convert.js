import axios from "axios";

export const htmlStringToDOM = (html) => {
  let dom;
  try {
    const parser = new DOMParser();
    dom = parser.parseFromString(html, "text/html");
  } catch (e) {
    throw new Error(
      "An error occurred while converting html string to DOM object"
    );
  }
  return dom;
};

export const urlToDOM = async (url) => {
  let data;
  try {
    data = (await axios.get(url)).data;
  } catch (e) {
    throw new Error("An error occurred while fetching html from the url");
  }
  return htmlStringToDOM(data);
};
