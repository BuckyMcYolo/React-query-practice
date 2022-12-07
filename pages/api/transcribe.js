export default transcribeAudio = async (req, res) => {
  // Get the audio file data from the request body
  const audioData = req.body;

  // Call the OpenAI API to transcribe the audio
  try {
    const response = await fetch(
      "https://api.openai.com/v1/models/audio-transcribe-001/transcribe",
      {
        method: "POST",
        body: JSON.stringify({ data: audioData }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract the transcription text from the response
    const data = await response.json();
    const text = data.text;

    // Send the transcription text back to the client
    res.send({ text });
  } catch (error) {
    // Handle any errors
    res.status(500).send({ error: error.message });
  }
};
