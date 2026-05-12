import React from 'react';
import ReactDOM from 'react-dom/client';
import { SiteHeader, SiteFooter } from './SiteWrapper';
import VAPGallery from './VAPGallery';

function App() {
  return (
    <>
      <SiteHeader />

      {/* Hero Section */}
      <div style={{
        backgroundColor: "#001e46",
        padding: "64px 24px",
        textAlign: "center",
      }}>
        <h1 style={{
          margin: "0 0 16px",
          fontSize: 38,
          fontFamily: "'Libre Baskerville', Georgia, serif",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.3,
        }}>
          Virtual Advisory Panel
        </h1>
        <h3 style={{
          margin: "0 0 12px",
          fontSize: 22,
          fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
          fontWeight: 600,
          color: "#00adb0",
          lineHeight: 1.4,
        }}>
          Stress-test your thinking before the stakes are real.
        </h3>
        <p style={{
          margin: "0 auto",
          maxWidth: 640,
          fontSize: 16,
          fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
          color: "#bebebe",
          lineHeight: 1.7,
        }}>
          Build a panel of AI-powered advisors to stress-test your next strategic decision, initiative, or board proposal — before the stakes are live.
        </p>
      </div>

      <VAPGallery />
      <SiteFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
