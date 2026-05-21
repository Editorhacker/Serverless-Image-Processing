import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import UploadZone from '../components/UploadZone';
import ImageCard from '../components/ImageCard';
import { getImages } from '../services/api';

const STAT_CFG = [
  { key: 'totalImages', label: 'Total Images', color: '#d4a053',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> },
  { key: 'processed',   label: 'Processed',    color: '#5cb85c',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5cb85c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
  { key: 'processing',  label: 'Processing',   color: '#d4a053',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> },
  { key: 'pending',     label: 'Pending',      color: '#7ea8c4',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7ea8c4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
];

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
    const id = setInterval(loadImages, 5000);
    return () => clearInterval(id);
  }, []);

  const loadImages = async () => {
    try {
      const r = await getImages();
      setImages(r.images || []);
    } catch {
      // silent — backend may not be running yet
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (result) => setImages((prev) => [result.image, ...prev]);

  const stats = {
    totalImages: images.length,
    processed:   images.filter(i => i.status === 'completed').length,
    processing:  images.filter(i => i.status === 'processing').length,
    pending:     images.filter(i => i.status === 'pending').length,
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: [0.22, 0.61, 0.36, 1] },
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', paddingTop: 96, paddingBottom: 64 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* ── Page header ── */}
        <motion.div {...fadeUp()} style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <div style={{ width: 3, height: 28, background: 'linear-gradient(to bottom, #d4a053, #b8873a)', borderRadius: 2, flexShrink: 0 }} />
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: '#f0ece4', letterSpacing: '-0.02em' }}>
              Dashboard
            </h1>
          </div>
          <p style={{ fontSize: 14, color: '#6b6560', paddingLeft: 15 }}>Upload, process, and manage your image library.</p>
        </motion.div>

        {/* ── Stat cards ── */}
        <motion.div {...fadeUp(0.08)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 48 }}>
          {STAT_CFG.map((s) => (
            <div key={s.key} className="stat-card" style={{ borderColor: `${s.color}22` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6b6560', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</span>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.icon}
                </div>
              </div>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 32, fontWeight: 700, color: s.color, lineHeight: 1 }}>
                {stats[s.key]}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Upload ── */}
        <motion.div {...fadeUp(0.16)} style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 600, color: '#f0ece4' }}>Upload Images</h2>
          </div>
          <UploadZone onUploadComplete={handleUploadComplete} />
        </motion.div>

        {/* ── Image grid ── */}
        <motion.div {...fadeUp(0.22)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
              <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 600, color: '#f0ece4' }}>Your Images</h2>
            </div>
            {images.length > 0 && (
              <span style={{ fontSize: 12, color: '#6b6560', background: '#1e1e1e', border: '1px solid #2a2725', borderRadius: 999, padding: '3px 12px' }}>
                {images.length} image{images.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Skeleton */}
          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
              {[1, 2, 3].map(i => (
                <div key={i} className="card" style={{ overflow: 'hidden' }}>
                  <div className="skeleton" style={{ height: 200 }} />
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="skeleton" style={{ height: 14, width: '70%' }} />
                    <div className="skeleton" style={{ height: 11, width: '50%' }} />
                    <div className="skeleton" style={{ height: 36, marginTop: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && images.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '64px 24px',
              background: 'rgba(22,22,22,0.4)', border: '2px dashed #2a2725',
              borderRadius: 16,
            }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: '#1e1e1e', border: '1px solid #2a2725', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a3530" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 600, color: '#9a9590', marginBottom: 6 }}>No images uploaded yet</p>
              <p style={{ fontSize: 13, color: '#6b6560' }}>Start by uploading your first image above</p>
            </div>
          )}

          {/* Grid */}
          {!loading && images.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
              {images.map(img => <ImageCard key={img.id} image={img} />)}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
