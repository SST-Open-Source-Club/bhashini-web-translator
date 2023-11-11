import { BhashiniTranslator } from "@scaler-school-of-technology/bhashini-web-translator";
import { config } from "dotenv";

config({ path: ".env" });

const translator = new BhashiniTranslator(
  process.env.BHASHINI_API_KEY,
  process.env.BHASHINI_USER_ID
);
translator.translateDOM(document.body, "en", "hi");

translator.translateHTMLstring("<p>Hi</p>", "en", "hi").then((d) => {
  console.log(d);
});
