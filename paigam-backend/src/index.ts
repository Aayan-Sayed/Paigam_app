import express from "express";
import Translate from "./translate";
import SendMessage from "./message";
import GroupMessage from "./group_message";
import { SarvamHandler } from "./sarvam/SarvamHandler";
import UploadAudio from "./s3";
import supabase from "../supabase";

const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/chat", async (req: express.Request, res: express.Response) => {
  const { message, sender, receiver, sender_lang, receiver_lang } = req.body;
  console.log(
    `Received message from ${sender} to ${receiver}: "${message}" in ${sender_lang} to be translated to ${receiver_lang}`
  );
  const translated_text = await Translate({
    message,
    sender_lang,
    receiver_lang,
  });

  if (translated_text) {
    const message_ = SendMessage(translated_text, {
      message,
      sender_id: sender,
      receiver_id: receiver,
      language: receiver_lang,
    });
    res.send(message_);
    res.status(200);
  } else {
    res.status(500);
  }
});

// Backend route handler for voice notes
app.post('/voicenote', async (req, res) => {
  try {
    console.log('backend received a voice note request');
    
    const { 
      sender, 
      receiver, 
      sender_lang, 
      receiver_lang, 
      audio, // This is now base64 string
      duration, 
      type 
    } = req.body;

    // Convert base64 to Buffer
    const audioBuffer = Buffer.from(audio, 'base64');
    
    // Transcribe the audio using the buffer directly
    const transcription = await SarvamHandler.transcribeAudio(audioBuffer, 'audio/m4a');
    console.log('Transcription:', transcription);

    // Translate the transcribed text
    const translatedText = await SarvamHandler.translateText(
      transcription, 
      sender_lang, 
      receiver_lang
    );
    console.log('Translation:', translatedText);

    // Generate speech from the translated text
    const translatedAudioBuffer = await SarvamHandler.generateSpeech(
      translatedText, 
      receiver_lang, 
      'abhilash'
    );

    // Convert the translated audio to base64 for storage
    const translatedAudioBase64 = translatedAudioBuffer.toString('base64');

    // Store the voice message in your database
    const { data, error } = await supabase
      .from("chats")
      .insert([
        {
          sender_id: sender,
          receiver_id: receiver,
          message: `data:audio/m4a;base64,${translatedAudioBase64}`, // Original transcribed text
          translated_message: transcription,
          type: "voice", // Store as data URL
          language: receiver_lang,
          status: "sent",
        },
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to save voice message' });
    }

    console.log('Voice message processed successfully');
    res.json({ 
      success: true, 
      message: 'Voice message sent successfully',
      data: data[0]
    });

  } catch (error) {
    console.error('Error processing voice message:', error);
    res.status(500).json({ 
      error: 'Failed to process voice message',
      details: error.message 
    });
  }
});

app.post("/group-chat", async (req, res) => {
  const { group_id, sender_id, message, sender_lang } = req.body;
  await GroupMessage({ group_id, sender_id, message, sender_lang });
  res.status(200).send("Message sent successfully");
});

app.post("/translate", async (req, res) => {
  const { msg, sender_lang, receiver_lang } = req.body;
  const translated_text = await Translate({
    message: msg,
    sender_lang,
    receiver_lang,
  });
  console.log(translated_text);
  if (translated_text) {
    res.status(200).send(translated_text);
  } else {
    res.status(500).send("Translation failed");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
