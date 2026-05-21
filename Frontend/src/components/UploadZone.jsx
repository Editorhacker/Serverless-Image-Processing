import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { uploadImage } from '../services/api';

export default function UploadZone({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) { toast.error('Please drop valid image files'); return; }
    for (const file of acceptedFiles) {
      if (file.size > 10 * 1024 * 1024) { toast.error(`${file.name} exceeds 10MB`); continue; }
      setUploading(true); setProgress(0);
      try {
        const result = await uploadImage(file);
        toast.success('Image uploaded!');
        setProgress(100);
        setTimeout(() => { setUploading(false); setProgress(0); onUploadComplete?.(result); }, 1000);
      } catch (err) {
        toast.error(err.message || 'Upload failed');
        setUploading(false); setProgress(0);
      }
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }, disabled: uploading,
  });

  const zoneStyle = {
    position: 'relative',
    border: `2px dashed ${isDragActive ? '#d4a053' : '#3a3530'}`,
    borderRadius: 16,
    padding: '52px 32px',
    textAlign: 'center',
    cursor: uploading ? 'default' : 'pointer',
    background: isDragActive ? 'rgba(212,160,83,0.05)' : 'rgba(22,22,22,0.6)',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
    boxShadow: isDragActive ? '0 0 40px rgba(212,160,83,0.08)' : 'none',
  };

  const iconBoxStyle = {
    width: 56, height: 56,
    borderRadius: 12,
    background: 'rgba(212,160,83,0.08)',
    border: '1px solid rgba(212,160,83,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 20px',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      {...getRootProps()}
      style={zoneStyle}
    >
      {/* Corner accents */}
      {[
        { top: 12, left: 12,  borderWidth: '2px 0 0 2px',   borderRadius: '4px 0 0 0'   },
        { top: 12, right: 12, borderWidth: '2px 2px 0 0',   borderRadius: '0 4px 0 0'   },
        { bottom: 12, left: 12,  borderWidth: '0 0 2px 2px', borderRadius: '0 0 0 4px'   },
        { bottom: 12, right: 12, borderWidth: '0 2px 2px 0', borderRadius: '0 0 4px 0'   },
      ].map((s, i) => (
        <div key={i} style={{
          position: 'absolute', width: 18, height: 18,
          borderStyle: 'solid', borderColor: 'rgba(212,160,83,0.3)', ...s,
        }} />
      ))}

      <input {...getInputProps()} />

      <AnimatePresence mode="wait">
        {isDragActive ? (
          <motion.div key="drag" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <div style={iconBoxStyle}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 17, fontWeight: 600, color: '#d4a053', marginBottom: 6 }}>Drop images here</p>
            <p style={{ fontSize: 13, color: '#6b6560' }}>JPG · PNG · WEBP — Max 10MB</p>
          </motion.div>
        ) : uploading ? (
          <motion.div key="uploading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ ...iconBoxStyle, borderColor: 'rgba(212,160,83,0.4)' }}>
              <svg className="spin" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 17, fontWeight: 600, color: '#f0ece4', marginBottom: 16 }}>Uploading…</p>
            <div style={{ maxWidth: 260, margin: '0 auto' }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p style={{ fontSize: 12, color: '#6b6560', marginTop: 8 }}>{progress}%</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={iconBoxStyle}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6b6560" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 17, fontWeight: 600, color: '#f0ece4', marginBottom: 6 }}>
              Drag & drop images here
            </p>
            <p style={{ fontSize: 13, color: '#9a9590', marginBottom: 16 }}>or click to browse files</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
              {['JPG', 'PNG', 'WEBP'].map((f) => (
                <span key={f} style={{
                  padding: '3px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                  color: '#6b6560', background: '#1e1e1e', border: '1px solid #2a2725',
                  borderRadius: 5, textTransform: 'uppercase',
                }}>{f}</span>
              ))}
              <span style={{ fontSize: 11, color: '#6b6560' }}>· Max 10MB</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
