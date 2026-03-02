 
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeaderFour = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWhoWeAreOpen, setIsWhoWeAreOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);

  // Business companies data
  const companies = [
    {
      name: 'Shanky Financial Services',
      description: 'Comprehensive financial solutions and investment services',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=60&h=60&fit=crop&crop=center',
      link: '/financial-services'
    },
    {
      name: 'VMS HUB',
      description: 'Agricultural innovation and supply chain management',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=60&h=60&fit=crop&crop=center',
      link: '/vms-hub'
    },
    {
      name: 'Shanky Smart Tech',
      description: 'Renewable energy and sustainable technology solutions',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=60&h=60&fit=crop&crop=center',
      link: '/smart-tech'
    },
    {
      name: 'Shanky Corporate Training',
      description: 'Professional development and skill enhancement programs',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=60&h=60&fit=crop&crop=center',
      link: '/corporate-training'
    },
    {
      name: 'Shanky Buildtech',
      description: 'Construction and infrastructure development services',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb92c3d71?w=60&h=60&fit=crop&crop=center',
      link: '/buildtech'
    },
    {
      name: 'Shanky Metals',
      description: 'Metal trading and manufacturing solutions',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=60&h=60&fit=crop&crop=center',
      link: '/metals'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {/* Mini Header - Top Bar */}
      <div className="mini-header" style={{
        background: '#ffffff',
        position: 'fixed',
        top: isScrolled ? '-45px' : '0',
        left: '0',
        right: '0',
        zIndex: 999,
        transition: 'top 0.3s ease',
        height: '45px',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 60px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Left Side - Company Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '25px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span style={{
                color: '#666666',
                fontSize: '12px',
                fontWeight: '400',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                letterSpacing: '0.3px'
              }}>
                Mumbai, India
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span style={{
                color: '#666666',
                fontSize: '12px',
                fontWeight: '400',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                letterSpacing: '0.3px'
              }}>
                Mon-Fri: 9AM-6PM
              </span>
            </div>
          </div>

          {/* Right Side - Contact & Social */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            {/* Contact Number */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              paddingRight: '20px',
              borderRight: '1px solid #e5e5e5'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span style={{
                color: '#333333',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                letterSpacing: '0.5px'
              }}>
                +91 98765 43210
              </span>
            </div>

            {/* Social Icons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <a href="#" style={{
                color: '#666666',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                transition: 'all 0.3s ease',
                opacity: 0.8
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" style={{
                color: '#666666',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                transition: 'all 0.3s ease',
                opacity: 0.8
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" style={{
                color: '#666666',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                transition: 'all 0.3s ease',
                opacity: 0.8
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" style={{
                color: '#666666',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                transition: 'all 0.3s ease',
                opacity: 0.8
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header header-style-4" style={{
        background: isScrolled ? '#ffffff' : '#ffffff',
        borderBottom: 'none',
        position: 'fixed',
        top: isScrolled ? '0' : '45px',
        left: '0',
        right: '0',
        zIndex: 1000,
        transition: 'top 0.3s ease, background-color 0.3s ease'
      }}>
        <div className="container-fluid" style={{
          padding: '0 20px'
        }}>
          <div className="header-content" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '140px',
            maxWidth: '1600px',
            margin: '0 auto'            
          }}>
            {/* Logo - Left Side */}
            <div className="header-left" style={{
              flex: '0 0 auto'
            }}>
              <figure className="logo" style={{margin: 0}}>
                <Link to="/" style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <img 
                    src="/src/components/homes/home-4/new_logo_finalM.png" 
                    alt="Shnaky Group" 
                    style={{
                      height: '120px',
                      width: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </Link>
              </figure>
            </div>

            {/* Navigation Menu - Center */}
            <div className="header-center" style={{
              flex: '1 1 auto',
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center'
            }}>
              <nav className="main-menu" style={{
                display: 'flex',
                gap: '35px',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                position: 'relative'
              }}>
                {/* WHO WE ARE Dropdown */}
                <div 
                  style={{
                    position: 'relative'
                  }}
                  onMouseEnter={() => setIsWhoWeAreOpen(true)}
                  onMouseLeave={() => setIsWhoWeAreOpen(false)}
                >
                  <div style={{
                    color: '#000000',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: '500',
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s ease',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    WHO WE ARE
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    minWidth: '220px',
                    opacity: isWhoWeAreOpen ? 1 : 0,
                    visibility: isWhoWeAreOpen ? 'visible' : 'hidden',
                    transform: isWhoWeAreOpen ? 'translateY(0)' : 'translateY(-10px)',
                    transition: 'all 0.3s ease',
                    zIndex: 1000,
                    marginTop: '10px'
                  }}>
                    <Link 
                      to="/about-us" 
                      style={{
                        display: 'block',
                        padding: '14px 20px',
                        color: '#1e293b',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        transition: 'all 0.3s ease',
                        borderBottom: '1px solid #f1f5f9'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.color = '#3b82f6';
                        e.currentTarget.style.paddingLeft = '24px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#1e293b';
                        e.currentTarget.style.paddingLeft = '20px';
                      }}
                    >
                      About Us
                    </Link>
                    <Link 
                      to="/leadership" 
                      style={{
                        display: 'block',
                        padding: '14px 20px',
                        color: '#1e293b',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        transition: 'all 0.3s ease',
                        borderBottom: '1px solid #f1f5f9'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.color = '#3b82f6';
                        e.currentTarget.style.paddingLeft = '24px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#1e293b';
                        e.currentTarget.style.paddingLeft = '20px';
                      }}
                    >
                      Leadership
                    </Link>
                    <Link 
                      to="/mission-vision" 
                      style={{
                        display: 'block',
                        padding: '14px 20px',
                        color: '#1e293b',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.color = '#3b82f6';
                        e.currentTarget.style.paddingLeft = '24px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#1e293b';
                        e.currentTarget.style.paddingLeft = '20px';
                      }}
                    >
                      Mission & Vision
                    </Link>
                  </div>
                </div>
                {/* BUSINESS Dropdown */}
                <div 
                  style={{
                    position: 'relative'
                  }}
                  onMouseEnter={() => setIsBusinessOpen(true)}
                  onMouseLeave={() => setIsBusinessOpen(false)}
                >
                  <div style={{
                    color: '#000000',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: '500',
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s ease',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    BUSINESSES
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  
                  {/* Business Dropdown Menu */}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    width: '680px',
                    opacity: isBusinessOpen ? 1 : 0,
                    visibility: isBusinessOpen ? 'visible' : 'hidden',
                    transform: isBusinessOpen ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(-20px) scale(0.95)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 1000,
                    marginTop: '20px',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    backdropFilter: 'blur(20px)'
                  }}>
                    {/* Companies Grid - Full Width */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '0'
                    }}>
                      {companies.map((company, index) => (
                        <Link
                          key={index}
                          to={company.link}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '32px 20px',
                            textDecoration: 'none',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            borderBottom: index < 3 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
                            borderRight: (index + 1) % 3 !== 0 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                            const img = e.currentTarget.querySelector('img');
                            if (img) img.style.transform = 'scale(1.1)';
                            const arrow = e.currentTarget.querySelector('.arrow-icon');
                            if (arrow) {
                              arrow.style.opacity = '1';
                              arrow.style.transform = 'translateY(0)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            const img = e.currentTarget.querySelector('img');
                            if (img) img.style.transform = 'scale(1)';
                            const arrow = e.currentTarget.querySelector('.arrow-icon');
                            if (arrow) {
                              arrow.style.opacity = '0';
                              arrow.style.transform = 'translateY(8px)';
                            }
                          }}
                        >
                          {/* Company Image Container */}
                          <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            marginBottom: '16px',
                            backgroundColor: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                            transition: 'all 0.3s ease'
                          }}>
                            <img 
                              src={company.image} 
                              alt={company.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease'
                              }}
                            />
                          </div>
                          
                          {/* Company Info */}
                          <div style={{
                            textAlign: 'center',
                            maxWidth: '160px'
                          }}>
                            <h4 style={{
                              margin: '0 0 8px 0',
                              fontSize: '14px',
                              fontWeight: '700',
                              color: '#0f172a',
                              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                              lineHeight: '1.3',
                              letterSpacing: '-0.025em'
                            }}>
                              {company.name.replace('Shanky ', '').replace('VMS ', '')}
                            </h4>
                            <p style={{
                              margin: 0,
                              fontSize: '11px',
                              color: '#64748b',
                              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                              lineHeight: '1.4',
                              fontWeight: '400'
                            }}>
                              {company.description.split(' ')[0]} {company.description.split(' ')[1]} {company.description.split(' ')[2]}
                            </p>
                          </div>
                          
                          {/* Arrow Icon */}
                          <div 
                            className="arrow-icon"
                            style={{
                              position: 'absolute',
                              bottom: '16px',
                              opacity: 0,
                              transform: 'translateY(8px)',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Bottom Bar */}
                    <div style={{
                      padding: '20px 32px',
                      backgroundColor: 'linear-gradient(to right, #f8fafc, #ffffff)',
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#64748b',
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '2px'
                        }}>
                          Portfolio Overview
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: '#94a3b8',
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                          6 Business Verticals • Diverse Industries
                        </div>
                      </div>
                      <Link
                        to="/businesses"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 20px',
                          backgroundColor: '#0f172a',
                          color: '#ffffff',
                          textDecoration: 'none',
                          fontSize: '12px',
                          fontWeight: '600',
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          borderRadius: '8px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1e293b';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#0f172a';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        Explore All
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <Link to="/media" style={{
                  color: '#000000',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>MEDIA</Link>
                <Link to="/investors" style={{
                  color: '#000000',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>INVESTORS</Link>
                <Link to="/community" style={{
                  color: '#000000',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>COMMUNITY</Link>
                <Link to="/sustainability" style={{
                  color: '#000000',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>SUSTAINABILITY</Link>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="header-right" style={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              {/* Search Icon */}
              <div style={{
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                transition: 'background-color 0.3s ease'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              
              {/* Language Button */}
              <button style={{
                backgroundColor: 'transparent',
                border: '1px solid #000000',
                color: '#000000',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '500',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '0.5px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>
                ENGLISH
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderFour;