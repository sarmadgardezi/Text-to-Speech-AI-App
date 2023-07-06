import axios from 'axios';

export default async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post('AI_SERVER_API_ENDPOINT', {
      text,
      voice: 'indian_voice' // Replace with the desired voice (e.g., Indian/Pakistani AI voice)
    });

    res.status(200).json({ audioUrl: response.data.audioUrl });
  } catch (error) {
    console.error('Error generating audio:', error);
    res.status(500).json({ error: 'Failed to generate audio' });
  }
};
