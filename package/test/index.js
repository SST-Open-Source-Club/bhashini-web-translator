import { BhashiniTranslator } from "@probablyarth/bhashini";
import { config } from "dotenv";

config({ path: ".env" });

const translator = new BhashiniTranslator(
  process.env.BHASHINI_API_KEY,
  process.env.BHASHINI_USER_ID
);

translator.translateHTMLstring("<p>Hi</p>").then(console.log);
