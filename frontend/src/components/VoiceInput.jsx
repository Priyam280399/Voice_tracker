import React, { useState, useRef } from 'react';
import { parseAudio } from '../api/api';
export default function VoiceInput({ onParsed, onError }) {
  const [recording, setRecording] = useState(false);
  const [preview, setPreview] = useState('');
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const startRecording = async () => {
    setPreview('');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const msg = 'getUserMedia not supported in this browser.';
      if (onError) onError(msg);
      return alert(msg);
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options = { mimeType: 'audio/webm' };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunksRef.current.push(e.data); };
      mediaRecorder.onstop = async () => {
        setRecording(false);
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        chunksRef.current = [];
        const form = new FormData();
        form.append('audio', blob, 'recording.webm');
        try {
          const res = await parseAudio(form);
          setPreview(res.data.transcript || '');
          if (onParsed) onParsed(res.data);
        } catch (err) {
          console.error(err);
          if (onError) onError(err);
          alert('Transcription failed');
        }
      };
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
    } catch (err) {
      console.error('Mic error', err);
      if (onError) onError(err);
      alert('Could not access microphone: ' + err.message);
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream?.getTracks().forEach(t => t.stop());
    }
    setRecording(false);
  };
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <button onClick={() => (recording ? stopRecording() : startRecording())} style={{ padding: '8px 12px', background: recording ? '#e53e3e' : '#2f855a', color: 'white', border: 'none', borderRadius: 6 }}>
        {recording ? 'Stop' : 'Record'}
      </button>
      {preview && <div style={{ fontSize: 14, color: '#2d3748' }}><strong>Transcript:</strong> {preview}</div>}
    </div>
  )
}
