import { useState } from "react";

const WorkWithUs = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isFirstRowPaused, setIsFirstRowPaused] = useState(false);
  const [isSecondRowPaused, setIsSecondRowPaused] = useState(false);

  return (
    <section style={{
      padding: '0',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      {/* Moving Logos Section */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '60px 0',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 16px 0',
            letterSpacing: '1px'
          }}>
            Trusted by Leading Companies
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            margin: '0',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Partnering with industry leaders to drive innovation and growth
          </p>
        </div>

        {/* Moving Logos Container */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '80px',
            overflow: 'hidden'
          }}
          onMouseEnter={() => setIsFirstRowPaused(true)}
          onMouseLeave={() => setIsFirstRowPaused(false)}
        >
          {/* First Row of Logos */}
          <div style={{
            display: 'flex',
            position: 'absolute',
            left: isFirstRowPaused ? '0' : '-100%',
            animation: isFirstRowPaused ? 'none' : 'scrollLogos 20s linear infinite',
            width: '200%'
          }}>
            {[
              { name: 'Microsoft', color: '#0078D4' },
              { name: 'Google', color: '#4285F4' },
              { name: 'Amazon', color: '#FF9900' },
              { name: 'Apple', color: '#000000' },
              { name: 'Tesla', color: '#CC0000' },
              { name: 'Meta', color: '#1877F2' },
              { name: 'Netflix', color: '#E50914' },
              { name: 'Spotify', color: '#1DB954' }
            ].map((company, index) => (
              <div key={index} style={{
                flex: '0 0 200px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 30px',
                fontSize: '24px',
                fontWeight: '700',
                color: company.color,
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '20px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                {company.name}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              { name: 'Microsoft', color: '#0078D4' },
              { name: 'Google', color: '#4285F4' },
              { name: 'Amazon', color: '#FF9900' },
              { name: 'Apple', color: '#000000' },
              { name: 'Tesla', color: '#CC0000' },
              { name: 'Meta', color: '#1877F2' },
              { name: 'Netflix', color: '#E50914' },
              { name: 'Spotify', color: '#1DB954' }
            ].map((company, index) => (
              <div key={`duplicate-${index}`} style={{
                flex: '0 0 200px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 30px',
                fontSize: '24px',
                fontWeight: '700',
                color: company.color,
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '20px'
              }}>
                {company.name}
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Opposite Direction */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '80px',
            overflow: 'hidden',
            marginTop: '20px'
          }}
          onMouseEnter={() => setIsSecondRowPaused(true)}
          onMouseLeave={() => setIsSecondRowPaused(false)}
        >
          <div style={{
            display: 'flex',
            position: 'absolute',
            right: isSecondRowPaused ? '0' : '-100%',
            animation: isSecondRowPaused ? 'none' : 'scrollLogosReverse 25s linear infinite',
            width: '200%'
          }}>
            {[
              { name: 'IBM', color: '#054ADA' },
              { name: 'Oracle', color: '#F80000' },
              { name: 'SAP', color: '#008FD3' },
              { name: 'Salesforce', color: '#00A1E0' },
              { name: 'Adobe', color: '#FF0000' },
              { name: 'Cisco', color: '#1BA1D2' },
              { name: 'Intel', color: '#0071C5' },
              { name: 'HP', color: '#0096D6' }
            ].map((company, index) => (
              <div key={index} style={{
                flex: '0 0 200px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 30px',
                fontSize: '24px',
                fontWeight: '700',
                color: company.color,
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '20px'
              }}>
                {company.name}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              { name: 'IBM', color: '#054ADA' },
              { name: 'Oracle', color: '#F80000' },
              { name: 'SAP', color: '#008FD3' },
              { name: 'Salesforce', color: '#00A1E0' },
              { name: 'Adobe', color: '#FF0000' },
              { name: 'Cisco', color: '#1BA1D2' },
              { name: 'Intel', color: '#0071C5' },
              { name: 'HP', color: '#0096D6' }
            ].map((company, index) => (
              <div key={`duplicate-reverse-${index}`} style={{
                flex: '0 0 200px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 30px',
                fontSize: '24px',
                fontWeight: '700',
                color: company.color,
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '20px'
              }}>
                {company.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        padding: '80px 40px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Main Title */}
          <h1 style={{
            fontSize: '48px',
            fontWeight: '400',
            color: '#000000',
            margin: '0 0 60px 0',
            textAlign: 'center',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>
            WORK WITH US
          </h1>

        {/* Cards Container */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px'
        }}>
          {/* Top Large Card - SOAR */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '0',
            border: '1px solid #d0d0d0',
            overflow: 'hidden',
            position: 'relative',
            height: '380px',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr'
          }}>
            {/* Left Side - Image with overlay */}
            <div style={{
              position: 'relative',
              height: '100%',
              backgroundImage: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              overflow: 'hidden'
            }}>
              {/* White decorative overlay pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 100%)',
                zIndex: 1
              }} />
              
              {/* Decorative flowing lines */}
              <svg style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2
              }}>
                <path d="M 0 80 Q 150 60, 300 80 T 600 80" stroke="rgba(255,255,255,0.8)" strokeWidth="3" fill="none" />
                <path d="M 0 120 Q 150 100, 300 120 T 600 120" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" />
                <path d="M 0 160 Q 150 140, 300 160 T 600 160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
              </svg>

              {/* SOAR Logo and text overlay */}
              <div style={{
                position: 'absolute',
                top: '30px',
                left: '30px',
                zIndex: 3
              }}>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#000000',
                  letterSpacing: '2px',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  lineHeight: '1'
                }}>
                  SO<span style={{ color: '#c41e3a' }}>A</span>R
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#666666',
                  letterSpacing: '1px',
                  marginTop: '4px',
                  fontWeight: '400'
                }}>
                  Seamless Opportunity for Amazing Returnships
                </div>
              </div>

              {/* Women image silhouette */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '10px',
                width: '280px',
                height: '220px',
                backgroundImage: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                zIndex: 2,
                opacity: 0.9
              }} />
            </div>

            {/* Right Side - Content */}
            <div style={{
              padding: '50px 50px 50px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '400',
                color: '#000000',
                margin: '0 0 20px 0',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                lineHeight: '1.2'
              }}>
                SOAR
              </h2>
              
              <p style={{
                fontSize: '16px',
                color: '#333333',
                lineHeight: '1.6',
                margin: '0 0 35px 0',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                Leading the way with a First-of-Its-Kind 'Returnship' program for women in mainstream roles.
              </p>
              
              <button 
                style={{
                  backgroundColor: hoveredButton === 'soar' ? '#a01830' : '#c41e3a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '16px 40px',
                  fontSize: '14px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  alignSelf: 'flex-start',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={() => setHoveredButton('soar')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Bottom Two Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px'
          }}>
            {/* Card 2 - JOIN OUR TEAM */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '45px 40px',
              border: '1px solid #d0d0d0',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '400',
                  color: '#000000',
                  margin: '0 0 15px 0',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  lineHeight: '1.2'
                }}>
                  JOIN OUR TEAM
                </h2>
                
                <p style={{
                  fontSize: '16px',
                  color: '#333333',
                  lineHeight: '1.6',
                  margin: '0',
                  fontWeight: '400',
                  letterSpacing: '0.2px'
                }}>
                  See current job openings.
                </p>
              </div>
              
              <button 
                style={{
                  backgroundColor: hoveredButton === 'team' ? '#a01830' : '#c41e3a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '16px 40px',
                  fontSize: '14px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  alignSelf: 'flex-start',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={() => setHoveredButton('team')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Learn more
              </button>
            </div>

            {/* Card 3 - MAHINDRA AI */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '45px 40px',
              height: '300px',
              border: '1px solid #d0d0d0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '400',
                  color: '#000000',
                  margin: '0 0 15px 0',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  lineHeight: '1.2'
                }}>
                  MAHINDRA AI
                </h2>
                
                <p style={{
                  fontSize: '16px',
                  color: '#333333',
                  lineHeight: '1.6',
                  margin: '0',
                  fontWeight: '400',
                  letterSpacing: '0.2px'
                }}>
                  A specialised AI division delivering digital transformation across businesses.
                </p>
              </div>
              
              <button 
                style={{
                  backgroundColor: hoveredButton === 'ai' ? '#a01830' : '#c41e3a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '16px 40px',
                  fontSize: '14px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  alignSelf: 'flex-start',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={() => setHoveredButton('ai')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @keyframes scrollLogos {
          from {
            left: -100%;
          }
          to {
            left: 0%;
          }
        }
        
        @keyframes scrollLogosReverse {
          from {
            right: -100%;
          }
          to {
            right: 0%;
          }
        }

        @media (max-width: 1024px) {
          section > div > div:last-child > div:first-child {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          section > div > div:last-child > div:first-child > div:last-child {
            padding: 40px !important;
          }
          section > div > div:last-child > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          section > div:last-child {
            padding: 60px 20px !important;
          }
          section > div:last-child > div > h1 {
            font-size: 36px !important;
            letter-spacing: 6px !important;
          }
          section > div:last-child > div > div:first-child > div:first-child {
            height: 250px !important;
          }
          section > div:last-child > div > div:first-child > div:first-child > div:last-child {
            padding: 30px !important;
          }
          section > div:last-child > div > div:first-child > div:first-child > div:last-child h2 {
            font-size: 28px !important;
          }
          section > div:last-child > div > div:last-child > div {
            padding: 35px 30px !important;
            height: auto !important;
          }
          section > div:last-child > div > div:last-child > div h2 {
            font-size: 26px !important;
          }
        }
      `}</style>
      </div>
    </section>
  );
};

export default WorkWithUs;
