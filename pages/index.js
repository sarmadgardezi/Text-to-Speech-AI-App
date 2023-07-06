import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const generateAudio = async () => {
    try {
      const response = await axios.post('/api/generate-audio', { text });
      setAudioUrl(response.data.audioUrl);
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'generated_audio.wav';
      link.click();
    }
  };

  return (
    <div>
      <h1>AI Text-to-Speech</h1>
      <textarea value={text} onChange={handleTextChange} rows={4} />
      <br />
      <button onClick={generateAudio}>Generate Audio</button>
      {audioUrl && (
        <div>
          <audio controls src={audioUrl} />
          <br />
          <button onClick={handleDownload}>Download Audio</button>
        </div>
      )}
    </div>
  );
}
