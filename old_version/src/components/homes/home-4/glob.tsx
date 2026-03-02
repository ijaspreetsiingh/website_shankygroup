"use client";
import React, { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (!mountRef.current || typeof window === "undefined") return;

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
      renderer.setSize(container.offsetHeight, container.offsetHeight);
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
      const camera = new THREE.PerspectiveCamera(75, 900 / 900, 0.1, 1000);
      camera.position.z = 6;

      // Mouse interaction
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };

      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const deltaX = e.clientX - rect.left - previousMousePosition.x;

        if (isDragging) {
          sphere.rotation.y += deltaX * 0.004;
        }

        previousMousePosition = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      };

      const handleMouseUp = () => {
        isDragging = false;
      };

      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseUp);

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

      // Handle resize
      const handleResize = () => {
        renderer.setSize(container.offsetHeight, container.offsetHeight);
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
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-20px) scale(1.1); 
            opacity: 1;
          }
        }
        
        @keyframes rotate {
          from { 
            transform: translate(-50%, -50%) rotate(0deg); 
          }
          to { 
            transform: translate(-50%, -50%) rotate(360deg); 
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.05); 
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(0.95); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }

        .floating-particle {
          animation: float 6s ease-in-out infinite;
        }

        .rotating-orbit {
          animation: rotate 20s linear infinite;
        }

        .pulsing-line {
          animation: pulse 3s ease-in-out infinite;
        }

        .fading-label {
          animation: fadeInOut 4s ease-in-out infinite;
        }
      `}</style>
      
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0', minHeight: '100vh', backgroundColor: '#0f172a', position: 'relative', width: '100%'}}>
      
      {/* Heading Section with Angled Background */}
      <div style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden'
      }}>
        {/* Angled Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
          zIndex: 1
        }} />
        
        {/* Content */}
        <div style={{
          textAlign: 'center',
          padding: '100px 60px 80px 60px',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '400',
            color: '#ffffff',
            margin: '0 0 20px 0',
            letterSpacing: '8px',
            lineHeight: '1.2',
            textTransform: 'uppercase'
          }}>
            Global Presence
          </h2>
          <p style={{
            fontSize: '26px',
            lineHeight: '1.6',
            color: '#e2e8f0',
            maxWidth: '1500px',
            margin: '0 auto 30px',
            fontWeight: '400',
            letterSpacing: '0.2px'
          }}>
            Connecting businesses across continents with our worldwide network
          </p>
        </div>
      </div>

      <div style={{maxWidth: '1600px', margin: '0 auto', width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'row', gap: '60px', paddingBottom: '80px', paddingLeft: '40px', paddingRight: '40px'}}>
        
        {/* Left Side - Globe */}
        <div style={{flex: '1.3', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
       
          <div style={{position: 'relative', width: '100%', height: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <div 
              ref={mountRef} 
              style={{width: '90%', height: '100%', minHeight: '1000px', marginLeft: '0'}}
            />
            
            {/* Floating Particles Animation */}
            <div className="floating-particle" style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: '8px',
              height: '8px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)'
            }} />
            
            <div className="floating-particle" style={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              width: '6px',
              height: '6px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              animationDelay: '2s',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.8)'
            }} />
            
            <div className="floating-particle" style={{
              position: 'absolute',
              bottom: '30%',
              left: '15%',
              width: '10px',
              height: '10px',
              backgroundColor: '#f59e0b',
              borderRadius: '50%',
              animationDelay: '1s',
              boxShadow: '0 0 25px rgba(245, 158, 11, 0.8)'
            }} />
            
            <div className="floating-particle" style={{
              position: 'absolute',
              top: '40%',
              right: '20%',
              width: '4px',
              height: '4px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              animationDelay: '3s',
              boxShadow: '0 0 12px rgba(239, 68, 68, 0.8)'
            }} />

            {/* Orbit Ring Animation */}
            <div className="rotating-orbit" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              height: '300px',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}>
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '16px',
                height: '16px',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(59, 130, 246, 1)'
              }} />
            </div>

            {/* Connection Lines */}
            <div className="pulsing-line" style={{
              position: 'absolute',
              top: '25%',
              left: '25%',
              width: '100px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
              transform: 'rotate(45deg)'
            }} />
            
            <div className="pulsing-line" style={{
              position: 'absolute',
              bottom: '35%',
              right: '25%',
              width: '80px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
              animationDelay: '1s',
              transform: 'rotate(-30deg)'
            }} />

            {/* Data Points */}
            <div className="fading-label" style={{
              position: 'absolute',
              top: '15%',
              left: '60%',
              fontSize: '12px',
              color: '#ffffff',
              backgroundColor: 'rgba(59, 130, 246, 0.9)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontWeight: '600'
            }}>
              North America
            </div>
            
            <div className="fading-label" style={{
              position: 'absolute',
              top: '45%',
              right: '15%',
              fontSize: '12px',
              color: '#ffffff',
              backgroundColor: 'rgba(16, 185, 129, 0.9)',
              padding: '4px 8px',
              borderRadius: '4px',
              animationDelay: '2s',
              fontWeight: '600'
            }}>
              Europe
            </div>
            
            <div className="fading-label" style={{
              position: 'absolute',
              bottom: '20%',
              left: '40%',
              fontSize: '12px',
              color: '#ffffff',
              backgroundColor: 'rgba(245, 158, 11, 0.9)',
              padding: '4px 8px',
              borderRadius: '4px',
              animationDelay: '1s',
              fontWeight: '600'
            }}>
              Asia Pacific
            </div>

            {/* Gradient Overlay */}
            <div style={{position: 'absolute', bottom: '0', left: '0', right: '0', height: '160px', background: 'linear-gradient(to bottom, transparent, #0f172a)', pointerEvents: 'none', zIndex: '40'}} />
          </div>
        </div>

        {/* Right Side - Table */}
        <div style={{flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
          <div style={{backgroundColor: '#1e293b', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', border: '1px solid #334155', width: '100%', maxWidth: '500px'}}>
            <h3 style={{fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginBottom: '20px', textAlign: 'center'}}>
              Global Distribution
            </h3>
            <table style={{width: '100%', borderCollapse: 'collapse', backgroundColor: '#334155', borderRadius: '8px', overflow: 'hidden'}}>
              <thead>
                <tr style={{backgroundColor: '#2563eb'}}>
                  <th style={{padding: '12px 16px', textAlign: 'left', color: '#ffffff', fontWeight: '600', fontSize: '14px'}}>Region</th>
                  <th style={{padding: '12px 16px', textAlign: 'center', color: '#ffffff', fontWeight: '600', fontSize: '14px'}}>Countries</th>
                  <th style={{padding: '12px 16px', textAlign: 'right', color: '#ffffff', fontWeight: '600', fontSize: '14px'}}>Sales</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{borderBottom: '1px solid #475569'}}>
                  <td style={{padding: '12px 16px', color: '#e2e8f0', fontSize: '14px'}}>North America</td>
                  <td style={{padding: '12px 16px', textAlign: 'center', color: '#e2e8f0', fontSize: '14px'}}>3</td>
                  <td style={{padding: '12px 16px', textAlign: 'right', color: '#e2e8f0', fontSize: '14px', fontWeight: '600'}}>$2.5M</td>
                </tr>
                <tr style={{borderBottom: '1px solid #475569', backgroundColor: '#1e293b'}}>
                  <td style={{padding: '12px 16px', color: '#e2e8f0', fontSize: '14px'}}>Europe</td>
                  <td style={{padding: '12px 16px', textAlign: 'center', color: '#e2e8f0', fontSize: '14px'}}>15</td>
                  <td style={{padding: '12px 16px', textAlign: 'right', color: '#e2e8f0', fontSize: '14px', fontWeight: '600'}}>$4.2M</td>
                </tr>
                <tr style={{borderBottom: '1px solid #475569'}}>
                  <td style={{padding: '12px 16px', color: '#e2e8f0', fontSize: '14px'}}>Asia Pacific</td>
                  <td style={{padding: '12px 16px', textAlign: 'center', color: '#e2e8f0', fontSize: '14px'}}>12</td>
                  <td style={{padding: '12px 16px', textAlign: 'right', color: '#e2e8f0', fontSize: '14px', fontWeight: '600'}}>$3.8M</td>
                </tr>
                <tr style={{borderBottom: '1px solid #475569', backgroundColor: '#1e293b'}}>
                  <td style={{padding: '12px 16px', color: '#e2e8f0', fontSize: '14px'}}>Latin America</td>
                  <td style={{padding: '12px 16px', textAlign: 'center', color: '#e2e8f0', fontSize: '14px'}}>8</td>
                  <td style={{padding: '12px 16px', textAlign: 'right', color: '#e2e8f0', fontSize: '14px', fontWeight: '600'}}>$1.9M</td>
                </tr>
                <tr style={{backgroundColor: '#0f172a'}}>
                  <td style={{padding: '12px 16px', color: '#ffffff', fontSize: '14px', fontWeight: '600'}}>Total</td>
                  <td style={{padding: '12px 16px', textAlign: 'center', color: '#ffffff', fontSize: '14px', fontWeight: '600'}}>38</td>
                  <td style={{padding: '12px 16px', textAlign: 'right', color: '#ffffff', fontSize: '14px', fontWeight: '600'}}>$12.4M</td>
                </tr>
              </tbody>
            </table>
            <div style={{marginTop: '20px', textAlign: 'center'}}>
              <p style={{fontSize: '12px', color: '#94a3b8', margin: '0'}}>
                *Data updated monthly | Next update: 30 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );  
}

export default GlobeDemo;
