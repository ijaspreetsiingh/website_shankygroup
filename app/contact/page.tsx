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
    <div className="contact-root w-full overflow-x-hidden min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <HeaderFour isScrolled={isScrolled} />
      <main className="flex-grow">
        {/* Hero Section - Mobile-first responsive */}
        <section className="relative min-h-[50vh] sm:min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[var(--background)]">
          <div className="relative z-[2] w-full max-w-[1900px] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-12 text-[var(--foreground)]">
            <div className="max-w-[800px]">
              {/* Breadcrumb */}
              <div className="mb-4 sm:mb-8 md:mb-10 text-xs sm:text-base text-[var(--text-secondary)] font-[family-name:var(--font-inter)]">
                <span className="cursor-pointer">Home</span>
                <span className="mx-1.5 sm:mx-2">/</span>
                <span className="text-[var(--accent)]">Contact Us</span>
              </div>

              <h1 className="section-heading text-2xl sm:text-4xl md:text-5xl lg:text-[72px] font-bold leading-[1.2] sm:leading-tight tracking-tight mt-0 mb-3 sm:mb-5 text-[var(--text-primary)]">
                GET IN TOUCH
              </h1>

              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-normal w-full max-w-full leading-relaxed mb-5 sm:mb-8 md:mb-10 font-[family-name:var(--font-lato)] opacity-90 text-[var(--text-secondary)]">
                We're here to discuss your goals and find the right solution. Connect with our team to explore how we can help your business grow.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
                <button className="w-full sm:w-auto bg-[#e63a27] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 px-5 sm:px-10 rounded-[30px] border-0 cursor-pointer transition-all duration-300 uppercase tracking-wider shadow-[0_4px_20px_rgba(230,58,39,0.3)] min-h-[48px] touch-manipulation active:scale-[0.98]">
                  Start Conversation
                </button>
                <button className="w-full sm:w-auto bg-transparent text-[var(--text-primary)] text-sm sm:text-base font-semibold py-3 sm:py-4 px-5 sm:px-10 rounded-[30px] border-2 border-[var(--card-border)] cursor-pointer transition-all duration-300 uppercase tracking-wider min-h-[48px] touch-manipulation active:scale-[0.98]">
                  View Locations
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section - Contact Information - Mobile perfect */}
        <section className="relative w-full min-h-0 py-8 sm:py-16 md:py-20 lg:min-h-[90vh] lg:flex lg:items-center lg:justify-center overflow-hidden bg-black">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 blur-[8px] z-0 scale-105"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=1080&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 z-[1]" />

          {/* Content - centered on all screens, full width on mobile */}
          <div className="relative z-[2] w-full max-w-[1400px] mx-auto px-3 sm:px-6 md:px-8 lg:px-10 flex justify-center lg:justify-end items-center">
            <div className="w-full max-w-[600px] lg:mr-0 bg-[rgba(30,30,30,0.9)] rounded-xl sm:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-[10px] text-center">
              <div className="mb-3 sm:mb-5">
                <span className="inline-block bg-[#e63a27] text-white text-[10px] sm:text-sm font-semibold py-1.5 sm:py-2.5 px-3 sm:px-5 rounded-[25px] uppercase tracking-wider">
                  Connect With Us
                </span>
              </div>

              <h2 className="section-heading text-xl sm:text-3xl md:text-4xl lg:text-[56px] font-bold text-white m-0 mb-3 sm:mb-6 leading-tight">
                Let's Talk
              </h2>

              <p className="text-base sm:text-xl md:text-2xl text-[#cccccc] m-0 mb-4 sm:mb-8 font-medium leading-snug">
                Your Success Starts Here
              </p>

              <div className="text-xs sm:text-base md:text-lg text-[#cccccc] leading-relaxed mb-4 sm:mb-8 md:mb-10 text-left space-y-3 sm:space-y-4">
                <p className="m-0">
                  Whether you're looking for partnership opportunities, need support, or want to learn more about our services, our team is ready to help you achieve your goals.
                </p>
                <p className="m-0">
                  We believe in building lasting relationships through exceptional service, innovative solutions, and a commitment to your success.
                </p>
              </div>

              <button className="w-full sm:w-auto bg-[#e63a27] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 px-5 sm:px-10 rounded-[30px] border-0 cursor-pointer transition-all duration-300 uppercase tracking-wider shadow-[0_4px_20px_rgba(230,58,39,0.3)] min-h-[48px] touch-manipulation active:scale-[0.98]">
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
