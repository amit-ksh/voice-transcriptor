const { Deepgram } = require("@deepgram/sdk");

// The API key you created in step 1
const deepgramApiKey = "e0ee7f2b6d4462fcddeae15eb967ac0607bc428b";

const AUDIO_URL =
  "https://static.deepgram.com/examples/Bueller-Life-moves-pretty-fast.wav";

// Initializes the Deepgram SDK
const deepgram = new Deepgram(deepgramApiKey);

console.log("Requesting transcript...");
console.log("Your file may take up to a couple minutes to process.");
console.log(
  "While you wait, did you know that Deepgram accepts over 40 audio file formats? Even MP4s."
);
console.log(
  "To learn more about customizing your transcripts check out developers.deepgram.com."
);

deepgram.transcription
  .preRecorded({ url: AUDIO_URL }, { punctuate: true })
  .then((transcription) => {
    console.dir(transcription, { depth: null });
  })
  .catch((err) => {
    console.log(err);
  });
