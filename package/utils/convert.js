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
