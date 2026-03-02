import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: ''
      });
    }, 3000);
  };

  return (
    <section style={{
      padding: '100px 40px',
      backgroundColor: '#f8fafc',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#1e293b',
            margin: '0 0 20px 0',
            letterSpacing: '-0.5px',
            lineHeight: '1.2'
          }}>
            Let's Start a Conversation
          </h2>
          <div style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #10b981)',
            margin: '0 auto 30px auto',
            borderRadius: '2px'
          }} />
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            margin: '0',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Ready to transform your business? We're here to help you achieve your goals
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start'
        }}>
          {/* Contact Information */}
          <div>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 40px 0'
            }}>
              Get in Touch
            </h3>

            {/* Contact Cards */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              marginBottom: '40px'
            }}>
              {/* Email Card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '24px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{
                    fontSize: '24px',
                    color: '#3b82f6'
                  }}>✉️</span>
                </div>
                <div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    Email Us
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: '#64748b',
                    margin: '0'
                  }}>
                    contact@company.com
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '24px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#dcfce7',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{
                    fontSize: '24px',
                    color: '#10b981'
                  }}>📞</span>
                </div>
                <div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    Call Us
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: '#64748b',
                    margin: '0'
                  }}>
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              {/* Location Card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '24px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{
                    fontSize: '24px',
                    color: '#f59e0b'
                  }}>📍</span>
                </div>
                <div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    Visit Us
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: '#64748b',
                    margin: '0'
                  }}>
                    123 Business Ave, Suite 100<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div style={{
              padding: '32px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                margin: '0 0 20px 0'
              }}>
                Follow Us
              </h4>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                {[
                  { name: 'LinkedIn', color: '#0077b5', icon: 'in' },
                  { name: 'Twitter', color: '#1da1f2', icon: '𝕏' },
                  { name: 'Facebook', color: '#1877f2', icon: 'f' },
                  { name: 'Instagram', color: '#e4405f', icon: '📷' }
                ].map((social, index) => (
                  <div
                    key={index}
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: social.color,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '20px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    {social.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '32px',
                fontWeight: '600',
                color: '#1e293b',
                margin: '0 0 32px 0'
              }}>
                Send us a Message
              </h3>

              {isSubmitted ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '16px',
                  border: '2px solid #10b981'
                }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '16px'
                  }}>
                    ✅
                  </div>
                  <h4 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#10b981',
                    margin: '0 0 8px 0'
                  }}>
                    Message Sent Successfully!
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: '#64748b',
                    margin: '0'
                  }}>
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    marginBottom: '24px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '16px',
                          transition: 'border-color 0.3s ease',
                          outline: 'none'
                        }}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '16px',
                          transition: 'border-color 0.3s ease',
                          outline: 'none'
                        }}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    marginBottom: '24px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '16px',
                          transition: 'border-color 0.3s ease',
                          outline: 'none'
                        }}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '16px',
                          transition: 'border-color 0.3s ease',
                          outline: 'none'
                        }}
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>

                  <div style={{
                    marginBottom: '24px'
                  }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '16px',
                        transition: 'border-color 0.3s ease',
                        outline: 'none',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <option value="">Select a service</option>
                      <option value="consulting">Business Consulting</option>
                      <option value="development">Software Development</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="design">UI/UX Design</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div style={{
                    marginBottom: '32px'
                  }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '16px',
                        transition: 'border-color 0.3s ease',
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '18px 32px',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 60px 20px !important;
          }
          
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          section > div > div:last-child > div:first-child > div > div {
            padding: 20px !important;
          }
          
          section > div > div:last-child > div:last-child > div {
            padding: 32px 24px !important;
          }
          
          section > div > div:last-child > div:last-child > div > form > div {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactUs;
