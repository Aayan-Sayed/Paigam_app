import { SarvamAIClient } from "sarvamai";
import type {
  TranslateSourceLanguage,
  TranslateSpeakerGender,
  TranslateTargetLanguage,
} from "sarvamai/api/types";

const Translate = async ({
  message,
  sender_lang,
  receiver_lang,
}: {
  message: string;
  sender_lang: TranslateSourceLanguage;

  receiver_lang: TranslateTargetLanguage;
}) => {
  const client = new SarvamAIClient({
    apiSubscriptionKey: process.env.SARVAM_API_KEY || "",
  });

  console.log(`Translating message: "${message}" to ${receiver_lang}`);
  const response = await client.text.translate({
    input: message,
    source_language_code: "auto",
    target_language_code: receiver_lang,
  });
  console.log("Translation response:", response);
  return response.translated_text;
};

export default Translate;
