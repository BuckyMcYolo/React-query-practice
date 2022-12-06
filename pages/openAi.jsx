import React, { useState, useEffect } from "react";
import OpenAI from "openai";

export default function SpeechToText() {
  const [transcription, setTranscription] = useState("");

  useEffect(() => {
    OpenAI.configure(
      {
        apiKey: "<API_KEY>",
      },
      []
    );

    const audioElement = document.getElementById("audio-element");

    audioElement.addEventListener("loadedmetadata", () => {
      const audio = audioElement.captureStream();
      const transcriptionRequest = {
        audio,
        model: "audio-transcribe-001",
        token: "<API_TOKEN>",
      };

      OpenAI.transcribe(transcriptionRequest).then((response) => {
        console.log(response);
        setTranscription(response.text);
      });
    });
  }, []);

  return (
    <div>
      <audio id="audio-element" />
      <p>{transcription}</p>
    </div>
  );
}
