import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { downloadImage } from '../services/api';

const STATUS = {
  completed: { label: 'Completed', badge: 'badge badge-green',  dot: '#5cb85c' },
  processing: { label: 'Processing', badge: 'badge badge-amber', dot: '#d4a053', pulse: true },
  pending:    { label: 'Pending',    badge: 'badge badge-blue',  dot: '#7ea8c4' },
};

export default function ImageCard({ image }) {
  const [downloading, setDownloading] = useState(null);

  const handleDownload = async (version) => {
    setDownloading(version);
    try {
      const blob = await downloadImage(image.id, version);
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url; a.download = `image-${version}.jpg`; a.click();
      window.URL.revokeObjectURL(url);
      toast.success(`Downloaded ${version}`);
    } catch { toast.error('Download failed'); }
    finally  { setDownloading(null); }
  };

  const s = STATUS[image.status] || { label: image.status, badge: 'badge badge-gray', dot: '#6b6560' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="card card-hover"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', height: 200, background: '#1e1e1e', overflow: 'hidden' }}>
        <img
          src={image.thumbnail || image.original}
          alt={image.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 50%)',
        }} />
        {/* Status badge */}
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <span className={s.badge}>
            <span className="badge-dot" style={{ background: s.dot, ...(s.pulse ? {} : {}) }} />
            {s.label}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{
          fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 600,
          color: '#f0ece4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{image.name}</p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { icon: 'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z', label: `${(image.size / 1024).toFixed(1)} KB` },
            { icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2', label: new Date(image.uploadedAt).toLocaleDateString() },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6b6560' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={item.icon} />
              </svg>
              {item.label}
            </div>
          ))}
        </div>

        {/* Processing bar */}
        {image.status === 'processing' && (
          <div className="progress-bar progress-indeterminate">
            <div className="progress-fill" style={{ width: '40%' }} />
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
          <Link
            to={`/details/${image.id}`}
            style={{
              flex: 1, padding: '9px 12px', textAlign: 'center', fontSize: 12, fontWeight: 600,
              color: '#f0ece4', background: '#262626', border: '1px solid #2a2725',
              borderRadius: 8, textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#333'; e.currentTarget.style.borderColor = '#3a3530'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#262626'; e.currentTarget.style.borderColor = '#2a2725'; }}
          >
            View Details
          </Link>
          {image.status === 'completed' && (
            <button
              onClick={() => handleDownload('original')}
              disabled={downloading === 'original'}
              style={{
                padding: '9px 14px', fontSize: 12, fontWeight: 600,
                background: 'linear-gradient(135deg, #d4a053, #b8873a)',
                color: '#0d0d0d', border: 'none', borderRadius: 8, cursor: 'pointer',
                opacity: downloading === 'original' ? 0.5 : 1,
                transition: 'opacity 0.2s, box-shadow 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {downloading === 'original'
                ? <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83" /></svg>
                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              }
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
