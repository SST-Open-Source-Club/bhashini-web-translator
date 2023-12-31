const IGNORE_NODES = ["SCRIPT", "STYLE"];

export const mapNodesAndText = (element, map) => {
  if (
    element &&
    element.nodeType === 3 &&
    element.textContent.trim().replaceAll("\n", "")
  ) {
    let text = element.textContent.trim();
    if (map.has(text)) {
      map.get(text).push(element);
    } else {
      map.set(text, [element]);
    }
  } else if (
    element &&
    element.nodeType === 1 &&
    !IGNORE_NODES.includes(element.nodeName)
  ) {
    element.childNodes.forEach((child) => {
      mapNodesAndText(child, map);
    });
  }
};
