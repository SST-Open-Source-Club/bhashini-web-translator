import axios from "axios";
import { mapNodesAndText } from "./utils/translateDOM";

export class BhashiniTranslator {
  #pipelineData;
  #apiKey;
  #userID;
  #sourceLanguage;
  #targetLanguage;

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
    return true;
  }

  async #translate(content, sourceLanguage, targetLanguage) {
    if (!this.#pipelineData) {
      throw new Error("pipelineData not found");
    }
    const callbackURL =
      this.#pipelineData.pipelineInferenceAPIEndPoint.callbackUrl;
    const inferenceApiKey =
      this.#pipelineData.pipelineInferenceAPIEndPoint.inferenceApiKey.value;
    const serviceId =
      this.#pipelineData.pipelineResponseConfig[0].config.serviceId;
    const resp = await axios.post(
      callbackURL,
      JSON.stringify({
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
          input: [
            {
              source: content,
            },
          ],
        },
      }),
      {
        headers: {
          Authorization: inferenceApiKey,
          "Content-type": "application/json",
        },
      }
    );
    return resp.data.pipelineResponse[0].output[0].target;
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
    map.forEach(async (nodes, text) => {
      const translated = await this.#translate(
        text,
        this.#sourceLanguage,
        this.#targetLanguage
      );
      nodes.forEach((node) => {
        node.textContent = translated;
      });
    });
  }
}
