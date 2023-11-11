import { BhashiniTranslator } from "@probablyarth/bhashini";
const translator = new BhashiniTranslator(
  "58e362d3f7-f602-4ae6-bb29-5c72883f9a54",
  "a10ff891057547ba81fc48713426d89b"
);

translator.translateDOM(document.body, "en", "hi");
