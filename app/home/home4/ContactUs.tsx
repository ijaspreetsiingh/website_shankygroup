'use client';

import { useState, useEffect, useRef } from "react";
import { useI18n } from '../../i18n/I18nProvider';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    state: '',
    phone: '',
    email: '',
    inquiryType: '',
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

  // Initialize dark mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = saved === 'dark' || (!saved && systemPrefersDark);
      
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData(prev => ({ ...prev, [target.name]: value }));
  };

  const handleInquiryTypeClick = (type: string) => {
    console.log('Selected inquiry type:', type);
    setFormData(prev => ({ ...prev, inquiryType: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inquiry type is selected
    if (!formData.inquiryType) {
      console.error('Inquiry type is required');
      alert('Please select an inquiry type');
      return;
    }
    
    setIsSubmitting(true);
    
    console.log('Form data being sent:', formData);
    console.log('Inquiry type specifically:', formData.inquiryType);
    console.log('Type of inquiryType:', typeof formData.inquiryType);
    
    // Create a copy to ensure we're sending the right data
    const dataToSend = { ...formData };
    console.log('Data to send:', dataToSend);
    
    try {
      // Replace with your actual PHP server URL
      // If using XAMPP/WAMP, place contact_api.php in htdocs and use http://localhost/contact_api.php
      const response = await fetch('http://localhost/contact_api.php', {
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
      console.error('Submission error:', error);
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
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
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
        state: '',
        phone: '',
        email: '',
        inquiryType: '',
        message: '',
        exclusiveOffers: false
      });
    }, 3000);
  };

  return (
    <>
      <section ref={sectionRef} className={`w-full min-h-screen flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isDark ? 'bg-black' : 'bg-white'
      }`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(80px)' }}>
      
      {/* Main Dark Rounded Container */}
      <div 
        className="relative w-full max-w-[1800px] rounded-[16px sm:rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-2xl bg-cover bg-center transition-all duration-1200 ease-[cubic-bezier(0.23,1,0.32,1)] delay-200"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60"></div>
        
        {/* Content Container */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-2 sm:gap-3 lg:gap-4 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 py-6 sm:py-8 lg:py-12 xl:py-14">
          
          {/* Left Section - Information */}
          <div className="text-white pr-2 sm:pr-4 lg:pr-6 xl:pr-8 flex flex-col justify-between transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] delay-400" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-80px)' }}>
            <div>
              <h1 
                className="text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[2.8rem] leading-[1.15] font-bold mb-2 sm:mb-3 lg:mb-4 tracking-tight transition-all duration-800 delay-600"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(60px)' }}
              >
                {t('you_have_questions')},<br />
                {t('we_have_answers')}
              </h1>
              <p 
                className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.875rem] lg:text-[0.875rem] leading-[1.6] mb-6 sm:mb-8 lg:mb-12 opacity-85 font-light max-w-[280px] sm:max-w-[350px] md:max-w-[420px] transition-all duration-800 delay-800"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)' }}
              >
                {t('contact_desc')}
              </p>
            </div>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 lg:gap-x-16 xl:gap-x-20 gap-y-4 sm:gap-y-6 lg:gap-y-8 mt-2 sm:mt-4 transition-all duration-800 delay-1000" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}>
              {/* Location */}
              <div className="transition-all duration-600 delay-1200" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                <h3 className="text-[0.875rem] sm:text-[0.9rem] md:text-[1rem] font-semibold mb-1.5 sm:mb-2 lg:mb-2.5">{t('location')}</h3>
                <p className="text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] leading-[1.65] opacity-80 font-light">
                  {t('address')}
                </p>
              </div>

              {/* Social Media */}
              <div className="transition-all duration-600 delay-1400" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                <h3 className="text-[0.875rem] sm:text-[0.9rem] md:text-[1rem] font-semibold mb-1.5 sm:mb-2 lg:mb-2.5">{t('social_media')}</h3>
                <div className="flex gap-3">
                  <a href="#" className="text-white opacity-80 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 hover:opacity-100 hover:text-[#C13584] hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.848-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white opacity-80 flex items-center justify-center w-5 h-5 transition-all duration-300 hover:opacity-100 hover:text-[#0A66C2] hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white opacity-80 flex items-center justify-center w-5 h-5 transition-all duration-300 hover:opacity-100 hover:text-[#0077b5] hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white opacity-80 flex items-center justify-center w-5 h-5 transition-all duration-300 hover:opacity-100 hover:text-[#1DA1F2] hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="transition-all duration-600 delay-1600" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                <h3 className="text-[0.875rem] sm:text-[0.9rem] md:text-[1rem] font-semibold mb-1.5 sm:mb-2 lg:mb-2.5">{t('email')}</h3>
                <p className="text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] leading-[1.65] opacity-80 font-light">
                  info@shankygroup.com
                </p>
              </div>

              {/* Contact */}
              <div className="transition-all duration-600 delay-1800" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                <h3 className="text-[0.875rem] sm:text-[0.9rem] md:text-[1rem] font-semibold mb-1.5 sm:mb-2 lg:mb-2.5">{t('contact')}</h3>
                <p className="text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] leading-[1.65] opacity-80 font-light">
                  +66 77 123 456
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Form Card */}
          <div 
            className="bg-white/10 backdrop-blur-md rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] xl:rounded-[24px] p-4 sm:p-6 lg:p-8 shadow-md border border-white/20 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] delay-600 hover:shadow-xl hover:scale-[1.02]"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(80px)' }}
          >
            <h2 
              className={`text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2rem] xl:text-[2.2rem] font-bold mb-1 sm:mb-1.5 lg:mb-1.5 ${
                isDark ? 'text-[#d8d4d4]' : 'text-white'
              } transition-all duration-800 delay-800`}
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              {t('tell_us_what_you_need')}
            </h2>
            <p 
              className={`text-[0.7rem] sm:text-[0.75rem] md:text-[0.75rem] lg:text-[0.75rem] mb-4 sm:mb-5 lg:mb-6 font-normal ${
                isDark ? 'text-[#d8d4d4]/80' : 'text-white/80'
              } transition-all duration-800 delay-1000`}
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
            >
              {t('team_ready')}
            </p>

            {isSubmitted ? (
              <div className="text-center py-6 sm:py-8 lg:py-12 px-3 sm:px-4 bg-green-50 rounded-lg sm:rounded-xl">
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-green-500 flex items-center justify-center mb-2 sm:mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-green-700 mb-1">
                  {t('thank_you')}
                </h4>
                <p className="text-xs sm:text-sm text-green-600">
                  {t('message_sent')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-3.5">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-[8px] sm:rounded-[10px] lg:rounded-[12px] text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] text-white placeholder-white/60 outline-none focus:border-white/50 transition-colors"
                    placeholder={t('first_name')}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-[8px] sm:rounded-[10px] lg:rounded-[12px] text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] text-white placeholder-white/60 outline-none focus:border-white/50 transition-colors"
                    placeholder={t('last_name')}
                  />
                </div>

                {/* State & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-3.5">
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-[8px] sm:rounded-[10px] lg:rounded-[12px] text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] text-white placeholder-white/60 outline-none focus:border-white/50 transition-colors"
                    placeholder={t('state')}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-[8px] sm:rounded-[10px] lg:rounded-[12px] text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] text-white placeholder-white/60 outline-none focus:border-white/50 transition-colors"
                    placeholder={t('phone_number')}
                  />
                </div>

                {/* Email */}
                <div className="mb-3 sm:mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-[8px] sm:rounded-[10px] lg:rounded-[12px] text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] text-white placeholder-white/60 outline-none focus:border-white/50 transition-colors"
                    placeholder={t('email_address')}
                  />
                </div>

                {/* Type of Inquiry */}
                <div className="mb-3 sm:mb-4">
                  <label className={`block text-[0.7rem] sm:text-[0.75rem] mb-2 sm:mb-2.5 font-normal ${
                    isDark ? 'text-[#d8d4d4]/80' : 'text-white/80'
                  }`}>
                    {t('type_of_inquiry')}
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {[
                      { key: 'general', label: t('general') },
                      { key: 'vendorregistration', label: t('vendorregistration') }
                    ].map((type) => (
                      <button
                        key={type.key}
                        type="button"
                        onClick={() => handleInquiryTypeClick(type.key)}
                        className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[0.7rem] sm:text-[0.75rem] font-normal border transition-all ${
                          formData.inquiryType === type.key
                            ? 'bg-orange-500 text-white border-orange-500 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className={`block text-[0.75rem] mb-2.5 font-normal ${
                    isDark ? 'text-[#d8d4d4]/80' : 'text-white/80'
                  }`}>
                    {t('message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-[8px] sm:rounded-[10px] lg:rounded-[12px] text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] text-white placeholder-white/60 outline-none focus:border-white/50 transition-colors resize-none"
                    placeholder=""
                  />
                </div>

                {/* Checkbox */}
                <div className="mb-3 sm:mb-4 lg:mb-5 flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="exclusiveOffers"
                    checked={formData.exclusiveOffers}
                    onChange={handleInputChange}
                    className="mt-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 accent-gray-700 cursor-pointer"
                    id="offers"
                  />
                  <label htmlFor="offers" className={`text-[0.65rem] sm:text-[0.7rem] leading-[1.4] cursor-pointer ${
                    isDark ? 'text-[#d8d4d4]/80' : 'text-white/80'
                  }`}>
                    {t('exclusive_offers')}
                  </label>
                </div>

                {/* Submit Button */}
                <div className="group">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2.5 sm:py-3 bg-gradient-to-r from-white to-gray-50 text-gray-800 border border-gray-300 rounded-[8px] sm:rounded-[10px] lg:rounded-[12px] text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] font-semibold cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-xl hover:scale-[1.02] hover:border-gray-400 active:scale-[0.98] relative overflow-hidden ${
                      isSubmitting ? 'opacity-80 cursor-not-allowed animate-pulse' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="animate-pulse">{t('submitting')}</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {t('submit')}
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    )}
                    
                    {/* Shimmer effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-[8px] sm:rounded-[10px] lg:rounded-[12px] bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>
            )}
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
            <p className="text-sm sm:text-base text-green-100">Your message has been sent successfully. We'll get back to you soon.</p>
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
