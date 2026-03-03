'use client';

import { useState, useEffect } from 'react';
import I18nProvider, { useI18n } from './i18n/I18nProvider';
import HeaderFour from './home/home4/HeaderFour';
import HeroHomeFour from './home/home4/HeroHomeFour';
import AboutHomeFour from './home/home4/AboutHomeFour';
import MediaSection from './home/home4/who-we-are/aboutus';
import ForceForGood from './home/home4/ForceForGood';
import LegacyLeadership from './home/home4/LegacyLeadership';
import { GlobeDemo } from './home/home4/glob';
import WorkWithUs from './home/home4/work';
import ContactUs from './home/home4/ContactUs';
import FooterFour from './home/home4/FooterFour';

// Visitor tracking component
const VisitorTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        console.log('Starting visitor tracking...');
        
        let locationData: {
          ip: string;
          country: string;
          city: string;
          region: string;
          latitude: number | null;
          longitude: number | null;
          timezone: string;
        } = {
          ip: 'unknown',
          country: 'unknown',
          city: 'unknown',
          region: 'unknown',
          latitude: null,
          longitude: null,
          timezone: 'unknown'
        };

        // Try multiple geolocation methods with fallbacks
        try {
          // Method 1: Try ipapi.co with error handling
          const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
            signal: AbortSignal.timeout(5000) // 5 second timeout
          });
          
          if (response.ok) {
            const data = await response.json();
            locationData = {
              ip: data.ip || 'unknown',
              country: data.country_name || 'unknown',
              city: data.city || 'unknown',
              region: data.region || 'unknown',
              latitude: data.latitude || null,
              longitude: data.longitude || null,
              timezone: data.timezone || 'unknown'
            };
            console.log('Location data from ipapi.co:', locationData);
          } else {
            throw new Error(`HTTP ${response.status}`);
          }
        } catch (error) {
          console.warn('ipapi.co failed, trying alternative:', error instanceof Error ? error.message : String(error));
          
          // Method 2: Try ip-api.com (no CORS issues)
          try {
            const response = await fetch('http://ip-api.com/json/', {
              method: 'GET',
              signal: AbortSignal.timeout(5000)
            });
            
            if (response.ok) {
              const data = await response.json();
              locationData = {
                ip: data.query || 'unknown',
                country: data.country || 'unknown',
                city: data.city || 'unknown',
                region: data.regionName || 'unknown',
                latitude: data.lat || null,
                longitude: data.lon || null,
                timezone: data.timezone || 'unknown'
              };
              console.log('Location data from ip-api.com:', locationData);
            }
          } catch (fallbackError) {
            console.warn('ip-api.com also failed:', fallbackError instanceof Error ? fallbackError.message : String(fallbackError));
            
            // Method 3: Use browser's geolocation API (requires user permission)
            if (navigator.geolocation) {
              try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                  navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 5000,
                    enableHighAccuracy: false
                  });
                });
                
                locationData.latitude = position.coords.latitude;
                locationData.longitude = position.coords.longitude;
                console.log('Location from browser geolocation:', locationData);
              } catch (geoError) {
                console.warn('Browser geolocation failed:', geoError instanceof Error ? geoError.message : String(geoError));
              }
            }
          }
        }
        
        // Get browser and device info
        const visitorData = {
          ip: locationData.ip,
          country: locationData.country,
          city: locationData.city,
          region: locationData.region,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          timezone: locationData.timezone,
          userAgent: navigator.userAgent,
          browser: getBrowserInfo(),
          os: getOSInfo(),
          screenResolution: `${screen.width}x${screen.height}`,
          language: navigator.language,
          referrer: document.referrer || 'direct',
          visitTime: new Date().toISOString()
        };

        console.log('Prepared visitor data:', visitorData);

        // Send visitor data to backend
        const backendResponse = await fetch('http://localhost/contact_api.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'track_visitor',
            visitor_data: visitorData
          })
        });

        console.log('Backend response status:', backendResponse.status);
        
        if (backendResponse.ok) {
          const responseText = await backendResponse.text();
          console.log('Backend response:', responseText);
          
          try {
            const responseData = JSON.parse(responseText);
            if (responseData.status === 'success') {
              console.log('✅ Visitor tracked successfully!');
            } else {
              console.error('❌ Backend error:', responseData.message);
            }
          } catch (parseError) {
            console.error('❌ Failed to parse response:', parseError);
            console.log('Raw response:', responseText);
          }
        } else {
          console.error('❌ HTTP Error:', backendResponse.status);
          const errorText = await backendResponse.text();
          console.error('Error response:', errorText);
        }

      } catch (error) {
        console.error('❌ Error tracking visitor:', error);
        
        // Even if tracking fails, try to send basic visitor data
        try {
          const basicVisitorData = {
            ip: 'unknown',
            country: 'unknown',
            city: 'unknown',
            region: 'unknown',
            latitude: null,
            longitude: null,
            timezone: 'unknown',
            userAgent: navigator.userAgent,
            browser: getBrowserInfo(),
            os: getOSInfo(),
            screenResolution: `${screen.width}x${screen.height}`,
            language: navigator.language,
            referrer: document.referrer || 'direct',
            visitTime: new Date().toISOString()
          };

          await fetch('http://localhost/contact_api.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'track_visitor',
              visitor_data: basicVisitorData
            })
          });
          
          console.log('✅ Basic visitor data sent as fallback');
        } catch (fallbackError) {
          console.error('❌ Even fallback tracking failed:', fallbackError);
        }
      }
    };

    // Track visitor on page load
    trackVisitor();

    // Track visitor every 10 minutes (reduced from 5 to avoid rate limiting)
    const interval = setInterval(trackVisitor, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Helper functions to get browser and OS info
  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    if (ua.indexOf('Chrome') > -1) return 'Chrome';
    if (ua.indexOf('Safari') > -1) return 'Safari';
    if (ua.indexOf('Firefox') > -1) return 'Firefox';
    if (ua.indexOf('Edge') > -1) return 'Edge';
    return 'Other';
  };

  const getOSInfo = () => {
    const ua = navigator.userAgent;
    if (ua.indexOf('Windows') > -1) return 'Windows';
    if (ua.indexOf('Mac') > -1) return 'macOS';
    if (ua.indexOf('Linux') > -1) return 'Linux';
    if (ua.indexOf('Android') > -1) return 'Android';
    if (ua.indexOf('iOS') > -1) return 'iOS';
    return 'Other';
  };

  return null; // This component doesn't render anything
};

// Original Branded Loader Component
const BarLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[var(--background)] z-[9999] flex flex-col items-center justify-center">
      {/* Logo/Brand Container */}
      <div className="text-center animate-[fadeIn_1s_ease-out]">
        {/* Company Logo */}
        <div className="mb-[30px] opacity-0 animate-[slideUp_1s_ease-out_0.1s_forwards,fadeIn_1s_ease-out_0.1s_forwards] flex items-center justify-center">
          <img 
            src="/images/new_logo_finalM.png" 
            alt="Shanky Group Logo"
            className="w-[clamp(80px,12vw,160px)] h-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-2xl"
          />
        </div>
        
        {/* Company Label */}
        <div className="text-[12px] font-medium text-[var(--text-secondary)] tracking-[3px] uppercase mb-[15px] opacity-0 animate-[slideUp_1s_ease-out_0.2s_forwards,fadeIn_1s_ease-out_0.2s_forwards]">
          Since 2011
        </div>
        
        {/* Shanky Group Text */}
        <h1 className="text-[clamp(48px,6vw,96px)] font-[200] text-[var(--text-primary)] m-0 mb-[25px] tracking-[12px] leading-[1.1] uppercase font-serif opacity-0 animate-[slideUp_1.2s_ease-out_0.4s_forwards,fadeIn_1.2s_ease-out_0.4s_forwards]">
          Shanky Group
        </h1>
        
        {/* Tagline */}
        <div className="text-[16px] font-[300] text-[var(--text-secondary)] tracking-[1px] italic mb-[40px] opacity-0 animate-[slideUp_1s_ease-out_0.6s_forwards,fadeIn_1s_ease-out_0.6s_forwards]">
          Excellence in Every Sector
        </div>
        
        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-[40px] opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
          {/* Left Line */}
          <div className="w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[var(--text-secondary)] to-transparent"></div>
          
          {/* Diamond */}
          <div className="w-[8px] h-[8px] bg-[var(--text-primary)] rotate-45 mx-[20px]"></div>
          
          {/* Right Line */}
          <div className="w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[var(--text-secondary)] to-transparent"></div>
        </div>
        
        {/* Loading Indicator */}
        <div className="mt-[50px] flex flex-col items-center gap-[15px] opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
          {/* New Sliding Loader */}
          <div className="loader w-[250px] h-[50px] leading-[50px] text-center font-helvetica font-arial font-sans text-[#ce4233] text-[14px] font-black uppercase tracking-[0.2em] relative">
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Hide loader after 2 seconds
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loaderTimer);
    };
  }, []);

  return (
    <I18nProvider>
      <VisitorTracker />
      {isLoading && <BarLoader />}
      <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <HeaderFour isScrolled={isScrolled} />
        <main className="flex-grow">
          <HeroHomeFour />
          <AboutHomeFour />
          <MediaSection />
          <ForceForGood />
          <LegacyLeadership />
          <GlobeDemo />
          <WorkWithUs />
          <ContactUs />
        </main>
        <FooterFour />
      </div>
    </I18nProvider>
  );
}
