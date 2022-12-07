import React from "react";

const Microphone = () => {
  const [text, setText] = React.useState("");
  //create a microphone connection

  function getLocalStream() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        const socket = new WebSocket(
          "wss://api.deepgram.com/v1/listen?tier=enhanced&model=general-enhanced&language=en-US&punctuate=true&version=latest&interim_results=true",
          ["token", process.env.DEEPGRAM_API_KEY]
        );
        socket.onopen = () => {
          console.log("connected to deepgram");
          mediaRecorder.addEventListener("dataavailable", (event) => {
            socket.send(event.data);
          });
          mediaRecorder.start(250);
        };

        socket.onmessage = (message) => {
          const received = JSON.parse(message.data);
          console.log(received);
          const transcript = received.channel.alternatives[0].transcript;
          setText((prevTranscript) => prevTranscript + transcript + " ");
          console.log(transcript);
        };

        socket.onclose = () => {
          console.log({ event: "onclose" });
        };

        socket.onerror = (error) => {
          console.log({ event: "onerror", error });
        };
      });
  }

  return (
    <div>
      microphone
      <button onClick={getLocalStream}>Start</button>
      <br />
      <p>{text}</p>
    </div>
  );
};

export default Microphone;
