import { useState } from "react";

const ForceForGood = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section style={{
      width: '100%',
      height: '100vh',
      minHeight: '600px',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#000000'
    }}>
      {/* Background Image - Futuristic City Skyline */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.75) contrast(1.05)',
        transition: 'transform 8s ease-in-out',
        transform: isHovered ? 'scale(1.03)' : 'scale(1)'
      }} />

      {/* Subtle Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 100%)',
        pointerEvents: 'none'
      }} />

      {/* Content Container */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '900px',
        padding: '0 30px',
        zIndex: 2
      }}>
        {/* Main Title - A Force (Red) For Good (White) */}
        <h1 style={{
          fontSize: '56px',
          fontWeight: '400',
          margin: '0 0 25px 0',
          lineHeight: '1.2',
          letterSpacing: '1px',
          fontFamily: 'Arial, sans-serif',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
          <span style={{
            color: '#d32f2f',
            fontWeight: '400'
          }}>
            A Force
          </span>
          {' '}
          <span style={{
            color: '#ffffff',
            fontWeight: '400'
          }}>
            For Good
          </span>
        </h1>

        {/* Click to Read More Link */}
        <div style={{
          display: 'inline-block',
          marginTop: '10px'
        }}>
          <a 
            href="#"
            style={{
              fontSize: '14px',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: '400',
              letterSpacing: '0.5px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              opacity: 0.95
            }}
            onMouseEnter={(e) => {
              setIsHovered(true);
              e.currentTarget.style.gap = '12px';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              setIsHovered(false);
              e.currentTarget.style.gap = '8px';
              e.currentTarget.style.opacity = '0.95';
            }}
          >
            Click to Read More
            <span style={{
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '18px',
              height: '18px',
              border: '1.5px solid #ffffff',
              borderRadius: '50%',
              transition: 'transform 0.3s ease'
            }}>
              <span style={{
                display: 'inline-block',
                width: '0',
                height: '0',
                borderLeft: '5px solid #ffffff',
                borderTop: '3px solid transparent',
                borderBottom: '3px solid transparent',
                marginLeft: '1px'
              }} />
            </span>
          </a>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          section {
            min-height: 550px !important;
          }
          section > div:nth-child(3) h1 {
            font-size: 48px !important;
          }
        }

        @media (max-width: 768px) {
          section {
            min-height: 500px !important;
          }
          section > div:nth-child(3) {
            padding: 0 25px !important;
          }
          section > div:nth-child(3) h1 {
            font-size: 40px !important;
            letter-spacing: 0.5px !important;
          }
          section > div:nth-child(3) > div > a {
            font-size: 13px !important;
          }
        }

        @media (max-width: 480px) {
          section {
            min-height: 450px !important;
          }
          section > div:nth-child(3) h1 {
            font-size: 32px !important;
            margin-bottom: 20px !important;
          }
          section > div:nth-child(3) > div > a {
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ForceForGood;
