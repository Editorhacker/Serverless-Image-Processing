import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    title: 'Serverless Processing',
    description: 'Automatic image processing powered by AWS Lambda — zero infrastructure management.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    title: 'Smart Compression',
    description: 'Intelligent algorithms reduce file size while preserving visual fidelity.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
    title: 'Multiple Sizes',
    description: 'Thumbnail, Medium, and Large variants generated automatically on upload.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    title: 'Watermark Protection',
    description: 'Protect your images with automatic watermarks on every output version.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    title: 'Event-Driven',
    description: 'Real-time processing triggers the moment a file upload event fires.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>,
    title: 'Cloud Storage',
    description: 'Secure, scalable storage powered by Amazon S3.',
  },
];

const archSteps = [
  { step: '01', label: 'User Uploads Image',        detail: 'via Dashboard dropzone' },
  { step: '02', label: 'Stored in S3 Bucket',       detail: 'Original images bucket' },
  { step: '03', label: 'S3 Event Triggers Lambda',  detail: 'Automatic notification' },
  { step: '04', label: 'Image Processing Begins',   detail: 'Resize · Compress · Watermark' },
  { step: '05', label: 'Results Saved to S3',       detail: 'Processed bucket' },
  { step: '06', label: 'Dashboard Updated',         detail: 'Real-time status refresh' },
];

export default function LandingPage() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] },
  });

  const inView = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] },
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', overflowX: 'hidden' }}>

      {/* ══════════ HERO ══════════ */}
      <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 100, textAlign: 'center', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(212,160,83,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          {/* Badge */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, background: 'rgba(212,160,83,0.08)', border: '1px solid rgba(212,160,83,0.2)', marginBottom: 28 }}>
            <span className="pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4a053', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#d4a053', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Serverless Architecture</span>
          </motion.div>

          {/* H1 */}
          <motion.h1 {...fadeUp(0.2)} style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#f0ece4', marginBottom: 12 }}>
            Process images{' '}
            <span className="gradient-text">at scale</span>
          </motion.h1>
          <motion.h2 {...fadeUp(0.3)} style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3.5vw, 36px)', fontWeight: 300, color: '#6b6560', marginBottom: 24 }}>
            without the infrastructure
          </motion.h2>

          {/* Sub */}
          <motion.p {...fadeUp(0.4)} style={{ fontSize: 16, color: '#9a9590', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px', padding: '0 16px' }}>
            Upload once. Automatically resize, compress, and watermark your images
            using event-driven serverless processing on AWS.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.5)} style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/dashboard" className="btn-amber">
              Get Started
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <a href="#features" className="btn-ghost">Explore Features</a>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.7)} style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 72, flexWrap: 'wrap' }}>
            {[{ v: '< 3s', l: 'Processing' }, { v: '80%', l: 'Size reduction' }, { v: '∞', l: 'Scalability' }].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 28, fontWeight: 700, color: '#d4a053' }}>{s.v}</p>
                <p style={{ fontSize: 11, color: '#6b6560', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section id="features" style={{ padding: '100px 24px', position: 'relative' }}>
        <div className="section-divider" style={{ marginBottom: 60 }} />
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...inView()} style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#d4a053', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Capabilities</span>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#f0ece4', marginTop: 10, marginBottom: 12 }}>Powerful Features</h2>
            <p style={{ fontSize: 15, color: '#6b6560', maxWidth: 400, margin: '0 auto' }}>Everything you need to process, transform, and deliver images at scale.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                {...inView(i * 0.07)}
                className="card card-hover"
                style={{ padding: '28px 24px' }}
              >
                <div className="icon-box" style={{ marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 600, color: '#f0ece4', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#6b6560', lineHeight: 1.65 }}>{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ARCHITECTURE ══════════ */}
      <section style={{ padding: '100px 24px', position: 'relative' }}>
        <div className="section-divider" style={{ marginBottom: 60 }} />
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <motion.div {...inView()} style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#d4a053', letterSpacing: '0.15em', textTransform: 'uppercase' }}>How it works</span>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#f0ece4', marginTop: 10 }}>Event-Driven Pipeline</h2>
          </motion.div>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 27, top: 24, bottom: 24, width: 1, background: 'linear-gradient(to bottom, rgba(212,160,83,0.5), rgba(212,160,83,0.05))' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {archSteps.map((s, i) => (
                <motion.div key={i} {...inView(i * 0.08)} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  {/* Node */}
                  <div style={{
                    width: 54, height: 54, borderRadius: 12, flexShrink: 0,
                    background: '#161616', border: '1px solid #2a2725',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700, color: '#d4a053',
                    position: 'relative', zIndex: 1,
                  }}>{s.step}</div>
                  {/* Content */}
                  <div className="card" style={{ flex: 1, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#f0ece4', fontFamily: 'Sora, sans-serif' }}>{s.label}</p>
                    <p style={{ fontSize: 12, color: '#6b6560', whiteSpace: 'nowrap', flexShrink: 0 }}>{s.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section style={{ padding: '100px 24px', textAlign: 'center', position: 'relative' }}>
        <div className="section-divider" style={{ marginBottom: 60 }} />
        <motion.div {...inView()}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: '#f0ece4', marginBottom: 14 }}>
            Ready to transform your workflow?
          </h2>
          <p style={{ fontSize: 15, color: '#6b6560', marginBottom: 36 }}>Start processing images in seconds. No infrastructure setup required.</p>
          <Link to="/dashboard" className="btn-amber">
            Open Dashboard
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </motion.div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ borderTop: '1px solid #2a2725', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 600, color: '#f0ece4' }}>
            Image<span style={{ color: '#d4a053' }}>Pro</span>
          </span>
          <span style={{ fontSize: 12, color: '#6b6560' }}>Built with React · Vite · AWS Lambda · S3</span>
          <span style={{ fontSize: 12, color: '#6b6560' }}>© 2025</span>
        </div>
      </footer>
    </div>
  );
}
