'use client';
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

export function GlobeDemo() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const frameRef = useRef<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const globeInitializedRef = useRef(false);

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

  // Check dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Initialize globe only when section is visible (fixes mobile: no spin when below fold)
  useEffect(() => {
    if (!isVisible || !mountRef.current || typeof window === "undefined" || globeInitializedRef.current) return;

    // Load Three.js
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    
    script.onload = () => {
      if (!window.THREE || !mountRef.current) return;

      const THREE = window.THREE;
      const container = mountRef.current;

      // SETUP SCENE
      const scene = new THREE.Scene();

      // SETUP RENDERER
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(container.offsetWidth, container.offsetHeight); // Use offsetWidth/Height
      scene.background = null;
      container.appendChild(renderer.domElement);

      // SETUP lights
      const light1 = new THREE.PointLight(0x5a54ff, 0.75);
      light1.position.set(-150, 150, -50);

      const light2 = new THREE.PointLight(0x4158f6, 0.75);
      light2.position.set(-400, 200, 150);

      const light3 = new THREE.PointLight(0x803bff, 0.7);
      light3.position.set(100, 250, -100);

      scene.add(light1, light2, light3);

      // SETUP GEOMETRY
      // setup halo
      const atmosphereShader = {
        'atmosphere': {
          uniforms: {},
          vertexShader: [
            'varying vec3 vNormal;',
            'void main() {',
            'vNormal = normalize( normalMatrix * normal );',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
            '}'
          ].join('\n'),
          fragmentShader: [
            'varying vec3 vNormal;',
            'void main() {',
            'float intensity = pow( 0.99 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 6.0 );',
            'gl_FragColor = vec4( .28, .48, 1.0, 1.0 ) * intensity;',
            '}'
          ].join('\n')
        }
      };

      const atmosphereGeometry = new THREE.SphereGeometry(2, 64, 64);
      const atmosphereMaterial = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(atmosphereShader['atmosphere'].uniforms),
        vertexShader: atmosphereShader['atmosphere'].vertexShader,
        fragmentShader: atmosphereShader['atmosphere'].fragmentShader,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atm = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      atm.scale.set(1.05, 1.05, 1.05);
      scene.add(atm);
      atm.position.set(-0.1, 0.1, 0);

      // setup globe
      const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
      const sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xeeeeee
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      scene.add(sphere);

      // setup map overlay
      const loader = new THREE.TextureLoader();
      const overlayMaterial = new THREE.MeshBasicMaterial({
        map: loader.load('https://i.imgur.com/JLFp6Ws.png'),
        transparent: true
      });

      const overlaySphereGeometry = new THREE.SphereGeometry(2.003, 64, 64);
      const overlaySphere = new THREE.Mesh(overlaySphereGeometry, overlayMaterial);
      overlaySphere.castShadow = true;
      overlaySphere.receiveShadow = true;
      sphere.add(overlaySphere);

      // set up bezier curves
      const numPoints = 100;
      const start = new THREE.Vector3(0, 1.5, 1.3);
      const middle = new THREE.Vector3(0.6, 0.6, 3.2);
      const end = new THREE.Vector3(1.5, -1, 0.8);

      const curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);
      const tubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xd965fa
      });

      const tubes: any[] = [];
      const curveMeshes: any[] = [];

      // Create 8 tubes
      for (let i = 0; i < 8; i++) {
        const tube = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
        tube.setDrawRange(0, 10000);
        const curveMesh = new THREE.Mesh(tube, tubeMaterial);
        
        // Set different rotations for each tube
        const rotations = [
          { y: 0, z: 0, x: 0 },
          { y: 0.75, z: 0.75, x: -0.1 },
          { y: 2.1, z: 0.5, x: 0.2 },
          { y: 2.3, z: 0.8, x: 0.2 },
          { y: 2.9, z: 1.1, x: 2 },
          { y: 7.1, z: 1, x: 4.4 },
          { y: 2.1, z: 3, x: 4.4 },
          { y: 2.5, z: 1, x: 1.1 }
        ];

        const rotation = rotations[i];
        curveMesh.rotation.y = rotation.y;
        curveMesh.rotation.z = rotation.z;
        curveMesh.rotation.x = rotation.x;

        sphere.add(curveMesh);
        tubes.push(tube);
        curveMeshes.push(curveMesh);
      }

      // set up spires
      const cylinderGeometry = new THREE.CylinderGeometry(0.01, 0.01, 4.25, 32);
      const cylinderMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ddff,
        transparent: true,
        opacity: 0.5
      });

      const cylinderRotations = [
        { x: 0.75, z: 0 },
        { x: 0.74, z: -0.05 },
        { x: 0.72, z: -0.07 },
        { x: -1, z: 2 },
        { x: 0.8, z: 0.5 },
        { x: 1.05, z: 0 },
        { x: 2, z: 3 },
        { x: 0.8, z: 2.5 }
      ];

      for (let i = 0; i < 8; i++) {
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        const rotation = cylinderRotations[i];
        cylinder.rotation.x = rotation.x;
        cylinder.rotation.z = rotation.z;
        sphere.add(cylinder);
      }

      // SETUP camera
      const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
      camera.position.z = 6;

      // Mouse + Touch interaction (touch for phone – manual rotate)
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };

      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - previousMousePosition.x;
        sphere.rotation.y += deltaX * 0.004;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const handleMouseUp = () => {
        isDragging = false;
      };

      // Touch: decide scroll vs globe-drag from first move direction (so page scroll works)
      let touchStartPos = { x: 0, y: 0 };
      let touchGesture: 'scroll' | 'globe' | null = null;
      const DIRECTION_THRESHOLD = 10;
      const HORIZONTAL_BIAS = 1.3;

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          previousMousePosition = { x: touchStartPos.x, y: touchStartPos.y };
          touchGesture = null;
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        const totalDeltaX = x - touchStartPos.x;
        const totalDeltaY = y - touchStartPos.y;

        if (touchGesture === null) {
          const absX = Math.abs(totalDeltaX);
          const absY = Math.abs(totalDeltaY);
          if (absX > DIRECTION_THRESHOLD || absY > DIRECTION_THRESHOLD) {
            touchGesture = absX * HORIZONTAL_BIAS > absY ? 'globe' : 'scroll';
          }
        }

        if (touchGesture === 'globe') {
          e.preventDefault();
          isDragging = true;
          const deltaX = x - previousMousePosition.x;
          sphere.rotation.y += deltaX * 0.004;
          previousMousePosition = { x, y };
        }
      };

      const handleTouchEnd = () => {
        isDragging = false;
        touchGesture = null;
      };

      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseUp);
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
      container.addEventListener('touchcancel', handleTouchEnd);

      // Animation variables
      let renderCount = 0;
      let currentGrowing = 0;

      function GrowTube(index: number, renderCountValue: number) {
        renderCountValue = Math.ceil(renderCountValue / 3) * 3;
        tubes[index].setDrawRange(0, renderCountValue);
        if (index > 2) {
          tubes[index - 3].setDrawRange(renderCountValue, 10000);
        } else {
          tubes[(tubes.length - 3) + index].setDrawRange(renderCountValue, 10000);
        }
      }

      // ANIMATION LOOP
      const animate = () => {
        if (renderCount < 10000) {
          renderCount += 80;
          GrowTube(currentGrowing, renderCount);
        } else {
          renderCount = 0;
          if (currentGrowing >= tubes.length - 1) {
            currentGrowing = 0;
          } else {
            currentGrowing++;
          }
        }

        if (!isDragging) {
          sphere.rotation.y += 0.0005;
        }

        renderer.render(scene, camera);
        frameRef.current = requestAnimationFrame(animate);
      };

      animate();
      globeInitializedRef.current = true;

      // Handle resize
      const handleResize = () => {
        if (!container) return;
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      window.addEventListener('resize', handleResize);

      // Store refs for cleanup
      sceneRef.current = scene;
      rendererRef.current = renderer;

      // Cleanup function
      return () => {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
        container.removeEventListener('touchcancel', handleTouchEnd);
        window.removeEventListener('resize', handleResize);
        
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
        
        renderer.dispose();
      };
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isVisible]);

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.8; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1); }
        }
        .floating-particle { animation: float 6s ease-in-out infinite; }
        .rotating-orbit { animation: rotate 20s linear infinite; }
        .pulsing-line { animation: pulse 3s ease-in-out infinite; }
        .fading-label { animation: fadeInOut 4s ease-in-out infinite; }
      `}</style>
      
      <div 
        ref={sectionRef}
        className="flex flex-col items-center justify-center p-0 min-h-screen relative w-full overflow-hidden"
        style={{ backgroundColor: isDarkMode ? 'var(--background)' : '#0f172a' }}
      >
      
      {/* Heading Section with Angled Background */}
      <div className="relative w-full overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(80px)' }}>
        {/* Angled Background */}
        <div 
          className="absolute top-0 left-0 right-0 bottom-0 z-[1]"
          style={{ 
            background: isDarkMode 
              ? 'var(--card-bg)'
              : 'linear-gradient(to bottom right, #1e293b, #0f172a)',
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
          }}
        />
        
        {/* Content */}
        <div className="text-center px-4 py-10 sm:px-6 sm:py-14 md:px-[60px] md:py-[100px_60px_80px] relative z-[2]">
          <h2 
            className="section-heading text-[22px] min-[400px]:text-[26px] sm:text-[32px] md:text-[48px] font-bold text-white m-0 mb-4 sm:mb-5 md:mb-[20px] tracking-[2px] sm:tracking-[4px] md:tracking-[8px] leading-[1.2] uppercase transition-all duration-800 delay-200"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-60px)' }}
          >
            Global <span style={{ color: '#e63a27' }}>Presence</span>
          </h2>
          <p 
            className="section-subheading text-[14px] sm:text-[16px] md:text-[18px] lg:text-[26px] leading-[1.5] sm:leading-[1.6] text-white/90 max-w-[1500px] mx-auto mb-5 sm:mb-6 md:mb-[30px] font-normal tracking-[0.2px] px-1 transition-all duration-800 delay-400"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(60px)' }}
          >
            Connecting businesses across continents with our worldwide network
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full relative overflow-hidden flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-[40px] lg:gap-[60px] pb-10 sm:pb-14 md:pb-[80px] px-4 sm:px-5 md:px-[40px] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] delay-600" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(60px)' }}>
        
        {/* Left Side - Globe - on phone: bigger, centered */}
        <div className="flex-[1.3] flex flex-col items-center justify-center lg:items-start w-full transition-all duration-800 delay-800" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-80px)' }}>
       
          <div className="relative w-full max-w-[min(100%,400px)] min-[400px]:max-w-[min(100%,440px)] sm:max-w-[min(100%,520px)] md:max-w-none h-[500px] min-[400px]:h-[540px] sm:h-[600px] md:h-[700px] lg:h-[850px] xl:h-[1000px] flex items-center justify-center mx-auto lg:mx-0 lg:justify-start">
            <div 
              ref={mountRef} 
              className="w-full h-full"
            />
            
            {/* Floating Particles Animation - Hidden on small screens to avoid clutter */}
            <div className="hidden md:block floating-particle absolute top-[10%] left-[5%] w-[8px] h-[8px] bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
            <div className="hidden md:block floating-particle absolute top-[20%] right-[10%] w-[6px] h-[6px] bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] [animation-delay:2s]" />
            <div className="hidden md:block floating-particle absolute bottom-[30%] left-[15%] w-[10px] h-[10px] bg-amber-500 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.8)] [animation-delay:1s]" />
            <div className="hidden md:block floating-particle absolute top-[40%] right-[20%] w-[4px] h-[4px] bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.8)] [animation-delay:3s]" />

            {/* Data Points - hidden on very small screens to avoid clutter */}
            <div className="fading-label absolute top-[12%] left-[55%] min-[400px]:left-[60%] text-[10px] sm:text-[12px] text-white bg-blue-500/90 px-1.5 py-1 sm:px-2 sm:py-1 rounded font-semibold hidden min-[400px]:block">
              North America
            </div>
            <div className="fading-label absolute top-[42%] right-[10%] min-[400px]:right-[15%] text-[10px] sm:text-[12px] text-white bg-emerald-500/90 px-1.5 py-1 sm:px-2 sm:py-1 rounded font-semibold [animation-delay:2s] hidden min-[400px]:block">
              Europe
            </div>
            <div className="fading-label absolute bottom-[18%] left-[35%] min-[400px]:left-[40%] text-[10px] sm:text-[12px] text-white bg-amber-500/90 px-1.5 py-1 sm:px-2 sm:py-1 rounded font-semibold [animation-delay:1s] hidden min-[400px]:block">
              Asia Pacific
            </div>

            {/* Gradient Overlay */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 md:h-[160px] pointer-events-none z-40"
              style={{ 
                background: isDarkMode 
                  ? 'var(--background)'
                  : 'linear-gradient(to bottom, transparent, #0f172a)'
              }}
            />
          </div>
        </div>

        {/* Right Side - Professional Data Table */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start w-full transition-all duration-800 delay-1000" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(80px)' }}>
          <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-[16px] p-4 sm:p-5 md:p-[24px] lg:p-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[var(--card-border)] w-full max-w-[600px] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:scale-[1.02]">
            <div className="flex flex-col min-[400px]:flex-row items-start min-[400px]:items-center justify-between gap-2 mb-4 sm:mb-5 md:mb-[24px]">
              <h3 className="section-heading text-[18px] sm:text-[22px] md:text-[28px] font-bold text-[var(--text-primary)]">
                Global Distribution
              </h3>
              <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-[12px] md:py-[6px] bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shrink-0">
                <span className="text-white text-[10px] sm:text-[12px] font-bold">2024</span>
              </div>
            </div>
            
            {/* Key Metrics - stack on very small, 3 cols on larger */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-[16px] mb-4 sm:mb-5 md:mb-[24px]">
              <div className="text-center p-2 sm:p-2.5 md:p-[12px] bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg sm:rounded-[12px] border border-blue-500/20">
                <div className="text-[14px] sm:text-[16px] md:text-[20px] font-bold text-blue-500">43</div>
                <div className="text-[9px] sm:text-[10px] md:text-[11px] text-[var(--text-secondary)]">Countries</div>
              </div>
              <div className="text-center p-2 sm:p-2.5 md:p-[12px] bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-lg sm:rounded-[12px] border border-emerald-500/20">
                <div className="text-[12px] sm:text-[14px] md:text-[20px] font-bold text-emerald-500">$12.9M</div>
                <div className="text-[9px] sm:text-[10px] md:text-[11px] text-[var(--text-secondary)]">Total Sales</div>
              </div>
              <div className="text-center p-2 sm:p-2.5 md:p-[12px] bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-lg sm:rounded-[12px] border border-amber-500/20">
                <div className="text-[14px] sm:text-[16px] md:text-[20px] font-bold text-amber-500">+28%</div>
                <div className="text-[9px] sm:text-[10px] md:text-[11px] text-[var(--text-secondary)]">Growth</div>
              </div>
            </div>

            <div className="overflow-x-auto -mx-1 w-full">
              <table className="w-full border-collapse bg-[var(--card-bg)] rounded-lg sm:rounded-[12px] overflow-hidden min-w-[280px]">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
                    <th className="p-2 sm:p-3 md:p-[16px] text-left text-white font-bold text-[10px] sm:text-[11px] md:text-[13px] uppercase tracking-[0.5px]">Region</th>
                    <th className="p-2 sm:p-3 md:p-[16px] text-center text-white font-bold text-[10px] sm:text-[11px] md:text-[13px] uppercase tracking-[0.5px]">Countries</th>
                    <th className="p-2 sm:p-3 md:p-[16px] text-center text-white font-bold text-[10px] sm:text-[11px] md:text-[13px] uppercase tracking-[0.5px]">Sales</th>
                    <th className="p-2 sm:p-3 md:p-[16px] text-right text-white font-bold text-[10px] sm:text-[11px] md:text-[13px] uppercase tracking-[0.5px]">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--card-border)] hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-blue-600/5 transition-all duration-200">
                    <td className="p-2 sm:p-3 md:p-[16px]">
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-[8px]">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-[8px] md:h-[8px] bg-blue-500 rounded-full shrink-0"></div>
                        <span className="text-[var(--text-primary)] font-semibold text-[11px] sm:text-[12px] md:text-[14px]">North America</span>
                      </div>
                    </td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-center text-[var(--text-secondary)] text-[11px] sm:text-[12px] md:text-[14px]">3</td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-center text-[var(--text-secondary)] text-[11px] sm:text-[12px] md:text-[14px] font-bold">$2.5M</td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-right">
                      <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-[8px] md:py-[4px] bg-emerald-500/20 text-emerald-500 rounded-full text-[9px] sm:text-[10px] md:text-[12px] font-bold">+15%</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-blue-600/5 transition-all duration-200">
                    <td className="p-2 sm:p-3 md:p-[16px]">
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-[8px]">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-[8px] md:h-[8px] bg-emerald-500 rounded-full shrink-0"></div>
                        <span className="text-[var(--text-primary)] font-semibold text-[11px] sm:text-[12px] md:text-[14px]">Europe</span>
                      </div>
                    </td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-center text-[var(--text-secondary)] text-[11px] sm:text-[12px] md:text-[14px]">15</td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-center text-[var(--text-secondary)] text-[11px] sm:text-[12px] md:text-[14px] font-bold">$4.2M</td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-right">
                      <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-[8px] md:py-[4px] bg-emerald-500/20 text-emerald-500 rounded-full text-[9px] sm:text-[10px] md:text-[12px] font-bold">+22%</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--card-border)] hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-blue-600/5 transition-all duration-200">
                    <td className="p-2 sm:p-3 md:p-[16px]">
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-[8px]">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-[8px] md:h-[8px] bg-amber-500 rounded-full shrink-0"></div>
                        <span className="text-[var(--text-primary)] font-semibold text-[11px] sm:text-[12px] md:text-[14px]">Asia Pacific</span>
                      </div>
                    </td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-center text-[var(--text-secondary)] text-[11px] sm:text-[12px] md:text-[14px]">12</td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-center text-[var(--text-secondary)] text-[11px] sm:text-[12px] md:text-[14px] font-bold">$3.8M</td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-right">
                      <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-[8px] md:py-[4px] bg-emerald-500/20 text-emerald-500 rounded-full text-[9px] sm:text-[10px] md:text-[12px] font-bold">+35%</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-blue-600/5 transition-all duration-200">
                    <td className="p-2 sm:p-3 md:p-[16px]">
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-[8px]">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-[8px] md:h-[8px] bg-purple-500 rounded-full shrink-0"></div>
                        <span className="text-[var(--text-primary)] font-semibold text-[11px] sm:text-[12px] md:text-[14px]">Middle East</span>
                      </div>
                    </td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-center text-[var(--text-secondary)] text-[11px] sm:text-[12px] md:text-[14px]">8</td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-center text-[var(--text-secondary)] text-[11px] sm:text-[12px] md:text-[14px] font-bold">$1.5M</td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-right">
                      <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-[8px] md:py-[4px] bg-emerald-500/20 text-emerald-500 rounded-full text-[9px] sm:text-[10px] md:text-[12px] font-bold">+18%</span>
                    </td>
                  </tr>
                   <tr className="border-b border-[var(--card-border)] hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-blue-600/5 transition-all duration-200">
                    <td className="p-2 sm:p-3 md:p-[16px]">
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-[8px]">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-[8px] md:h-[8px] bg-red-500 rounded-full shrink-0"></div>
                        <span className="text-[var(--text-primary)] font-semibold text-[11px] sm:text-[12px] md:text-[14px]">Africa</span>
                      </div>
                    </td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-center text-[var(--text-secondary)] text-[11px] sm:text-[12px] md:text-[14px]">5</td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-center text-[var(--text-secondary)] text-[11px] sm:text-[12px] md:text-[14px] font-bold">$0.9M</td>
                    <td className="p-2 sm:p-3 md:p-[16px] text-right">
                      <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-[8px] md:py-[4px] bg-amber-500/20 text-amber-500 rounded-full text-[9px] sm:text-[10px] md:text-[12px] font-bold">+8%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Additional Info */}
            <div className="mt-4 sm:mt-5 md:mt-[20px] pt-4 sm:pt-5 md:pt-[20px] border-t border-[var(--card-border)]">
              <div className="flex flex-col min-[400px]:flex-row items-start min-[400px]:items-center justify-between gap-1 sm:gap-2">
                <div className="text-[10px] sm:text-[11px] md:text-[12px] text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--text-primary)]">Top Market:</span> United States ($1.8M)
                </div>
                <div className="text-[10px] sm:text-[11px] md:text-[12px] text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--text-primary)]">Q4 2024:</span> +32% YoY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      </div>
    </>
  );
}
