import { SarvamAIClient } from "sarvamai";
import { TextToSpeechLanguage, TextToSpeechSpeaker } from "sarvamai/api/types";
import fs from "fs";
import path from "path";

const API_KEY = "94ccfa46-a745-4ab8-83e0-8bc0f19cbb37";
const client = new SarvamAIClient({ apiSubscriptionKey: API_KEY });

const transcribeAudio = async (
  audioBuffer: Buffer,
  originalMimeType: string = "audio/m4a"
): Promise<string> => {
  let tempFilePath = null;
  try {
    // Create a temporary file with the correct extension and MIME type
    const tempDir = "./temp";
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Try treating the M4A as WAV (sometimes works for simple audio)
    tempFilePath = path.join(tempDir, `temp_audio_${Date.now()}.wav`);

    // Write buffer to temporary file
    fs.writeFileSync(tempFilePath, audioBuffer);

    // Create File object with WAV MIME type
    const fileBuffer = fs.readFileSync(tempFilePath);
    const file = new File([fileBuffer], "audio-input.wav", {
      type: "audio/wav",
    });

    const response = await client.speechToText.translate(file, {
      model: "saaras:v2",
    });

    console.log("Transcription response:", response);
    return response.transcript || "No transcription available";
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error(`Failed to transcribe audio: ${error.message}`);
  } finally {
    // Clean up temporary file
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
      } catch (cleanupError) {
        console.warn("Failed to cleanup temp file:", cleanupError.message);
      }
    }
  }
};

const translateText = async (
  text: string,
  sourceLang: string = "en-IN",
  targetLang: string = "ta-IN"
): Promise<string> => {
  try {
    const response = await client.text.translate({
      input: text,
      source_language_code: sourceLang,
      target_language_code: targetLang,
      speaker_gender: "Male",
    });
    console.log("Translation response:", response);
    return response.translated_text;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error(`Failed to translate text: ${error.message}`);
  }
};

const generateSpeech = async (
  text: string,
  language: TextToSpeechLanguage = "ta-IN",
  speaker: TextToSpeechSpeaker = "abhilash"
): Promise<Buffer> => {
  try {
    const response = await client.textToSpeech.convert({
      text: text,
      target_language_code: language,
      model: "bulbul:v2",
      speaker: speaker,
    });

    if (!response || !response.audios || !response.audios[0]) {
      throw new Error("No audio data received");
    }

    return Buffer.from(response.audios[0], "base64");
  } catch (error) {
    console.error("Text-to-speech error:", error);
    throw new Error(`Failed to generate speech: ${error.message}`);
  }
};

export const SarvamHandler = {
  transcribeAudio,
  translateText,
  generateSpeech,
};
