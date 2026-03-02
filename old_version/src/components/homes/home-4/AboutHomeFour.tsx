"use client";
import React, { useState, useEffect } from "react";
import Vipin from "./vipin_sir2.png";

const AboutHomeFour = () => {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Base styles
  const baseStyles = {
    aboutSection: {
      backgroundColor: "#f8f9fa",
      padding: "0",
      position: "relative",
      overflow: "hidden",
      width: "100%",
      margin: "0",
      marginTop: "-1px",
    },
    container: {
      maxWidth: "100%",
      margin: "0",
      padding: "0",
    },
    row: {
      display: "flex",
      flexWrap: windowWidth <= 992 ? "wrap" : "nowrap",
      margin: "0",
      height: windowWidth <= 992 ? "auto" : windowWidth <= 1440 ? "85vh" : "90vh",
    },
    alignItemsCenter: {
      alignItems: "center",
    },
    // 40% for image, 60% for content
    imageColumn: {
      flex: windowWidth <= 992 ? "0 0 100%" : "0 0 42%",
      maxWidth: windowWidth <= 992 ? "100%" : "42%",
      padding: "0",
      height: windowWidth <= 992 ? "45vh" : windowWidth <= 1440 ? "75vh" : "80vh",
      position: "relative",
      order: windowWidth <= 992 ? 2 : 1,
      marginTop: "0", // Remove top margin
      marginLeft: "0", // Ensure no left margin
      paddingTop: "0", // Remove any top padding
    },
    contentColumn: {
      flex: windowWidth <= 992 ? "0 0 100%" : "0 0 50%",
      maxWidth: windowWidth <= 992 ? "100%" : "50%",
      padding: windowWidth <= 992 ? "40px 20px" : "0 20px 0 0",
      height: windowWidth <= 992 ? "auto" : windowWidth <= 1440 ? "85vh" : "90vh",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      order: windowWidth <= 992 ? 1 : 2,
      marginRight: windowWidth <= 992 ? "0" : "10%",
    },
    profileImage: {
      position: "relative",
      borderRadius: "0",
      overflow: "hidden",
      boxShadow: "none",
      transition: "all 0.3s ease",
      height: "100%",
      margin: "0", // No margin
      width: "100%",
    },
    profileImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "top left", // Changed to "top left" to remove all gaps
      display: "block",
      borderRadius: "0",
    },
    imageOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)",
      zIndex: 1,
    },
    quoteContent: {
      position: "relative",
      padding: windowWidth <= 480 ? "25px 20px 25px 25px" :
        windowWidth <= 576 ? "30px 25px 30px 30px" :
          windowWidth <= 768 ? "35px 30px 35px 35px" :
            windowWidth <= 992 ? "45px 40px 45px 45px" :
              windowWidth <= 1440 ? "50px 45px 50px 55px" :
                "55px 50px 55px 60px",
    
      borderRadius: "0",
      
      zIndex: 2,
      margin: windowWidth <= 992 ? "20px" : "0",
      width: windowWidth <= 768 ? "90%" : windowWidth <= 1440 ? "85%" : "80%",
      maxWidth: windowWidth <= 1440 ? "680px" : "750px",
      
      position: "relative",
      overflow: "hidden",
    },
    quoteContentBefore: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, rgba(248, 249, 250, 0.2) 0%, rgba(255, 255, 255, 0.8) 100%)",
      zIndex: -1,
    },
    quoteIcon: {
      position: "absolute",
      top: windowWidth <= 480 ? "12px" : windowWidth <= 768 ? "20px" : windowWidth <= 992 ? "30px" : windowWidth <= 1440 ? "35px" : "40px",
      left: windowWidth <= 480 ? "12px" : windowWidth <= 576 ? "18px" : windowWidth <= 768 ? "22px" : windowWidth <= 992 ? "28px" : windowWidth <= 1440 ? "35px" : "40px",
      fontSize: windowWidth <= 480 ? "45px" : windowWidth <= 576 ? "55px" : windowWidth <= 768 ? "65px" : windowWidth <= 992 ? "75px" : windowWidth <= 1440 ? "85px" : "90px",
      fontFamily: "'Georgia', serif",
      color: "#e5e7eb",
      lineHeight: 1,
      zIndex: 1,
      opacity: 0.7,
      fontWeight: "bold",
    },
    quoteText: {
      position: "relative",
      zIndex: 2,
      marginBottom: windowWidth <= 480 ? "20px" : windowWidth <= 768 ? "25px" : windowWidth <= 992 ? "30px" : windowWidth <= 1440 ? "35px" : "40px",
      paddingTop: windowWidth <= 480 ? "5px" : windowWidth <= 768 ? "10px" : windowWidth <= 992 ? "12px" : "15px",
    },
    quoteParagraph: {
      fontSize: windowWidth <= 480 ? "14px" : windowWidth <= 576 ? "15px" : windowWidth <= 768 ? "16px" : windowWidth <= 992 ? "17px" : windowWidth <= 1440 ? "18px" : "19px",
      lineHeight: windowWidth <= 480 ? "1.6" : windowWidth <= 768 ? "1.5" : "1.45",
      color: "#1f2937",
      margin: 0,
      fontWeight: 400,
      fontStyle: "normal",
      position: "relative",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      textAlign: "justify",
    },
    highlightWord: {
      fontWeight: 700,
      color: "#000000",
      backgroundColor: "transparent",
      padding: "2px 4px",
      position: "relative",
      display: "inline-block",
      fontFamily: "'Inter', sans-serif",
      borderRadius: "2px",
    },
    highlightWordAfter: {
      content: '""',
      position: "absolute",
      bottom: "0",
      left: 0,
      width: "100%",
      height: "3px",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      zIndex: -1,
      borderRadius: "1px",
    },
    boldWord: {
      fontWeight: 700,
      color: "#000000",
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      padding: "2px 4px",
      borderRadius: "3px",
    },
    highlightedText: {
      fontWeight: 600,
      color: "#1e40af",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      padding: "2px 6px",
      borderRadius: "4px",
      fontStyle: "italic",
    },
    quoteAuthor: {
      marginBottom: windowWidth <= 480 ? "15px" : windowWidth <= 768 ? "20px" : "25px",
      position: "relative",
      paddingLeft: windowWidth <= 768 ? "0" : "15px",
    },
    authorName: {
      fontSize: windowWidth <= 480 ? "16px" : windowWidth <= 576 ? "18px" : windowWidth <= 768 ? "20px" : "22px",
      fontWeight: 700,
      color: "#000000",
      margin: "0 0 5px 0",
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontFamily: "'Inter', sans-serif",
    },
    authorTitle: {
      fontSize: windowWidth <= 480 ? "13px" : windowWidth <= 576 ? "14px" : windowWidth <= 768 ? "15px" : "16px",
      color: "#6b7280",
      margin: 0,
      fontWeight: 400,
      letterSpacing: "0.5px",
      fontFamily: "'Inter', sans-serif",
      fontStyle: "italic",
    },
    quoteLine: {
      width: windowWidth <= 480 ? "40px" : "60px",
      height: "3px",
      backgroundColor: "#000000",
      margin: windowWidth <= 480 ? "15px 0" : windowWidth <= 768 ? "20px 0" : "25px 0",
      borderRadius: "2px",
    },
    btnBox: {
      marginTop: windowWidth <= 480 ? "20px" : windowWidth <= 768 ? "25px" : "30px",
    },
    viewProfileBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      padding: windowWidth <= 480 ? "12px 24px" : windowWidth <= 768 ? "14px 28px" : "16px 32px",
      backgroundColor: "#000000",
      color: "#ffffff",
      textDecoration: "none",
      borderRadius: "8px",
      fontWeight: 600,
      fontSize: windowWidth <= 480 ? "14px" : windowWidth <= 768 ? "15px" : "16px",
      transition: "all 0.3s ease",
      border: "2px solid #000000",
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontFamily: "'Inter', sans-serif",
      width: windowWidth <= 480 ? "100%" : "auto",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    },
    btnArrow: {
      fontSize: windowWidth <= 480 ? "18px" : "20px",
      transition: "transform 0.3s ease",
      fontWeight: "bold",
    },
    btnHoverEffect: {
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
      transition: "left 0.6s ease",
    },
  };

  return (
    <>
      <section style={baseStyles.aboutSection}>
        {/* Decorative background elements */}
        <div style={{
          position: "absolute",
          top: "-150px",
          right: "-150px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 0,
          opacity: 0.6,
        }}></div>

        <div style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 0,
          opacity: 0.4,
        }}></div>

        {/* Subtle grid pattern */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          zIndex: 0,
          opacity: 0.3,
        }}></div>

        <div style={baseStyles.container}>
          <div style={baseStyles.row}>
            {/* Image Column - LEFT SIDE 40% */}
            <div style={baseStyles.imageColumn}>
              <div
                style={{
                  ...baseStyles.profileImage,
                  transform: isImageHovered ? "scale(1.02)" : "scale(1)",
                  transition: "transform 0.5s ease",
                }}
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                <img
                  src={Vipin}
                  alt="Vipin Kumar"
                  style={baseStyles.profileImg}
                  onError={(e) => {
                    console.error("Image failed to load");
                    e.target.style.backgroundColor = "#e5e7eb";
                    e.target.style.display = "flex";
                    e.target.style.alignItems = "center";
                    e.target.style.justifyContent = "center";
                    e.target.innerHTML = '<div style="color: #6b7280; font-size: 16px;">Image not available</div>';
                  }}
                />
                <div style={baseStyles.imageOverlay}></div>
                
                {/* Image caption */}
                <div style={{
                  position: "absolute",
                  bottom: windowWidth <= 992 ? "20px" : "40px",
                  left: windowWidth <= 992 ? "20px" : "40px",
                  color: "white",
                  zIndex: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  fontSize: windowWidth <= 768 ? "12px" : "14px",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}>
                  Vipin Kumar
                </div>
              </div>
            </div>

            {/* Content Column - RIGHT SIDE 60% */}
            <div style={baseStyles.contentColumn}>
              <div style={baseStyles.quoteContent}>
                {/* Background gradient */}
                <div style={baseStyles.quoteContentBefore}></div>
                
                {/* Quote icon */}
                <div style={baseStyles.quoteIcon}>"</div>

                {/* Main quote text */}
                <div style={baseStyles.quoteText}>
                  <p style={baseStyles.quoteParagraph}>
                    To make{" "}
                    <span style={baseStyles.highlightWord}>
                      B2B relationships
                      <span style={baseStyles.highlightWordAfter}></span>
                    </span>{" "}
                    simpler, smarter, and more successful. We started this because we believed businesses deserve partners who{" "}
                    <span style={baseStyles.boldWord}>listen</span>,{" "}
                    <span style={baseStyles.boldWord}>deliver</span>, and{" "}
                    <span style={baseStyles.boldWord}>grow</span> alongside them.
                    <br /><br />
                    At our core we value{" "}
                    <span style={baseStyles.highlightedText}>trust, transparency, and measurable impact</span>.
                    Every solution we design begins with{" "}
                    <span style={baseStyles.highlightWord}>
                      your goals
                      <span style={baseStyles.highlightWordAfter}></span>
                    </span>{" "}
                    and ends with{" "}
                    <span style={baseStyles.highlightWord}>
                      clear outcomes
                      <span style={baseStyles.highlightWordAfter}></span>
                    </span>.
                    <br /><br />
                    We invest in{" "}
                    <span style={baseStyles.highlightWord}>
                      technology
                      <span style={baseStyles.highlightWordAfter}></span>
                    </span>,{" "}
                    <span style={baseStyles.highlightWord}>
                      people
                      <span style={baseStyles.highlightWordAfter}></span>
                    </span>, and{" "}
                    <span style={baseStyles.highlightWord}>
                      processes
                      <span style={baseStyles.highlightWordAfter}></span>
                    </span>{" "}
                    so you can focus on what you do best—running your business—while we handle the complexity.
                  </p>
                </div>

                {/* Author section */}
                <div style={baseStyles.quoteAuthor}>
                  <h4 style={baseStyles.authorName}>Vipin kumar</h4>
                  <p style={baseStyles.authorTitle}>Managing Directer, Shanky Group</p>
                </div>

                {/* Divider line */}
                <div style={baseStyles.quoteLine}></div>

                {/* Button */}
                <div style={baseStyles.btnBox}>
                  <a
                    href="#"
                    style={{
                      ...baseStyles.viewProfileBtn,
                      backgroundColor: isButtonHovered ? "#ffffff" : "#000000",
                      color: isButtonHovered ? "#000000" : "#ffffff",
                      transform: isButtonHovered ? "translateY(-3px)" : "translateY(0)",
                      boxShadow: isButtonHovered ? "0 15px 30px rgba(0, 0, 0, 0.15)" : "0 5px 15px rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                  >
                    {isButtonHovered && <div style={{...baseStyles.btnHoverEffect, left: "100%"}}></div>}
                    View Profile
                    <span
                      style={{
                        ...baseStyles.btnArrow,
                        transform: isArrowHovered ? "translateX(8px)" : "translateX(0)",
                      }}
                      onMouseEnter={() => setIsArrowHovered(true)}
                      onMouseLeave={() => setIsArrowHovered(false)}
                    >
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHomeFour;