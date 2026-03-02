import { Link } from "react-router-dom";
import { useState } from "react";
import companyLogo from '../../components/homes/home-4/new_logo_finalM.png';
const FooterFour = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="main-footer" style={{
        background: 'linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=800&fit=crop&crop=center")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: '#1e293b',
        padding: '80px 0 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
          pointerEvents: 'none'
        }} />

        {/* Top Border Gradient */}
        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #10b981, #059669)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="widget-section">
            <div className="row">
              {/* Company Info Section */}
              <div className="col-lg-4 col-md-12 col-sm-12 footer-column">
                <div style={{
                  marginBottom: '40px',
                  animation: 'fadeInUp 0.8s ease-out'
                }}>
                  {/* Logo */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '16px'
                    }}>
                      <img 
                        src={companyLogo}
                        alt="Shanky Group Logo"
                        style={{
                          width: '90px',
                          height: '90px',
                          objectFit: 'contain',
                          borderRadius: '8px',
                         
                         
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                    </div>
                    <div style={{
                      width: '60px',
                      height: '3px',
                      background: 'linear-gradient(90deg, #10b981, #059669)',
                      margin: '12px 0',
                      borderRadius: '2px'
                    }} />
                  </div>

                  {/* Description */}
                  <p style={{
                    color: '#64748b',
                    fontSize: '16px',
                    lineHeight: '1.7',
                    marginBottom: '32px',
                    maxWidth: '400px'
                  }}>
                    Leading the future with innovation, excellence, and sustainable growth across diverse industries. Building tomorrow's legacy today.
                  </p>

                  {/* Social Links */}
                  <div>
                    <h6 style={{
                      color: '#1e293b',
                      fontSize: '14px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '16px'
                    }}>
                      Connect With Us
                    </h6>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {[
                        { icon: '📘', color: '#1877f2' },
                        { icon: '🐦', color: '#1da1f2' },
                        { icon: '📷', color: '#e4405f' },
                        { icon: '💼', color: '#0077b5' }
                      ].map((social, index) => (
                        <a
                          key={index}
                          href="#"
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            backgroundColor: '#f8fafc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            border: '1px solid #e2e8f0'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = social.color;
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = `0 10px 25px ${social.color}40`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="col-lg-2 col-md-6 col-sm-12 footer-column">
                <div style={{
                  marginBottom: '40px',
                  animation: 'fadeInUp 0.8s ease-out 0.2s both'
                }}>
                  <h4 style={{
                    color: '#1e293b',
                    fontSize: '18px',
                    fontWeight: '700',
                    marginBottom: '24px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Quick Links
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      { to: "/", text: "Home" },
                      { to: "/about", text: "About Us" },
                      { to: "/service", text: "Our Services" },
                      { to: "/portfolio", text: "Projects" },
                      { to: "/contact", text: "Contact" }
                    ].map((link, index) => (
                      <li key={index} style={{ marginBottom: '12px' }}>
                        <Link
                          to={link.to}
                          style={{
                            color: '#64748b',
                            textDecoration: 'none',
                            fontSize: '15px',
                            transition: 'all 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#3b82f6';
                            e.currentTarget.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#64748b';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span style={{ fontSize: '10px' }}>▶</span>
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Services Section */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div style={{
                  marginBottom: '40px',
                  animation: 'fadeInUp 0.8s ease-out 0.4s both'
                }}>
                  <h4 style={{
                    color: '#1e293b',
                    fontSize: '18px',
                    fontWeight: '700',
                    marginBottom: '24px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Our Services
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      "Financial Services",
                      "Smart Technology",
                      "Corporate Training",
                      "Construction",
                      "Metal Trading",
                      "Agricultural Solutions"
                    ].map((service, index) => (
                      <li key={index} style={{ marginBottom: '12px' }}>
                        <a
                          href="#"
                          style={{
                            color: '#64748b',
                            textDecoration: 'none',
                            fontSize: '15px',
                            transition: 'all 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#10b981';
                            e.currentTarget.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#64748b';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span style={{ fontSize: '10px' }}>▶</span>
                          {service}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter & Contact Section */}
              <div className="col-lg-3 col-md-12 col-sm-12 footer-column">
                <div style={{
                  marginBottom: '40px',
                  animation: 'fadeInUp 0.8s ease-out 0.6s both'
                }}>
                  <h4 style={{
                    color: '#1e293b',
                    fontSize: '18px',
                    fontWeight: '700',
                    marginBottom: '24px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Stay Connected
                  </h4>
                  
                  {/* Newsletter */}
                  <div style={{ marginBottom: '32px' }}>
                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      marginBottom: '16px'
                    }}>
                      Subscribe to our newsletter for updates and insights
                    </p>
                    <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          backgroundColor: '#f8fafc',
                          color: '#1e293b',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#3b82f6';
                          e.currentTarget.style.backgroundColor = '#ffffff';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.backgroundColor = '#f8fafc';
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          padding: '12px 20px',
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        Subscribe
                      </button>
                    </form>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h5 style={{
                      color: '#1e293b',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '16px'
                    }}>
                      Contact Info
                    </h5>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <span style={{ color: '#3b82f6', fontSize: '16px', marginTop: '2px' }}>📍</span>
                        <span style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
                          New Delhi, India
                        </span>
                      </li>
                      <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <span style={{ color: '#3b82f6', fontSize: '16px', marginTop: '2px' }}>📧</span>
                        <a href="mailto:info@shankygroup.com" style={{
                          color: '#64748b',
                          fontSize: '14px',
                          textDecoration: 'none',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
                          info@shankygroup.com
                        </a>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <span style={{ color: '#3b82f6', fontSize: '16px', marginTop: '2px' }}>📱</span>
                        <a href="tel:+911234567890" style={{
                          color: '#64748b',
                          fontSize: '14px',
                          textDecoration: 'none',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
                          +91 123 456 7890
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div style={{
            borderTop: '1px solid #e2e8f0',
            padding: '32px 0',
            marginTop: '60px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{ color: '#64748b', fontSize: '14px' }}>
                © {currentYear} <strong>Shanky Group</strong>. All rights reserved.
              </div>
              <div style={{ display: 'flex', gap: '24px' }}>
                {[
                  { text: "Privacy Policy", href: "#" },
                  { text: "Terms of Service", href: "#" },
                  { text: "Cookie Policy", href: "#" }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    style={{
                      color: '#64748b',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </footer>
    </>
  );
};

export default FooterFour;