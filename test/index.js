import { BhashiniTranslator } from "@probablyarth/bhashini";
const translator = new BhashiniTranslator("<apiKey>", "<userID>");

translator.translateDOM(document.body, "en", "hi");
