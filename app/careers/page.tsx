'use client';
import { useEffect, useState } from 'react';
import HeaderFour from '../home/home4/HeaderFour';
import FooterFour from '../home/home4/FooterFour';

export interface Job {
  id: number;
  title: string;
  description?: string;
  location?: string;
  job_type?: string;
  department?: string;
  requirements?: string;
  status?: string;
  created_at?: string;
}

const CareersPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Auto-slide data
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=800&fit=crop',
      title: 'Career Growth',
      description: 'Build your career with a team that values innovation, collaboration, and continuous learning.',
      thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=120&h=80&fit=crop'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
      title: 'Innovation Hub',
      description: 'Join a workplace where creativity meets technology and ideas transform into reality.',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=120&h=80&fit=crop'
    },
    {
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop',
      title: 'Team Excellence',
      description: 'Work alongside industry experts and grow your skills in a collaborative environment.',
      thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=120&h=80&fit=crop'
    }
  ];

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', h);
      clearInterval(slideInterval);
    };
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobsLoading(true);
        const res = await fetch('/api/jobs');
        const data = await res.json();
        if (data?.jobs && Array.isArray(data.jobs)) setJobs(data.jobs);
      } catch (e) {
        console.error('Failed to fetch jobs:', e);
      } finally {
        setJobsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const benefits = [
    { t: 'Health & Wellness', d: 'Comprehensive insurance and wellness allowance', c: '#10b981' },
    { t: 'Learning Budget', d: 'Annual upskilling credits for courses', c: '#0ea5e9' },
    { t: 'Flexible Work', d: 'Hybrid options based on team needs', c: '#f59e0b' },
    { t: 'Growth Path', d: 'Clear role progressions and mentorship', c: '#ef4444' },
  ];

  const companyInfo = {
    founded: '2010',
    employees: '500+',
    offices: '6 Cities',
    industries: 'Financial Services, Technology, Agriculture, Electronics'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    try {
      const body = new FormData();
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('phone', formData.phone);
      body.append('position', formData.position);
      body.append('experience', formData.experience);
      body.append('message', formData.message);
      if (formData.resume) body.append('resume', formData.resume, formData.resume.name);
      const res = await fetch('/api/career-applications', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSubmitStatus('Thank you for your application! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          message: '',
          resume: null
        });
      } else {
        setSubmitStatus(data?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <HeaderFour isScrolled={isScrolled} />
      <main className="flex-grow">
        {/* Hero Section - Mobile-first responsive */}
        <section className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[var(--background)]">
          <div className="relative z-[2] w-full max-w-[1900px] px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 text-[var(--foreground)]">
            <div className="max-w-[800px]">
              <div className="mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base text-[var(--text-secondary)] font-[family-name:var(--font-inter)]">
                <span className="cursor-pointer">Home</span>
                <span className="mx-2">/</span>
                <span className="text-[var(--accent)]">Careers</span>
              </div>
              <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl lg:text-[72px] font-bold leading-tight tracking-tight mt-0 mb-4 sm:mb-5 text-[var(--text-primary)]">
                BUILD YOUR FUTURE
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal w-full max-w-full leading-relaxed mb-6 sm:mb-8 md:mb-10 font-[family-name:var(--font-lato)] opacity-90 text-[var(--text-secondary)]">
                Join a team of over 500 talented professionals across India. We believe in nurturing talent, fostering innovation, and creating opportunities for growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="w-full sm:w-auto bg-[#e63a27] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-[30px] border-0 cursor-pointer transition-all duration-300 uppercase tracking-wider shadow-[0_4px_20px_rgba(230,58,39,0.3)] min-h-[48px] touch-manipulation"
                >
                  Explore Opportunities
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('apply-now')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="w-full sm:w-auto bg-transparent text-[var(--text-primary)] text-sm sm:text-base font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-[30px] border-2 border-[var(--card-border)] cursor-pointer transition-all duration-300 uppercase tracking-wider min-h-[48px] touch-manipulation"
                >
                  Upload Resume
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section - Company Culture - Mobile perfect */}
        <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] lg:h-[100vh] bg-black flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 blur-[8px] z-0"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1920&h=1080&fit=crop)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 z-[1]" />
          <div className="relative z-[2] w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex justify-center lg:justify-end items-center">
            <div className="w-full max-w-[600px] lg:mr-0 bg-[rgba(30,30,30,0.85)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-[10px] text-center">
              <div className="mb-4 sm:mb-5">
                <span className="inline-block bg-[#e63a27] text-white text-xs sm:text-sm font-semibold py-2 sm:py-2.5 px-4 sm:px-5 rounded-[25px] uppercase tracking-wider">
                  Our Culture
                </span>
              </div>
              <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-bold text-white m-0 mb-4 sm:mb-6 leading-tight">
                Innovation & Growth
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-[#cccccc] m-0 mb-6 sm:mb-8 font-medium leading-snug">
                Where Talent Meets Opportunity
              </p>
              <div className="text-sm sm:text-base md:text-lg text-[#cccccc] leading-relaxed mb-6 sm:mb-8 md:mb-10 text-left space-y-4">
                <p className="m-0">
                  At Shanky Group, we foster a culture of innovation, collaboration, and continuous learning. Our team members are our greatest asset, and we invest in their growth and development.
                </p>
                <p className="m-0">
                  We believe in creating an environment where creativity thrives, ideas are valued, and every individual has the opportunity to make a meaningful impact.
                </p>
              </div>
              <button className="w-full sm:w-auto bg-[#e63a27] text-white text-sm sm:text-base font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-[30px] border-0 cursor-pointer transition-all duration-300 uppercase tracking-wider shadow-[0_4px_20px_rgba(230,58,39,0.3)] min-h-[48px] touch-manipulation">
                Join Our Team
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-12 pb-12 pt-10 sm:pt-14 lg:pt-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-6 sm:mb-8">
              <div className="section-heading text-xl sm:text-2xl lg:text-[clamp(1.5rem,2.8vw,2rem)] font-bold text-[var(--text-primary)] mb-4 text-center">About Shanky Group</div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 sm:gap-10 lg:gap-10 items-center mb-14 sm:mb-20">
              <div className="transition-all duration-800 ease-out delay-400 order-2 lg:order-1">
                <h2 className="section-heading text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4 sm:mb-5">
                  Join Our Legacy
                </h2>
                
                <div className="flex flex-col gap-4 sm:gap-5">
                  <p className="text-base sm:text-[18px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                    Shanky Group is a diversified conglomerate with interests in Financial Services, Technology, Agriculture, Electronics, and Corporate Training. Since our inception in 2010, we have grown into a trusted name serving thousands of clients across India.
                  </p>
                  <p className="text-base sm:text-[18px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                    We believe in nurturing talent and providing growth opportunities for our team members. Join us to be part of a dynamic organization where your skills are valued, and your career aspirations are supported.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <div className="text-center p-4 sm:p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                    <div className="text-2xl sm:text-[36px] font-[800] text-[#e63a27] mb-1 sm:mb-2 font-['Montserrat','Arial','sans-serif'] leading-none">2010</div>
                    <div className="text-xs sm:text-[14px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">Founded</div>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                    <div className="text-2xl sm:text-[36px] font-[800] text-[#0ea5e9] mb-1 sm:mb-2 font-['Montserrat','Arial','sans-serif'] leading-none">500+</div>
                    <div className="text-xs sm:text-[14px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">Employees</div>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                    <div className="text-2xl sm:text-[36px] font-[800] text-[#10b981] mb-1 sm:mb-2 font-['Montserrat','Arial','sans-serif'] leading-none">6</div>
                    <div className="text-xs sm:text-[14px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">Cities</div>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                    <div className="text-2xl sm:text-[36px] font-[800] text-[#8b5cf6] mb-1 sm:mb-2 font-['Montserrat','Arial','sans-serif'] leading-none">6+</div>
                    <div className="text-xs sm:text-[14px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">Business Verticals</div>
                  </div>
                </div>
              </div>

              <div className="transition-all duration-800 ease-out delay-600 order-1 lg:order-2">
                <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center brightness-90 transition-all duration-1000 ease-in-out"
                    style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/30" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 text-white z-[2] max-w-full">
                    <div className="text-xs sm:text-[14px] font-[600] tracking-[2px] uppercase mb-2 sm:mb-4 opacity-90">
                      {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </div>
                    <h3 className="section-heading text-lg sm:text-xl md:text-[28px] font-bold mb-2 sm:mb-4 leading-[1.2] drop-shadow-md">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-sm sm:text-[16px] leading-[1.6] opacity-90 mb-4 sm:mb-6 font-['Lato','Arial','sans-serif'] line-clamp-2 sm:line-clamp-none">
                      {slides[currentSlide].description}
                    </p>
                    <div className="flex gap-2 sm:gap-2 items-center">
                      {slides.map((_, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          aria-label={`Slide ${index + 1}`}
                          className={`min-w-[12px] min-h-[12px] w-3 h-3 sm:w-[10px] sm:h-[10px] rounded-full bg-white cursor-pointer transition-all duration-300 touch-manipulation ${
                            index === currentSlide ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute right-3 bottom-3 sm:right-6 sm:bottom-6 md:right-10 md:bottom-10 flex gap-2 sm:gap-4 z-[2]">
                    <button
                      type="button"
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                      aria-label="Previous slide"
                      className="w-10 h-10 sm:w-[44px] sm:h-[44px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/30 hover:bg-white/30 touch-manipulation active:scale-95"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                      aria-label="Next slide"
                      className="w-10 h-10 sm:w-[44px] sm:h-[44px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/30 hover:bg-white/30 touch-manipulation active:scale-95"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-10 md:right-10 flex gap-2 sm:gap-3 z-[2]">
                    {slides.map((slide, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`View slide ${index + 1}`}
                        className={`w-10 h-7 sm:w-[60px] sm:h-[40px] rounded overflow-hidden cursor-pointer transition-all duration-300 border-2 touch-manipulation flex-shrink-0 ${
                          index === currentSlide ? 'opacity-100 border-white' : 'opacity-60 hover:opacity-100 border-transparent'
                        }`}
                      >
                        <img src={slide.thumbnail} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-4 sm:mt-5 px-1 sm:px-[10px]">
                  <div className="text-xs sm:text-[14px] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Join our team of talented professionals
                  </div>
                  <div className="flex gap-1 items-center text-[var(--text-secondary)]">
                    <span className="text-[10px] sm:text-[12px] font-[500]">EXPLORE MORE</span>
                    <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section id="open-roles" className="px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14 lg:py-18 bg-[var(--background)] scroll-mt-20">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">Careers</p>
              <h2 className="section-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                Open <span className="text-[#e63a27]">Roles</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#e63a27] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto px-2">
                Apply to positions that match your skills and grow with us.
              </p>
            </div>
            {jobsLoading ? (
              <div className="flex justify-center py-12">
                <div className="h-10 w-10 rounded-full border-2 border-[var(--card-border)] border-t-[#e63a27] animate-spin" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-[var(--card-border)] bg-[var(--card-bg)]/50">
                <p className="text-[var(--text-secondary)]">No open positions at the moment. Check back later or send us your resume.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="group bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--card-border)] hover:border-[#e63a27]/30 hover:shadow-xl hover:shadow-[#e63a27]/5 transition-all duration-300 flex flex-col"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="section-heading text-[var(--text-primary)] font-bold text-base sm:text-lg mb-2 group-hover:text-[#e63a27] transition-colors">
                        {job.title}
                      </h3>
                      {(job.location || job.job_type || job.department) && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.location && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--background)] text-[var(--text-secondary)] text-xs font-medium">
                              <svg className="w-3.5 h-3.5 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              {job.location}
                            </span>
                          )}
                          {job.job_type && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--card-border)] text-[var(--text-secondary)]">
                              {job.job_type}
                            </span>
                          )}
                          {job.department && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#e63a27]/10 text-[#e63a27]">
                              {job.department}
                            </span>
                          )}
                        </div>
                      )}
                      {job.description && (
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3 whitespace-pre-line">
                          {job.description}
                        </p>
                      )}
                      {job.requirements && (
                        <div className="mb-4">
                          <span className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wide">Requirements</span>
                          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-1 whitespace-pre-line">
                            {job.requirements}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="pt-3 sm:pt-2 border-t border-[var(--card-border)] mt-auto">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, position: job.title }))}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-[#e63a27] text-white text-sm font-semibold hover:bg-[#c93222] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] min-h-[44px] touch-manipulation"
                      >
                        Apply
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Benefits */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14 lg:py-18 bg-[var(--card-bg)] border-t border-[var(--card-border)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">Why Join Us</p>
              <h2 className="section-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                Benefits
              </h2>
              <div className="w-16 h-0.5 bg-[#e63a27] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto px-2">
                What you get when you grow with us.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="group relative bg-[var(--background)] rounded-2xl p-5 sm:p-6 border border-[var(--card-border)] hover:border-[#e63a27]/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 transition-opacity group-hover:opacity-20" style={{ backgroundColor: b.c }} />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm" style={{ backgroundColor: `${b.c}18` }}>
                      <svg className="w-6 h-6" style={{ color: b.c }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                        {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                        {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                        {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
                      </svg>
                    </div>
                    <h3 className="section-heading text-[var(--text-primary)] font-bold text-base mb-2">{b.t}</h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Apply Now */}
        <section id="apply-now" className="px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14 lg:py-18 pb-12 sm:pb-16 bg-[var(--background)] scroll-mt-20">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">Get Started</p>
              <h2 className="section-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                Apply <span className="text-[#e63a27]">Now</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#e63a27] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto px-2">
                Join our team and grow your career with Shanky Group.
              </p>
            </div>
            
            <div className="bg-[var(--card-bg)] rounded-2xl p-5 sm:p-6 md:p-8 border border-[var(--card-border)]">
              {submitStatus && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm sm:text-base">
                  {submitStatus}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2 text-sm sm:text-base">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl sm:rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors touch-manipulation"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2 text-sm sm:text-base">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl sm:rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors touch-manipulation"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2 text-sm sm:text-base">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl sm:rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors touch-manipulation"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2 text-sm sm:text-base">Position Applied *</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl sm:rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors touch-manipulation"
                    >
                      <option value="">Select a position</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[var(--text-primary)] font-medium mb-2 text-sm sm:text-base">Years of Experience *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 min-h-[44px] rounded-xl sm:rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors touch-manipulation"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--text-primary)] font-medium mb-2 text-sm sm:text-base">Resume/CV *</label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    required
                    accept=".pdf,.doc,.docx"
                    className="w-full px-3 sm:px-4 py-3 min-h-[44px] rounded-xl sm:rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#e63a27] transition-colors file:mr-2 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-[#e63a27] file:text-white hover:file:bg-[#d12f1f] file:cursor-pointer touch-manipulation"
                  />
                  <div className="text-[var(--text-secondary)] text-xs sm:text-sm mt-1">Accepted: PDF, DOC, DOCX (Max 5MB)</div>
                </div>

                <div>
                  <label className="block text-[var(--text-primary)] font-medium mb-2 text-sm sm:text-base">Cover Letter / Additional Information</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 min-h-[100px] rounded-xl sm:rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors resize-none touch-manipulation"
                    placeholder="Tell us why you're interested in joining Shanky Group..."
                  />
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 min-h-[48px] rounded-xl sm:rounded-lg bg-[#e63a27] text-white font-semibold hover:bg-[#d12f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <div className="text-[var(--text-secondary)] text-xs sm:text-sm text-center sm:text-left">
                    By submitting, you agree to our privacy policy and terms.
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="rounded-2xl p-6 sm:p-8 bg-[var(--card-bg)] border border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <div className="text-[var(--text-primary)] font-semibold text-base sm:text-lg">Didn't find the role you're looking for?</div>
                <div className="text-[var(--text-secondary)] text-sm sm:text-base mt-1">Send your profile and we'll reach out</div>
              </div>
              <a href="/contact" className="w-full sm:w-auto inline-block text-center px-5 py-3 min-h-[48px] rounded-xl sm:rounded-lg bg-[#0ea5e9] text-white font-semibold hover:bg-[#0284c7] transition-colors touch-manipulation flex items-center justify-center">
                Share Profile
              </a>
            </div>
          </div>
        </section>
      </main>
      <FooterFour />
    </div>
  );
};

export default CareersPage;
