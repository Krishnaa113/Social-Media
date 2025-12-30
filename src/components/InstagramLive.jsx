import { useEffect } from 'react';

const InstagramLive = () => {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="instagram-live-container">
      <blockquote 
        className="instagram-media" 
        data-instgrm-permalink="https://www.instagram.com/urbandesiii/"
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          margin: '1rem',
          maxWidth: '320px',
          minWidth: '280px',
          padding: 0,
          width: '100%',
        }}
      ></blockquote>
    </div>
  );
};

export default InstagramLive;
