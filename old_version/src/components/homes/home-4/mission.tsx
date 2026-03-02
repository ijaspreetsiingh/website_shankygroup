import React, { useState, useEffect, useRef } from "react";
import vissionImage from './mission.png';
import missionImage from './vission.png';

const VisionMission = () => {
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
        rootMargin: '0px 0px -50px 0px'
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
    <>
      <section 
        ref={sectionRef}
        style={{
          padding: '120px 0',
          backgroundColor: '#d8dce3',
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          position: 'relative',
          overflow: 'visible',
          minHeight: '800px'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '80px',
            alignItems: 'start',
            position: 'relative',
            minHeight: '600px'
          }}>
            {/* Vision Section - Left */}
            <div style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              position: 'relative',
              paddingTop: '80px',
              minHeight: '500px'
            }}>
              {/* Telescope Character Image - LEFT SIDE */}
              <div style={{
                position: 'absolute',
                top: '-100px',
                left: '-50px',
                width: '450px',
                height: '450px',
                zIndex: 2,
                pointerEvents: 'none',
                overflow: 'hidden'
              }}>
                <img 
                  src={vissionImage} 
                  alt="Vision Character"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'left center',
                    display: 'block',
                    margin: '0',
                    padding: '0',
                    border: 'none',
                    borderRadius: '0',
                    boxSizing: 'border-box'
                  }}
                  className="vision-character-image"
                />
              </div>

              <div style={{
                position: 'relative',
                marginBottom: '25px',
                zIndex: 3
              }}>
                <h2 style={{
                  fontSize: '95px',
                  fontWeight: '300',
                  margin: '0',
                  lineHeight: '1',
                  letterSpacing: '-3px',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  display: 'inline'
                }}>
                  {/* "visi" with outline/stroke effect - HOLLOW TEXT */}
                  <span style={{ 
                    color: 'transparent',
                    WebkitTextStroke: '2.5px #b8a8d8',
                    textStroke: '2.5px #b8a8d8',
                    fontWeight: '300'
                  }}>visi</span>
                  {/* "on" with solid fill - FILLED TEXT */}
                  <span style={{ 
                    color: '#7b1fa2',
                    fontWeight: '600',
                    WebkitTextStroke: '0px',
                    textStroke: '0px'
                  }}>on</span>
                </h2>
              </div>
              
              <p style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#5a5a5a',
                marginBottom: '25px',
                maxWidth: '450px',
                fontWeight: '400',
                letterSpacing: '0.2px',
                zIndex: 3,
                position: 'relative'
              }}>
                To be a leading multi-sector conglomerate recognized for innovation, 
                excellence, and sustainable growth. We envision empowering businesses 
                and individuals through integrated solutions that transform industries 
                and create lasting value.
              </p>

              <button style={{
                backgroundColor: '#e91e63',
                color: '#ffffff',
                border: 'none',
                padding: '14px 45px',
                fontSize: '13px',
                fontWeight: '700',
                borderRadius: '6px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                boxShadow: '0 4px 12px rgba(233, 30, 99, 0.35)',
                transition: 'all 0.3s ease',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                zIndex: 3,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(233, 30, 99, 0.45)';
                e.currentTarget.style.backgroundColor = '#d81b60';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(233, 30, 99, 0.35)';
                e.currentTarget.style.backgroundColor = '#e91e63';
              }}
              >
                ASSESS
              </button>
            </div>

            {/* Mission Section - Right */}
            <div style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
              position: 'relative',
              paddingTop: '80px',
              minHeight: '500px'
            }}>
              {/* Bow-Arrow Character Image - RIGHT SIDE */}
              <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-50px',
                width: '450px',
                height: '450px',
                zIndex: 2,
                pointerEvents: 'none',
                overflow: 'hidden'
              }}>
                <img 
                  src={missionImage} 
                  alt="Mission Character"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'right center',
                    display: 'block',
                    margin: '0',
                    padding: '0',
                    border: 'none',
                    borderRadius: '0',
                    boxSizing: 'border-box'
                  }}
                  className="mission-character-image"
                />
              </div>

              {/* Mission Text with Outline Effect */}
              <div style={{
                position: 'relative',
                marginBottom: '25px',
                zIndex: 3
              }}>
                <h2 style={{
                  fontSize: '95px',
                  fontWeight: '300',
                  margin: '0',
                  lineHeight: '1',
                  letterSpacing: '-3px',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  display: 'inline'
                }}>
                  {/* "Missi" with outline/stroke effect - HOLLOW TEXT */}
                  <span style={{ 
                    color: 'transparent',
                    WebkitTextStroke: '2.5px #b8a8d8',
                    textStroke: '2.5px #b8a8d8',
                    fontWeight: '300'
                  }}>Missi</span>
                  {/* "on" with solid fill - FILLED TEXT */}
                  <span style={{ 
                    color: '#7b1fa2',
                    fontWeight: '600',
                    WebkitTextStroke: '0px',
                    textStroke: '0px'
                  }}>on</span>
                </h2>
              </div>
              
              <p style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#5a5a5a',
                marginBottom: '25px',
                maxWidth: '450px',
                fontWeight: '400',
                letterSpacing: '0.2px',
                zIndex: 3,
                position: 'relative'
              }}>
                Our mission is to deliver exceptional services and products across 
                diverse sectors through strategic innovation, operational excellence, 
                and unwavering commitment to customer satisfaction. We strive to build 
                sustainable businesses that contribute positively to society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive CSS Styles */}
      <style>{`
        /* Global image overrides */
        .vision-character-image,
        .mission-character-image {
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
          object-fit: contain !important;
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
          border-radius: 0 !important;
          box-sizing: border-box !important;
        }
        
        /* Desktop Styles - Default */
        @media (max-width: 1024px) {
          section > div {
            padding: 0 30px !important;
          }
          section > div > div {
            gap: 60px !important;
          }
          section > div > div > div > div:first-child {
            width: 350px !important;
            height: 350px !important;
            top: -80px !important;
          }
          .vision-character-image {
            left: -30px !important;
          }
          .mission-character-image {
            right: -30px !important;
          }
          section > div > div > div > div h2 {
            font-size: 80px !important;
          }
        }
        
        /* Tablet Styles */
        @media (max-width: 768px) {
          section {
            padding: 60px 0 !important;
            min-height: auto !important;
          }
          section > div {
            padding: 0 20px !important;
          }
          section > div > div {
            grid-template-columns: 1fr !important;
            gap: 100px !important;
            min-height: auto !important;
          }
          section > div > div > div {
            min-height: 400px !important;
            padding-top: 120px !important;
          }
          section > div > div > div > div:first-child {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            margin: 0 auto 30px !important;
            display: block !important;
            width: 300px !important;
            height: 300px !important;
          }
          section > div > div > div > div h2 {
            font-size: 65px !important;
            text-align: center !important;
          }
          section > div > div > div > div h2 span:first-child {
            -webkit-text-stroke: 2px #b8a8d8 !important;
          }
          section > div > div > div p {
            font-size: 13px !important;
            max-width: 100% !important;
            text-align: center !important;
            margin: 0 auto 25px !important;
          }
          section > div > div > div button {
            padding: 12px 35px !important;
            font-size: 12px !important;
            display: block !important;
            margin: 0 auto !important;
          }
        }
        
        /* Mobile Styles */
        @media (max-width: 480px) {
          section > div > div > div {
            min-height: 350px !important;
            padding-top: 100px !important;
          }
          section > div > div > div > div:first-child {
            width: 250px !important;
            height: 250px !important;
            margin-bottom: 20px !important;
          }
          section > div > div > div > div h2 {
            font-size: 50px !important;
            letter-spacing: -2px !important;
          }
          section > div > div > div > div h2 span:first-child {
            -webkit-text-stroke: 1.5px #b8a8d8 !important;
          }
        }
      `}</style>

      {/* Manufacturing Footprint Section */}
      <section style={{
        padding: '100px 0',
        backgroundColor: '#f8f9fa',
        fontFamily: '"Helvetica Neue", Arial, sans-serif'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px'
        }}>
          {/* Section Title */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '300',
              color: '#2c3e50',
              margin: '0 0 20px 0',
              letterSpacing: '-1px'
            }}>
              Our Manufacturing Footprint
            </h2>
            <div style={{
              width: '80px',
              height: '3px',
              backgroundColor: '#e91e63',
              margin: '0 auto'
            }}></div>
          </div>

          {/* Left-Right Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'start'
          }}>
            {/* Left Side - Map */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
              padding: '30px',
              position: 'relative'
            }}>
              <div style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#f0f4f8',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 600\'%3E%3Cpath d=\'M400 100 Q500 150 550 250 T600 400 Q550 450 400 500 T200 400 Q150 350 200 250 T400 100\' fill=\'%23e8f4f8\' stroke=\'%23b8d4e3\' stroke-width=\'2\'/%3E%3C/svg%3E")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}>
                <div style={{
                  textAlign: 'center',
                  color: '#64748b',
                  zIndex: 2
                }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '15px'
                  }}>🗺️</div>
                  <p style={{
                    fontSize: '16px',
                    margin: '0',
                    fontWeight: '500'
                  }}>India Map</p>
                  <p style={{
                    fontSize: '12px',
                    margin: '5px 0 0 0',
                    color: '#94a3b8'
                  }}>Strategic manufacturing locations
                  </p>
                </div>
                {/* Factory location indicators */}
                <div style={{
                  position: 'absolute',
                  top: '25%',
                  left: '30%',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#e91e63',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(233, 30, 99, 0.4)',
                  zIndex: 3
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '35%',
                  left: '50%',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#e91e63',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(233, 30, 99, 0.4)',
                  zIndex: 3
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '30%',
                  left: '70%',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#e91e63',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(233, 30, 99, 0.4)',
                  zIndex: 3
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '55%',
                  left: '40%',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#e91e63',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(233, 30, 99, 0.4)',
                  zIndex: 3
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '60%',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#e91e63',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(233, 30, 99, 0.4)',
                  zIndex: 3
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '65%',
                  left: '75%',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#e91e63',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(233, 30, 99, 0.4)',
                  zIndex: 3
                }}></div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              {/* Summary Stats */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
                padding: '30px',
                marginBottom: '30px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#2c3e50',
                  margin: '0 0 20px 0'
                }}>
                  Manufacturing Overview
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px'
                }}>
                  <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: '700',
                      color: '#e91e63',
                      marginBottom: '5px'
                    }}>163</div>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Owned</div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: '700',
                      color: '#3b82f6',
                      marginBottom: '5px'
                    }}>120</div>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Third Party</div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: '700',
                      color: '#10b981',
                      marginBottom: '5px'
                    }}>283</div>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Total</div>
                  </div>
                </div>
              </div>

              {/* Key Categories */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
                padding: '30px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#2c3e50',
                  margin: '0 0 20px 0'
                }}>
                  Key Manufacturing Categories
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '15px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#e91e63',
                      borderRadius: '50%',
                      marginRight: '10px'
                    }}></div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#2c3e50',
                        marginBottom: '2px'
                      }}>RMC</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b'
                      }}>238 facilities</div>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '50%',
                      marginRight: '10px'
                    }}></div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#2c3e50',
                        marginBottom: '2px'
                      }}>Tiles</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b'
                      }}>18 facilities</div>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#10b981',
                      borderRadius: '50%',
                      marginRight: '10px'
                    }}></div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#2c3e50',
                        marginBottom: '2px'
                      }}>Walling Products</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b'
                      }}>7 facilities</div>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#f59e0b',
                      borderRadius: '50%',
                      marginRight: '10px'
                    }}></div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#2c3e50',
                        marginBottom: '2px'
                      }}>Paints</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b'
                      }}>3 facilities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisionMission;