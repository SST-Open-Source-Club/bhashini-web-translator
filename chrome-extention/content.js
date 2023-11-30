const htmlStringToDOM = (html) => {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html").body;
};
const IGNORE_NODES = ["SCRIPT", "STYLE"];

const mapNodesAndText = (element, map) => {
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

// import BhashiniTranslator from "./utils/translate";
class BhashiniTranslator {
  #pipelineData;
  #apiKey;
  #userID;
  #sourceLanguage;
  #targetLanguage;
  failcount = 0;
  constructor(apiKey, userID) {
    if (!apiKey || !userID) {
      throw new Error("Invalid credentials");
    }
    this.#apiKey = apiKey;
    this.#userID = userID;
  }

  async #getPipeline(sourceLanguage, targetLanguage) {
    this.#sourceLanguage = sourceLanguage;
    this.#targetLanguage = targetLanguage;
    const apiUrl =
      "https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        ulcaApiKey: this.#apiKey,
        userID: this.#userID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: "translation",
            config: {
              language: {
                sourceLanguage,
                targetLanguage,
              },
            },
          },
        ],
        pipelineRequestConfig: {
          pipelineId: "64392f96daac500b55c543cd",
        },
      }),
    });

    const data = await response.json();
    this.#pipelineData = data;
  }

  async #translate(contents, sourceLanguage, targetLanguage) {
    if (!this.#pipelineData) {
      throw new Error("pipelineData not found");
    }
    const callbackURL =
      this.#pipelineData.pipelineInferenceAPIEndPoint.callbackUrl;
    const inferenceApiKey =
      this.#pipelineData.pipelineInferenceAPIEndPoint.inferenceApiKey.value;
    const serviceId =
      this.#pipelineData.pipelineResponseConfig[0].config.serviceId;
    let resp;
    try {
      // making an input array
      const inputArray = contents.map((content) => ({
        source: content,
      }));

      resp = await fetch(callbackURL, {
        method: "POST",
        headers: {
          Authorization: inferenceApiKey,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          pipelineTasks: [
            {
              taskType: "translation",
              config: {
                language: {
                  sourceLanguage,
                  targetLanguage,
                },
                serviceId,
              },
            },
          ],
          inputData: {
            input: inputArray,
          },
        }),
      }).then((res) => res.json());
    } catch (e) {
      if (this.failcount > 10)
        throw new Error(
          "Failed getting a response from the server after 10 tries"
        );
      this.failcount++;
      this.#getPipeline(sourceLanguage, targetLanguage);
      resp = await this.#translate(contents, sourceLanguage, targetLanguage);
    }
    this.failcount = 0;
    return resp.pipelineResponse[0].output;
  }

  async translateDOM(dom, sourceLanguage, targetLanguage) {
    if (
      !this.#pipelineData ||
      this.#sourceLanguage !== sourceLanguage ||
      this.#targetLanguage !== targetLanguage
    ) {
      await this.#getPipeline(sourceLanguage, targetLanguage);
    }

    const map = new Map();
    mapNodesAndText(dom, map);

    const batchedTexts = Array.from(map.keys());

    // Split the array into batches (e.g., batches of 10)
    const batchSize = 10;
    const batches = [];
    for (let i = 0; i < batchedTexts.length; i += batchSize) {
      batches.push(batchedTexts.slice(i, i + batchSize));
    }

    console.log(batches);

    const promises = batches.map(async (batch) => {
      // Combine texts in the batch
      const combinedText = batch;
      const translated = await this.#translate(
        combinedText,
        this.#sourceLanguage,
        this.#targetLanguage
      );

      // Update each node in the batch with its corresponding translated text
      batch.forEach((text, index) => {
        map.get(text).forEach((node) => {
          // Check if the node's content matches the original text
          node.textContent = translated[index].target;
        });
      });
    });

    await Promise.all(promises);

    return dom;
  }

  ////
  ////

  async translateHTMLstring(html, sourceLanguage, targetLanguage) {
    const dom = htmlStringToDOM(html);
    const translated = await this.translateDOM(
      dom,
      sourceLanguage,
      targetLanguage
    );
    return translated;
  }
}

// calling the library here
// need to send data from the popup here to and then call the api
// only trigger a this function if a reviece a message from the popup

const Bhashini = new BhashiniTranslator(
  "019a562b7f-bb9c-4440-8b79-11b170353130",
  "48115d2ab7f24c55b8b29af34806050c"
);

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "translateContent") {
    const response = await Bhashini.translateDOM(
      document.body,
      request.sourceLanguage,
      request.targetLanguage
    );

    // const respopnse = await

    sendResponse({ msg: "successfup" });

    console.log("response", response);
  }
});
