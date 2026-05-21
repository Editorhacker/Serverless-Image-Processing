import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getImageDetails, downloadImage } from '../services/api';

const STATUS = {
  completed: { label: 'Completed', badge: 'badge badge-green',  dot: '#5cb85c' },
  processing: { label: 'Processing', badge: 'badge badge-amber', dot: '#d4a053' },
  pending:    { label: 'Pending',    badge: 'badge badge-blue',  dot: '#7ea8c4' },
};

const DL_COLORS = {
  original:  { bar: 'linear-gradient(90deg, #d4a053, #e8c07a)' },
  thumbnail: { bar: 'linear-gradient(90deg, #5cb85c, #7dd87d)' },
  medium:    { bar: 'linear-gradient(90deg, #7ea8c4, #a0c4de)' },
  large:     { bar: 'linear-gradient(90deg, #b8873a, #d4a053)' },
};

export default function ImageDetails() {
  const { imageId } = useParams();
  const navigate    = useNavigate();
  const [image,       setImage]       = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [downloading, setDownloading] = useState(null);
  const [activeTab,   setActiveTab]   = useState('original');

  useEffect(() => { loadImageDetails(); }, [imageId]);

  const loadImageDetails = async () => {
    try {
      const r = await getImageDetails(imageId);
      setImage(r.image);
    } catch {
      toast.error('Failed to load image details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (version) => {
    setDownloading(version);
    try {
      const blob = await downloadImage(imageId, version);
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url; a.download = `image-${version}.jpg`; a.click();
      window.URL.revokeObjectURL(url);
      toast.success(`Downloaded ${version}`);
    } catch { toast.error('Download failed'); }
    finally  { setDownloading(null); }
  };

  /* ── Loading ── */
  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
      <div style={{ textAlign: 'center' }}>
        <div className="spin" style={{ width: 40, height: 40, border: '2px solid #2a2725', borderTopColor: '#d4a053', borderRadius: '50%', margin: '0 auto 16px' }} />
        <p style={{ fontSize: 13, color: '#6b6560' }}>Loading image details…</p>
      </div>
    </div>
  );

  /* ── Not found ── */
  if (!image) return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, color: '#9a9590', marginBottom: 16 }}>Image not found</p>
        <button onClick={() => navigate('/dashboard')} className="btn-ghost" style={{ padding: '9px 20px', fontSize: 13 }}>← Back</button>
      </div>
    </div>
  );

  const sc = STATUS[image.status] || { label: image.status, badge: 'badge badge-gray', dot: '#6b6560' };

  const versions = [
    { key: 'original',  label: 'Original',        sub: null,     src: image.original,  size: image.originalSize  },
    image.thumbnail && { key: 'thumbnail', label: 'Thumbnail', sub: '150px',  src: image.thumbnail, size: image.thumbnailSize },
    image.medium    && { key: 'medium',    label: 'Medium',    sub: '500px',  src: image.medium,    size: image.mediumSize    },
    image.large     && { key: 'large',     label: 'Large',     sub: '1200px', src: image.large,     size: image.largeSize     },
  ].filter(Boolean);

  const activeV = versions.find(v => v.key === activeTab) || versions[0];

  const sideCard = { background: '#161616', border: '1px solid #2a2725', borderRadius: 12, padding: '20px' };
  const metaRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #1e1e1e' };
  const metaLabel = { fontSize: 12, color: '#6b6560' };
  const metaVal   = { fontSize: 12, fontWeight: 500, color: '#f0ece4' };

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', paddingTop: 96, paddingBottom: 64 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: 32 }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b6560', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 12, padding: 0, fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#d4a053'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b6560'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Dashboard
          </button>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, color: '#f0ece4', letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {image.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                <span className={sc.badge}>
                  <span className="badge-dot" style={{ background: sc.dot, ...(image.status === 'processing' ? { animation: 'pulse-dot 1.8s ease-in-out infinite' } : {}) }} />
                  {sc.label}
                </span>
                <span style={{ fontSize: 12, color: '#6b6560' }}>{new Date(image.uploadedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Layout: preview + sidebar ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 24, alignItems: 'start' }}>

          {/* LEFT: image preview + tabs */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <div style={{ background: '#161616', border: '1px solid #2a2725', borderRadius: 14, overflow: 'hidden' }}>
              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '4/3', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img
                  src={activeV.src}
                  alt={activeV.label}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                />
                {/* label chip */}
                <div style={{
                  position: 'absolute', bottom: 10, left: 10,
                  background: 'rgba(13,13,13,0.8)', backdropFilter: 'blur(8px)',
                  border: '1px solid #2a2725', borderRadius: 6, padding: '4px 10px',
                  fontSize: 11, color: '#9a9590',
                }}>
                  {activeV.label}{activeV.sub ? ` · ${activeV.sub}` : ''}
                </div>
              </div>

              {/* Version tabs */}
              {versions.length > 1 && (
                <div className="tab-bar">
                  {versions.map(v => (
                    <button
                      key={v.key}
                      className={`tab-btn ${activeTab === v.key ? 'active' : ''}`}
                      onClick={() => setActiveTab(v.key)}
                    >
                      {v.label}
                      {v.sub && <span style={{ display: 'block', fontSize: 10, opacity: 0.55, marginTop: 2 }}>{v.sub}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT: sidebar */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Info card */}
            <div style={sideCard}>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 600, color: '#9a9590', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Image Info</p>
              {[
                { l: 'Original size', v: `${(image.originalSize / 1024).toFixed(2)} KB` },
                { l: 'Dimensions',    v: image.width ? `${image.width} × ${image.height} px` : 'N/A' },
                { l: 'Format',        v: image.format || 'JPEG' },
                { l: 'Uploaded',      v: new Date(image.uploadedAt).toLocaleDateString() },
              ].map((r, i) => (
                <div key={i} style={{ ...metaRow, ...(i === 3 ? { borderBottom: 'none' } : {}) }}>
                  <span style={metaLabel}>{r.l}</span>
                  <span style={metaVal}>{r.v}</span>
                </div>
              ))}
            </div>

            {/* Size comparison */}
            {versions.length > 1 && (
              <div style={sideCard}>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 600, color: '#9a9590', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Size Comparison</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {versions.map((v, i) => {
                    const pct = v.size ? Math.min((v.size / image.originalSize) * 100, 100) : 100;
                    const reduction = v.key !== 'original' && v.size ? ((1 - v.size / image.originalSize) * 100).toFixed(1) : null;
                    const barColor = DL_COLORS[v.key]?.bar || DL_COLORS.original.bar;
                    return (
                      <div key={v.key}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: '#9a9590' }}>{v.label}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 12, color: '#f0ece4', fontWeight: 500 }}>{(v.size / 1024).toFixed(1)} KB</span>
                            {reduction && <span style={{ fontSize: 10, color: '#5cb85c', fontWeight: 700 }}>−{reduction}%</span>}
                          </div>
                        </div>
                        <div style={{ height: 4, background: '#262626', borderRadius: 2, overflow: 'hidden' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                            style={{ height: '100%', borderRadius: 2, background: barColor }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Downloads */}
            <div style={sideCard}>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 600, color: '#9a9590', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Download</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {versions.map(v => {
                  const isBusy = downloading === v.key;
                  const disabled = isBusy || image.status !== 'completed';
                  return (
                    <button
                      key={v.key}
                      onClick={() => handleDownload(v.key)}
                      disabled={disabled}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 14px', borderRadius: 8,
                        background: '#1e1e1e', border: '1px solid #2a2725',
                        color: disabled ? '#3a3530' : '#f0ece4',
                        fontSize: 13, fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
                        opacity: disabled && !isBusy ? 0.4 : 1,
                        transition: 'background 0.2s, border-color 0.2s',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = '#262626'; e.currentTarget.style.borderColor = '#3a3530'; } }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#1e1e1e'; e.currentTarget.style.borderColor = '#2a2725'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {isBusy
                          ? <div className="spin" style={{ width: 14, height: 14, border: '1.5px solid #3a3530', borderTopColor: '#d4a053', borderRadius: '50%' }} />
                          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        }
                        <span>{v.label}</span>
                        {v.sub && <span style={{ fontSize: 11, color: '#6b6560' }}>({v.sub})</span>}
                      </div>
                      <span style={{ fontSize: 11, color: '#6b6560' }}>{(v.size / 1024).toFixed(1)} KB</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
