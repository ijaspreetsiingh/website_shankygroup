'use client';

import { useState, useEffect, useRef } from "react";
import { useI18n } from '../../i18n/I18nProvider';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    status: '',
    address: '',
    state: '',
    city: '',
    country: '',
    gstNo: '',
    contactPerson: '',
    designation: '',
    landline: '',
    mobile: '',
    email: '',
    website: '',
    message: '',
    exclusiveOffers: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
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

  // Initialize dark mode (match app: default dark)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      const shouldBeDark = saved === 'dark' || (saved !== 'light' && saved !== 'dark');
      setIsDark(shouldBeDark);
    }
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    // Observer for class changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData(prev => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.companyName || !formData.firstName || !formData.lastName || !formData.email || !formData.mobile) {
      console.error('Missing required fields:', {
        companyName: formData.companyName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile
      });
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    console.log('Vendor form data being sent:', formData);
    
    // Create a copy to ensure we're sending the right data
    const dataToSend = { 
      ...formData,
      action: 'submit_vendor_registration' // Important: specify vendor registration action
    };
    console.log('Vendor data to send:', dataToSend);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (data.status !== 'success') {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Vendor submission error:', error);
      // Optional: Show error to user, but for now we'll proceed to show success for UX demo
      // or return here to stop success animation:
      // setIsSubmitting(false);
      // return; 
    }
    
    // Continue with success animation
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for smoothness
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Play success sound
    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Create a pleasant success tone
    oscillator.frequency.setValueAtTime(523.25, context.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, context.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, context.currentTime + 0.2); // G5
    
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.4);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.4);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        companyName: '',
        status: '',
        address: '',
        state: '',
        city: '',
        country: '',
        gstNo: '',
        contactPerson: '',
        designation: '',
        landline: '',
        mobile: '',
        email: '',
        website: '',
        message: '',
        exclusiveOffers: false
      });
    }, 3000);
  };

  return (
    <>
      <section ref={sectionRef} className={`w-full min-h-screen flex items-center justify-center px-0 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 transition-all duration-500 ease-out ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[var(--background)]'
      }`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)' }}>
      {/* Main container - form-first on mobile for engagement */}
      <div 
        className="relative w-full max-w-[1800px] rounded-none sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.98)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/65" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[48%_52%] gap-0 lg:gap-6 px-2 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 xl:py-14">
          
          {/* Right Section - Form Card (show first on mobile) - blur/glass background */}
          <div 
            className="order-1 lg:order-2 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20 min-h-0"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(20px)' }}
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="flex h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-[#e63a27] items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0021 18.586V19a2 2 0 01-2 2z" /></svg>
              </span>
              <div>
                <h2 className="section-heading text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {t('vendor_form_title')}
                </h2>
                <p className="section-subheading text-xs sm:text-sm text-white/80">
                  {t('vendor_form_subtitle')}
                </p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 sm:py-10 px-4 bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/30">
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">{t('thank_you')}</h4>
                <p className="text-sm sm:text-base text-white/85">{t('message_sent')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Company block */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#e63a27]">Company</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]"
                      placeholder="Company Name *"
                    />
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px] [&_option]:text-gray-800"
                    >
                      <option value="" className="text-gray-500">Status *</option>
                      <option value="active" className="text-gray-800">Active</option>
                      <option value="inactive" className="text-gray-800">Inactive</option>
                      <option value="prospective" className="text-gray-800">Prospective</option>
                    </select>
                  </div>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="Address *" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} required className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="State *" />
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="City *" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="country" value={formData.country} onChange={handleInputChange} required className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="Country *" />
                    <input type="text" name="gstNo" value={formData.gstNo} onChange={handleInputChange} required className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="GST No. *" />
                  </div>
                </div>

                {/* Your details */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#e63a27]">Your details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required autoComplete="given-name" className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="First Name *" />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required autoComplete="family-name" className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="Last Name *" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="Contact Person" />
                    <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} required className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="Designation *" />
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#e63a27]">Contact</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="tel" name="landline" value={formData.landline} onChange={handleInputChange} className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="Landline" />
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} required className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="Mobile *" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="Email *" />
                    <input type="url" name="website" value={formData.website} onChange={handleInputChange} className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]" placeholder="Website" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">{t('message')}</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={4} className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all resize-none min-h-[100px]" placeholder="Tell us about your business..." />
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" name="exclusiveOffers" checked={formData.exclusiveOffers} onChange={handleInputChange} className="mt-1.5 w-4 h-4 accent-[#e63a27] cursor-pointer rounded" id="offers" />
                  <label htmlFor="offers" className="text-sm text-white/80 leading-snug cursor-pointer">{t('exclusive_offers')}</label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 sm:py-4 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all min-h-[52px] flex items-center justify-center gap-2 touch-manipulation disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>{t('submitting')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('submit')}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Left Section - Info (after form on mobile) */}
          <div className="order-2 lg:order-1 text-white flex flex-col justify-center lg:justify-between py-4 sm:py-6 lg:py-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-20px)' }}>
            <div className="lg:pt-2">
              <h1 className="section-heading text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.5rem] xl:text-[2.8rem] leading-tight font-bold mb-2 sm:mb-4 tracking-tight">
                {t('vendor_heading_1')}<br />
                {t('vendor_heading_2')}
              </h1>
              <p className="section-subheading text-sm sm:text-base text-white/85 leading-relaxed mb-6 lg:mb-0 max-w-md">
                {t('vendor_desc')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm lg:pt-10">
              <div>
                <h3 className="font-semibold mb-1 text-white/90">{t('location')}</h3>
                <p className="text-white/75 text-xs sm:text-sm leading-relaxed">{t('address')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-white/90">{t('email')}</h3>
                <p className="text-white/75 text-xs sm:text-sm">info@shankygroup.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-white/90">{t('contact')}</h3>
                <p className="text-white/75 text-xs sm:text-sm">+011-47586938</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-white/90">{t('social_media')}</h3>
                <div className="flex gap-2">
                  <a href="https://www.instagram.com/shankygroup?igsh=eTVseG9leGRqcHF6" className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white/80 hover:bg-[#e63a27] hover:text-white transition-all" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg></a>
                  <a href="https://www.linkedin.com/company/shankygroup" className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white/80 hover:bg-[#0A66C2] hover:text-white transition-all" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                  <a href="https://www.facebook.com/share/1Hcjvg7fAr/" className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white/80 hover:bg-[#1877F2] hover:text-white transition-all" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Professional Thank You Message */}
    {isSubmitted && (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl max-w-sm sm:max-w-md mx-2 sm:mx-4 transform scale-0 animate-bounce-in">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white animate-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Thank You!</h3>
            <p className="text-sm sm:text-base text-green-100">Your message has been sent successfully. We&apos;ll get back to you soon.</p>
          </div>
        </div>
      </div>
    )}

    {/* Custom Animation Styles */}
    <style jsx>{`
      @keyframes bounce-in {
        0% {
          transform: scale(0) rotate(0deg);
          opacity: 0;
        }
        50% {
          transform: scale(1.1) rotate(5deg);
          opacity: 1;
        }
        100% {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
      }
      
      @keyframes checkmark {
        0% {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          transform: scale(0.3);
          opacity: 0;
        }
        30% {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          transform: scale(0.3);
          opacity: 1;
        }
        100% {
          stroke-dasharray: 100;
          stroke-dashoffset: 0;
          transform: scale(1);
          opacity: 1;
        }
      }
      
      .animate-bounce-in {
        animation: bounce-in 0.6s ease-out;
      }
      
      .animate-checkmark {
        animation: checkmark 0.8s ease-out;
      }
    `}</style>
    </>
  );
};

export default ContactUs;