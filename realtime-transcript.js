const { Deepgram } = require("@deepgram/sdk");

// The API key you created in step 1
const deepgramApiKey = "1e7309207bdb6dcfdbb77354b8c93af4460c0995";

// Name and extension of the file you downloaded (e.g. sample.wav)
const pathToFile = "./res/Bueller-Life-moves-pretty-fast.wav";

// Initializes the Deepgram SDK
const deepgram = new Deepgram(deepgramApiKey);

// Creates a websocket connection to Deepgram
const deepgramSocket = deepgram.transcription.live({ punctuate: true });

// Listen for the connection to open and begin sending
deepgramSocket.addListener("open", () => {
  console.log("Connection Opened!");

  // Grab your audio file
  const fs = require("fs");
  const contents = fs.readFileSync(pathToFile);

  // Send the audio to the Deepgram API in chunks of 1000 bytes
  const chunk_size = 1000;
  for (i = 0; i < contents.length; i += chunk_size) {
    const slice = contents.slice(i, i + chunk_size);
    deepgramSocket.send(slice);
  }

  // Close the websocket connection
  deepgramSocket.finish();
});

// Listen for the connection to close
deepgramSocket.addListener("close", () => {
  console.log("Connection closed.");
});

// Receive transcriptions based on sent streams and write them to the console
deepgramSocket.addListener("transcriptReceived", (transcription) => {
  console.dir(transcription, { depth: null });
});
