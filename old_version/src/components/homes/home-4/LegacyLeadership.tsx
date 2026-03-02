import { useState, useEffect, useRef } from "react";

const LegacyLeadership = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: '0',
        backgroundColor: '#ffffff',
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        width: '100%'
      }}>
      {/* Simple Heading Section */}
      <div style={{
        textAlign: 'center',
        padding: '80px 40px 60px 40px',
        backgroundColor: '#ffffff',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 16px 0',
          letterSpacing: '1px',
          lineHeight: '1.2'
        }}>
          Legacy & Leadership
        </h2>
        <div style={{
          width: '80px',
          height: '4px',
          backgroundColor: '#3b82f6',
          margin: '0 auto 24px auto',
          borderRadius: '2px'
        }} />
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          margin: '0',
          fontWeight: '400',
          letterSpacing: '0.5px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Building a legacy of excellence and leadership for generations
        </p>
      </div>

      
      {/* Full Width Two Video Cards Grid with Staggered Animation */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0',
        width: '100%',
        margin: '0'
      }}>
        {/* Video Card 1 - Historical Journey */}
        <div
          style={{
            position: 'relative',
            height: '500px',
            overflow: 'hidden',
            cursor: 'pointer',
            backgroundColor: '#1a1a1a',
            opacity: isVisible ? 1 : 0,
            transform: hoveredIndex === 0 
              ? 'scale(1.01)' 
              : isVisible 
                ? 'scale(1) translateY(0)' 
                : 'scale(0.95) translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
          }}
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* YouTube Video Container */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%'
          }}>
            <iframe
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Historical Journey Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          {/* Dark Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Text Content */}
          <div style={{
            position: 'absolute',
            bottom: '50px',
            left: '50px',
            right: '50px',
            color: '#ffffff',
            zIndex: 2
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '400',
              margin: '0 0 20px 0',
              lineHeight: '1.4',
              letterSpacing: '0.5px'
            }}>
              Establishing a foundation of success
            </h3>
            
            <a 
              href="#"
              style={{
                fontSize: '14px',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '400',
                letterSpacing: '0.3px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'gap 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.gap = '12px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.gap = '8px';
              }}
            >
              Watch Full Story
              <span style={{
                fontSize: '16px',
                display: 'inline-block'
              }}>
                ▶
              </span>
            </a>
          </div>
        </div>

        {/* Video Card 2 - Chairman's Speech */}
        <div
          style={{
            position: 'relative',
            height: '500px',
            overflow: 'hidden',
            cursor: 'pointer',
            backgroundColor: '#1a1a1a',
            opacity: isVisible ? 1 : 0,
            transform: hoveredIndex === 1 
              ? 'scale(1.01)' 
              : isVisible 
                ? 'scale(1) translateY(0)' 
                : 'scale(0.95) translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
          }}
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* YouTube Video Container */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%'
          }}>
            <iframe
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              src="https://www.youtube.com/embed/9bZkp7q19f0"
              title="Chairman's Speech Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          {/* Dark Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Text Content */}
          <div style={{
            position: 'absolute',
            bottom: '50px',
            left: '50px',
            right: '50px',
            color: '#ffffff',
            zIndex: 2
          }}>
            <h3 style={{
              fontSize: '19px',
              fontWeight: '400',
              margin: '0 0 20px 0',
              lineHeight: '1.5',
              letterSpacing: '0.3px'
            }}>
              Chairman, Mr. Kumar Mangalam Birla's speech at 78th AGM of Grasim Industries Limited
            </h3>
            
            <a 
              href="#"
              style={{
                fontSize: '14px',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '400',
                letterSpacing: '0.3px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'gap 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.gap = '12px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.gap = '8px';
              }}
            >
              Watch Full Speech
              <span style={{
                fontSize: '16px',
                display: 'inline-block'
              }}>
                ▶
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 968px) {
          section > div:last-child {
            grid-template-columns: 1fr !important;
          }
          section > div:last-child > div {
            height: 400px !important;
          }
        }
        
        @media (max-width: 640px) {
          section > div:first-child {
            padding: 40px 20px 30px 20px !important;
          }
          section > div:first-child h1 {
            font-size: 24px !important;
          }
          section > div:last-child > div {
            height: 350px !important;
          }
          section > div:last-child > div > div:last-child {
            bottom: 30px !important;
            left: 30px !important;
            right: 30px !important;
          }
          section > div:last-child > div > div:last-child h3 {
            font-size: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LegacyLeadership;
