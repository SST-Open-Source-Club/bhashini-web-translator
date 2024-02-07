import axios from "axios";
import { levelOrderTraverse } from "./utils/translateDOM.js";
import { htmlStringToDOM } from "./utils/convert.js";

class BhashiniTranslator {
  /**
   * @type {{pipelineInferenceAPIEndPoint: {callbackUrl: String; inferenceApiKey: {value: String}}}; pipelineResponseConfig: Array<{config: {serviceId: String}}>}}
   */
  #pipelineData;
  /**
   * @type {String}
   */
  #apiKey;
  /**
   * @type {String}
   */
  #userID;
  /**
   * @type {String}
   */
  #sourceLanguage;
  /**
   * @type {String}
   */
  #targetLanguage;
  /**
   * @type {Number}
   */
  failcount = 0;

  /**
   *
   * @param {String} apiKey
   * @param {String} userID
   */
  constructor(apiKey, userID) {
    if (!apiKey || !userID) {
      throw new Error("Invalid credentials");
    }
    this.#apiKey = apiKey;
    this.#userID = userID;
  }

  /**
   *
   * @param {String} sourceLanguage
   * @param {String} targetLanguage
   */
  async #getPipeline(sourceLanguage, targetLanguage) {
    this.#sourceLanguage = sourceLanguage;
    this.#targetLanguage = targetLanguage;
    const apiUrl =
      "https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline";

    const response = await axios.post(
      apiUrl,
      JSON.stringify({
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
      {
        headers: {
          ulcaApiKey: this.#apiKey,
          userID: this.#userID,
          "Content-Type": "application/json",
        },
      }
    );

    this.#pipelineData = response.data;
  }
  /**
   *
   * @param {Array<String>} contents
   * @param {String} sourceLanguage
   * @param {String} targetLanguage
   * @returns {Promise<Array<{source: String; target: String}>>}
   */
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
      return await this.#translate(contents, sourceLanguage, targetLanguage);
    }
    try {
      let v = resp.pipelineResponse[0].output;
    } catch (e) {
      if (this.failcount > 10)
        throw new Error(
          "Failed getting a response from the server after 10 tries"
        );
      this.failcount++;
      this.#getPipeline(sourceLanguage, targetLanguage);
      return await this.#translate(contents, sourceLanguage, targetLanguage);
    }
    this.failcount = 0;
    return resp.pipelineResponse[0].output;
  }
  /**
   *
   * @param {HTMLElement} dom
   * @param {String} sourceLanguage
   * @param {String} targetLanguage
   * @param {Number} batchSize
   * @returns {Promise<HTMLElement>}
   */
  async translateDOM(dom, sourceLanguage, targetLanguage, batchSize) {
    if (
      !this.#pipelineData ||
      this.#sourceLanguage !== sourceLanguage ||
      this.#targetLanguage !== targetLanguage
    ) {
      await this.#getPipeline(sourceLanguage, targetLanguage);
    }
    /**
     * @type {Array<Array<HTMLElement>>}
     */
    const nodes2d = [];
    /**
     * @type {Array<Promise<void>>}
     */
    const promises = [];
    levelOrderTraverse(dom, nodes2d, batchSize);
    for (const nodes of nodes2d) {
      promises.push(
        new Promise(async (res) => {
          const translatedList = await this.#translate(
            nodes.map((node) => node.textContent),
            sourceLanguage,
            targetLanguage
          );
          nodes.forEach((node, idx) => {
            node.textContent = translatedList[idx].target;
          });
          res();
        })
      );
    }
    await Promise.all(promises);

    return dom;
  }
  /**
   *
   * @param {String} html
   * @param {String} sourceLanguage
   * @param {String} targetLanguage
   * @param {Number} batchSize
   * @returns {Promise<HTMLElement>}
   */
  async translateHTMLstring(html, sourceLanguage, targetLanguage, batchSize) {
    const dom = htmlStringToDOM(html);
    const translated = await this.translateDOM(
      dom,
      sourceLanguage,
      targetLanguage,
      batchSize
    );
    return translated;
  }
}

export default BhashiniTranslator;
