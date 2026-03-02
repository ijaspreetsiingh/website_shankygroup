import { useState } from "react";

const BusinessesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const businesses = [
    {
      id: 1,
      title: "Metals",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Cement",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Textiles",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea3c6c42?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Cellulosic Fibre",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Fashion",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Financial Services",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop"
    },
        {
      id: 7,
      title: "Cellulosic Fibre",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop"
    },
    {
      id: 8,
      title: "Fashion",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=600&fit=crop"
    },
        {
      id: 9,
      title: "Textiles",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea3c6c42?w=800&h=600&fit=crop"
    }
  ];

  return (
    <section style={{
      padding: '0',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header Section with Description */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '60px 40px 40px 40px',
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '60px',
        alignItems: 'start'
      }}>
        {/* Left Side - Title */}
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '400',
            color: '#c41e3a',
            margin: '0 0 5px 0',
            letterSpacing: '1px',
            lineHeight: '1.2'
          }}>
            Businesses
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#666666',
            margin: '0',
            fontWeight: '400',
            letterSpacing: '0.3px'
          }}>
            Our diverse portfolio
          </p>
        </div>

        {/* Right Side - Description and Link */}
        <div>
          <p style={{
            fontSize: '13px',
            color: '#666666',
            lineHeight: '1.8',
            margin: '0 0 15px 0',
            fontWeight: '400',
            letterSpacing: '0.2px'
          }}>
            With over seven decades of responsible business practices, our businesses have grown into global powerhouses in a wide range of sectors – from metals, to cement, fashion to financial services and textiles to trading.
          </p>
          
          <a 
            href="#"
            style={{
              fontSize: '13px',
              color: '#c41e3a',
              textDecoration: 'none',
              fontWeight: '500',
              letterSpacing: '0.3px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.gap = '10px';
              e.currentTarget.style.color = '#a01830';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.gap = '6px';
              e.currentTarget.style.color = '#c41e3a';
            }}
          >
            View All Businesses
            <span style={{
              fontSize: '14px',
              display: 'inline-block',
              transition: 'transform 0.3s ease'
            }}>
              ▶
            </span>
          </a>
        </div>
      </div>

      {/* Business Cards Grid - 3 Columns, 2 Rows */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0',
        width: '100%',
        maxWidth: '1500px',
        margin: '0 auto',
        marginTop: '0'
      }}>
        {businesses.map((business, index) => (
          <div
            key={business.id}
            style={{
              position: 'relative',
              height: '350px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              transform: hoveredIndex === index ? 'scale(1.01)' : 'scale(1)'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background Image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${business.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.3s ease',
              transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
            }} />
            
            {/* Dark Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)'
            }} />

            {/* Text Content - Bottom Center */}
            <div style={{
              position: 'absolute',
              bottom: '40px',
              left: '40px',
              right: '40px',
              color: '#ffffff',
              zIndex: 2,
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '400',
                margin: '0 0 15px 0',
                lineHeight: '1.3',
                letterSpacing: '0.5px'
              }}>
                {business.title}
              </h3>
              
              <a 
                href="#"
                style={{
                  fontSize: '14px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: '400',
                  letterSpacing: '0.3px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'gap 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = '12px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = '8px';
                }}
              >
                Click to Read More
                <span style={{
                  fontSize: '16px',
                  display: 'inline-block'
                }}>
                  ▶
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          section > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            padding: 50px 30px 30px 30px !important;
          }
          section > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          section > div:first-child {
            padding: 40px 20px 25px 20px !important;
          }
          section > div:last-child {
            grid-template-columns: 1fr !important;
          }
          section > div:last-child > div {
            height: 320px !important;
          }
          section > div:last-child > div > div:last-child {
            bottom: 30px !important;
            left: 30px !important;
            right: 30px !important;
          }
        }

        @media (max-width: 480px) {
          section > div:last-child > div {
            height: 280px !important;
          }
          section > div:last-child > div > div:last-child h3 {
            font-size: 20px !important;
          }
          section > div:last-child > div > div:last-child a {
            font-size: 13px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BusinessesSection;
