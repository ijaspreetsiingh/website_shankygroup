'use client';
import { useEffect, useState } from 'react';
import HeaderFour from '../home/home4/HeaderFour';
import FooterFour from '../home/home4/FooterFour';
import ContactUs from '../home/home4/ContactUs';

const ContactPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <HeaderFour isScrolled={isScrolled} />
      <main className="flex-grow">
        {/* Hero Section - Same as Careers Page */}
        <section 
          style={{
            position: 'relative',
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: 'var(--background)'
          }}>
          {/* Content */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '1900px',
            padding: '0 40px',
            color: 'var(--foreground)'
          }}>
            <div style={{
              maxWidth: '800px'
            }}>
              {/* Breadcrumb Navigation */}
              <div style={{
                marginBottom: '40px',
                fontSize: '16px',
                color: 'var(--text-secondary)',
                fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif'
              }}>
                <span style={{ cursor: 'pointer' }}>Home</span>
                <span style={{ margin: '0 8px' }}>/</span>
                <span style={{ color: 'var(--accent)' }}>Contact Us</span>
              </div>
              
              <h1 style={{
                fontSize: 'clamp(48px, 5vw, 72px)',
                fontWeight: '700',
                lineHeight: '1.1',
                letterSpacing: '-1.5px',
                margin: '0 0 20px 0',
                fontFamily: '"Montserrat", "Arial", sans-serif',
                color: 'var(--text-primary)'
              }}>
                GET IN TOUCH
              </h1>
              
              <p style={{
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontWeight: '400',
                width:'200%',
                lineHeight: '1.6',
                margin: '0 0 40px 0',
                fontFamily: '"Lato", "Arial", sans-serif',
                opacity: 0.9,
                color:'var(--text-secondary)'
              }}>
                We're here to discuss your goals and find the right solution. Connect with our team to explore how we can help your business grow.
              </p>
              
              <div style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                <button style={{
                  backgroundColor: '#e63a27',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                  padding: '16px 40px',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  boxShadow: '0 4px 20px rgba(230, 58, 39, 0.3)'
                }}>
                  Start Conversation
                </button>
                <button style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  fontWeight: '600',
                  padding: '16px 40px',
                  borderRadius: '30px',
                  border: '2px solid var(--card-border)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  View Locations
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section - Contact Information */}
        <section 
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
          {/* Background Image */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 1,
            filter: 'blur(8px)',
            zIndex: 0
          }} />
          
          {/* Dark Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
            zIndex: 1
          }} />
          
          {/* Content */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            {/* Text Content - Right Aligned */}
            <div style={{
              backgroundColor: 'rgba(30,30,30,0.85)',
              borderRadius: '20px',
              padding: '60px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
              maxWidth: '600px',
              marginRight: '-20px'
            }}>
              <div style={{
                marginBottom: '20px'
              }}>
                <span style={{
                  backgroundColor: '#e63a27',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '600',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Connect With Us
                </span>
              </div>
              
              <h2 style={{
                fontSize: 'clamp(42px, 4vw, 56px)',
                fontWeight: '700',
                color: '#ffffff',
                margin: '0 0 24px 0',
                lineHeight: '1.2',
                fontFamily: '"Montserrat", "Arial", sans-serif'
              }}>
                Let's Talk
              </h2>
              
              <p style={{
                fontSize: 'clamp(20px, 2vw, 24px)',
                color: '#cccccc',
                margin: '0 0 32px 0',
                lineHeight: '1.4',
                fontWeight: '500'
              }}>
                Your Success Starts Here
              </p>
              
              <div style={{
                fontSize: '18px',
                color: '#cccccc',
                lineHeight: '1.7',
                margin: '0 0 40px 0',
                textAlign: 'left'
              }}>
                <p style={{
                  margin: '0 0 20px 0'
                }}>
                  Whether you're looking for partnership opportunities, need support, or want to learn more about our services, our team is ready to help you achieve your goals.
                </p>
                <p style={{
                  margin: '0 0 20px 0'
                }}>
                  We believe in building lasting relationships through exceptional service, innovative solutions, and a commitment to your success.
                </p>
              </div>
              
              <button style={{
                backgroundColor: '#e63a27',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '600',
                padding: '16px 40px',
                borderRadius: '30px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 4px 20px rgba(230, 58, 39, 0.3)'
              }}>
                Contact Us Now
              </button>
            </div>
          </div>
        </section>
        
        <ContactUs />
      </main>
      <FooterFour />
    </div>
  );
};

export default ContactPage;
