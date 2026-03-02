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
        {/* Hero Section - Inspired by Leadership Page */}
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
                <span style={{ color: 'var(--accent)' }}>Careers</span>
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
                BUILD YOUR FUTURE
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
                Join a team of over 500 talented professionals across India. We believe in nurturing talent, fostering innovation, and creating opportunities for growth.
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
                  Explore Opportunities
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
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section - Company Culture */}
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1920&h=1080&fit=crop)',
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
                  Our Culture
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
                Innovation & Growth
              </h2>
              
              <p style={{
                fontSize: 'clamp(20px, 2vw, 24px)',
                color: '#cccccc',
                margin: '0 0 32px 0',
                lineHeight: '1.4',
                fontWeight: '500'
              }}>
                Where Talent Meets Opportunity
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
                  At Shanky Group, we foster a culture of innovation, collaboration, and continuous learning. Our team members are our greatest asset, and we invest in their growth and development.
                </p>
                <p style={{
                  margin: '0 0 20px 0'
                }}>
                  We believe in creating an environment where creativity thrives, ideas are valued, and every individual has the opportunity to make a meaningful impact.
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
                Join Our Team
              </button>
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 pb-12 pt-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-8">
              <div className="text-[clamp(1.5rem,2.8vw,2rem)] font-bold text-[var(--text-primary)] mb-4 text-center">About Shanky Group</div>
            </div>
            
            {/* Left Content - Right Image Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-center mb-20">
              {/* Left Side - Company Overview */}
              <div className="transition-all duration-800 ease-out delay-400">
                <h2 className="text-[32px] font-[600] text-[var(--text-primary)] mb-5 font-['Montserrat','Arial','sans-serif']">
                  Join Our Legacy
                </h2>
                
                <div className="flex flex-col gap-5">
                  <p className="text-[18px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                    Shanky Group is a diversified conglomerate with interests in Financial Services, Technology, Agriculture, Electronics, and Corporate Training. Since our inception in 2010, we have grown into a trusted name serving thousands of clients across India.
                  </p>
                  
                  <p className="text-[18px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                    We believe in nurturing talent and providing growth opportunities for our team members. Join us to be part of a dynamic organization where your skills are valued, and your career aspirations are supported.
                  </p>
                </div>
                
                {/* Company Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                    <div className="text-[36px] font-[800] text-[#e63a27] mb-2 font-['Montserrat','Arial','sans-serif'] leading-none">
                      2010
                    </div>
                    <div className="text-[14px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                      Founded
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                    <div className="text-[36px] font-[800] text-[#0ea5e9] mb-2 font-['Montserrat','Arial','sans-serif'] leading-none">
                      500+
                    </div>
                    <div className="text-[14px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                      Employees
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                    <div className="text-[36px] font-[800] text-[#10b981] mb-2 font-['Montserrat','Arial','sans-serif'] leading-none">
                      6
                    </div>
                    <div className="text-[14px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                      Cities
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                    <div className="text-[36px] font-[800] text-[#8b5cf6] mb-2 font-['Montserrat','Arial','sans-serif'] leading-none">
                      6+
                    </div>
                    <div className="text-[14px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                      Business Verticals
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Image Gallery */}
              <div className="transition-all duration-800 ease-out delay-600">
                {/* Large Background Image Container */}
                <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center brightness-90 transition-all duration-1000 ease-in-out"
                    style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/30" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-10 text-white z-[2] max-w-[80%]">
                    {/* Image Number Indicator */}
                    <div className="text-[14px] font-[600] tracking-[2px] uppercase mb-4 opacity-90">
                      {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </div>
                    
                    {/* Image Title */}
                    <h3 className="text-[28px] font-[700] mb-4 font-['Montserrat','Arial','sans-serif'] leading-[1.2] drop-shadow-md">
                      {slides[currentSlide].title}
                    </h3>
                    
                    {/* Image Description */}
                    <p className="text-[16px] leading-[1.6] opacity-90 mb-6 font-['Lato','Arial','sans-serif']">
                      {slides[currentSlide].description}
                    </p>
                    
                    {/* Navigation Dots */}
                    <div className="flex gap-2 items-center">
                      {slides.map((_, index) => (
                        <div 
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-[10px] h-[10px] rounded-full bg-white cursor-pointer transition-all duration-300 ${
                            index === currentSlide ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Right Side Controls */}
                  <div className="absolute right-10 bottom-10 flex gap-4 z-[2]">
                    {/* Previous Button */}
                    <div 
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                      className="w-[44px] h-[44px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/30 hover:bg-white/30"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </div>
                    
                    {/* Next Button */}
                    <div 
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                      className="w-[44px] h-[44px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/30 hover:bg-white/30"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Image Thumbnails */}
                  <div className="absolute top-10 right-10 flex gap-3 z-[2]">
                    {slides.map((slide, index) => (
                      <div 
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-[60px] h-[40px] rounded overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                          index === currentSlide ? 'opacity-100 border-white' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={slide.thumbnail} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Image Description Footer */}
                <div className="flex justify-between items-center mt-5 px-[10px]">
                  <div className="text-[14px] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Join our team of talented professionals
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="text-[12px] text-[var(--text-secondary)] font-[500]">
                      EXPLORE MORE
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Roles – from dashboard (admin-added jobs) */}
        <section className="px-6 sm:px-8 lg:px-12 py-14 lg:py-18 bg-[var(--background)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">Careers</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                Open <span className="text-[#e63a27]">Roles</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#e63a27] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="group bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--card-border)] hover:border-[#e63a27]/30 hover:shadow-xl hover:shadow-[#e63a27]/5 transition-all duration-300 flex flex-col"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[var(--text-primary)] font-bold text-base sm:text-lg mb-2 group-hover:text-[#e63a27] transition-colors">
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
                    <div className="pt-2 border-t border-[var(--card-border)] mt-auto">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, position: job.title }))}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#e63a27] text-white text-sm font-semibold hover:bg-[#c93222] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
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

        {/* Benefits - Professional cards */}
        <section className="px-6 sm:px-8 lg:px-12 py-14 lg:py-18 bg-[var(--card-bg)] border-t border-[var(--card-border)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">Why Join Us</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                Benefits
              </h2>
              <div className="w-16 h-0.5 bg-[#e63a27] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto">
                What you get when you grow with us.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="group relative bg-[var(--background)] rounded-2xl p-6 border border-[var(--card-border)] hover:border-[#e63a27]/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
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
                    <h3 className="text-[var(--text-primary)] font-bold text-base mb-2">{b.t}</h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Apply Now */}
        <section className="px-6 sm:px-8 lg:px-12 py-14 lg:py-18 pb-16 bg-[var(--background)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <p className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">Get Started</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                Apply <span className="text-[#e63a27]">Now</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#e63a27] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto">
                Join our team and grow your career with Shanky Group.
              </p>
            </div>
            
            <div className="bg-[var(--card-bg)] rounded-2xl p-8 border border-[var(--card-border)]">
              {submitStatus && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  {submitStatus}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2">Position Applied *</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors"
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
                  <label className="block text-[var(--text-primary)] font-medium mb-2">Years of Experience *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors"
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
                  <label className="block text-[var(--text-primary)] font-medium mb-2">Resume/CV *</label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    required
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e63a27] file:text-white hover:file:bg-[#d12f1f]"
                  />
                  <div className="text-[var(--text-secondary)] text-sm mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</div>
                </div>

                <div>
                  <label className="block text-[var(--text-primary)] font-medium mb-2">Cover Letter / Additional Information</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[#e63a27] transition-colors resize-none"
                    placeholder="Tell us why you're interested in joining Shanky Group..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-[var(--text-secondary)] text-sm">
                    By submitting this form, you agree to our privacy policy and terms of use.
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-lg bg-[#e63a27] text-white font-semibold hover:bg-[#d12f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="rounded-2xl p-8 bg-[var(--card-bg)] border border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between">
              <div>
                <div className="text-[var(--text-primary)] font-semibold text-[clamp(1rem,2.4vw,1.25rem)]">Didn't find the role you're looking for?</div>
                <div className="text-[var(--text-secondary)] text-[clamp(0.9rem,1.6vw,1rem)]">Send your profile and we'll reach out</div>
              </div>
              <a href="/contact" className="px-5 py-3 rounded-lg bg-[#0ea5e9] text-white font-semibold hover:bg-[#0284c7]">
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
