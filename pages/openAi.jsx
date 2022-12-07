import React, { useState, useEffect } from "react";

const Transcription = () => {
  const [transcription, setTranscription] = useState("");
  const [stop, setStop] = useState(false);

  async function fetchAudio(audiodata) {
    const response = await fetch(
      "https://api.openai.com/v1/engines/audio-transcribe-001/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
        },
        body: audiodata,
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setTranscription(data.text);
    }
    if (!response.ok) {
      console.log("error");
    }
  }

  function getLocalStream() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        console.log(mediaRecorder);
        const chunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
          console.log(chunks);
          const audioData = new Blob(chunks, { type: "audio/webm" });
          const formData = new FormData();
          formData.append("file", audioData, "audio.webm");
          fetchAudio(formData);
        });
        mediaRecorder.addEventListener("stop", () => {
          if (stop) {
            mediaRecorder.stop();
            console.log("stopped");
          }
        });
        mediaRecorder.start(3000);
      });
  }

  // useEffect(() => {
  //   // Call the API route to transcribe the audio
  //   fetch("/api/transcribe", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       // TODO: Add audio data to the request body
  //     }),
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Update the transcription state with the response data
  //       setTranscription(data.text);
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div>
      <button onClick={getLocalStream}>Start</button>
      <button onClick={() => setStop(true)}>Stop</button>
      <h1>Transcription</h1>
      <p>{transcription}</p>
    </div>
  );
};

export default Transcription;

// Req Headers
// :authority: api.openai.com
// :method: POST
// :path: /v1/engines/audio-transcribe-001/transcriptions
// :scheme: https
// accept: */*
// accept-encoding: gzip, deflate, br
// accept-language: en-US,en;q=0.9
// authorization: Bearer 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
// content-length: 11
// content-type: multipart/form-data
// origin: http://localhost:3001
// referer: http://localhost:3001/
// sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"
// sec-ch-ua-mobile: ?0
// sec-ch-ua-platform: "Windows"
// sec-fetch-dest: empty
// sec-fetch-mode: cors
// sec-fetch-site: cross-site
// user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36

// :authority: api.openai.com
// :method: POST
// :path: /v1/engines/audio-transcribe-001/transcriptions
// :scheme: https
// accept: */*
// accept-encoding: gzip, deflate, br
// accept-language: en-US,en;q=0.9
// authorization: Bearer sess-yOX8Jg6BIyo5WPplujcOlelENWAXk6mn78HHSxHQ
// content-length: 4170
// content-type: multipart/form-data; boundary=----WebKitFormBoundarylEQSdYA90OILEffG
// openai-organization: org-EsqmlMQ3Ihg8EPs4Il2qJSkx
// origin: https://beta.openai.com
// referer: https://beta.openai.com/
// sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"
// sec-ch-ua-mobile: ?0
// sec-ch-ua-platform: "Windows"
// sec-fetch-dest: empty
// sec-fetch-mode: cors
// sec-fetch-site: same-site
// user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
