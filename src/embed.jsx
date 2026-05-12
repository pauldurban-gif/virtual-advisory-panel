import React from 'react';
import ReactDOM from 'react-dom/client';
import VAPGallery from './VAPGallery';

// Load Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Mount the app when the DOM is ready
function mount() {
  const container = document.getElementById('vap-root');
  if (container) {
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <VAPGallery />
      </React.StrictMode>
    );
  } else {
    console.error('VAP Gallery: Could not find element with id "vap-root"');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
