import axios from "axios";
import { mapNodesAndText } from "./utils/translateDOM.js";
import { htmlStringToDOM } from "./utils/convert.js";

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

  async translateDOM(dom, sourceLanguage, targetLanguage, batchSize) {
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
    const batches = [];
    for (let i = 0; i < batchedTexts.length; i += batchSize) {
      batches.push(batchedTexts.slice(i, i + batchSize));
    }

    const promises = batches.map(async (batch) => {
      const combinedText = batch;
      const translated = await this.#translate(
        combinedText,
        this.#sourceLanguage,
        this.#targetLanguage,
        batchSize
      );

      batch.forEach((text, index) => {
        map.get(text).forEach((node) => {
          node.textContent = " " + translated[index].target + " ";
        });
      });
    });

    await Promise.all(promises);

    return dom;
  }

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
