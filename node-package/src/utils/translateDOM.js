const IGNORE_NODES = ["SCRIPT", "STYLE"];

/**
 *
 * @param {HTMLElement} rootElement
 * @param {Array<Array<HTMLElement>>} arr
 * @param {number} batchSize
 */
export const levelOrderTraverse = (rootElement, arr, batchSize) => {
  if (!rootElement) return;

  const queue = [rootElement];

  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const element = queue.shift();

      if (
        element.nodeType === 3 &&
        element.textContent.trim().replaceAll("\n", "")
      ) {
        if (arr.length === 0 || arr[arr.length - 1].length === batchSize) {
          arr.push([element]);
        } else {
          arr[arr.length - 1].push(element);
        }
      } else if (
        element.nodeType === 1 &&
        !IGNORE_NODES.includes(element.nodeName)
      ) {
        element.childNodes.forEach((child) => {
          queue.push(child);
        });
      }
    }
  }
};
