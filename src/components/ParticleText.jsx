import React, { useEffect, useRef } from 'react';

export default function ParticleText() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let particles = [];
    let animationFrameId;
    
    const mouse = { x: null, y: null, radius: 110 };
    
    // Core structural parameters
    let globalRotationTime = 0;
    const coreNucleusRadius = 40;
    const baseOrbitRadius = 180;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 450; 
    };
    resizeCanvas();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    class QuantumParticle {
      constructor(x, y, z, color, type = 'cloud') {
        this.baseX = x;
        this.baseY = y;
        this.baseZ = z;
        
        this.x = x;     
        this.y = y;
        this.z = z;
        
        this.color = color;
        this.type = type; 
        
        this.size = type === 'nucleus' ? 1.6 : (Math.random() * 1.5 + 1.0);
        this.density = (Math.random() * 20) + 10;
        
        // Phase offsets for localized tracking variations
        this.phaseOffset = Math.random() * Math.PI * 2;
        this.speedFactor = Math.random() * 0.3 + 0.02;
      }

      draw(projX, projY, scale) {
        const finalSize = Math.max(0.8, this.size * scale);
        
        // Calculate sharp, bright transparency falloffs
        let opacity = Math.min(1, Math.max(0.2, (this.z + 200) / 400));
        
        if (this.type === 'nucleus') {
          // Hyper-bright yellow for the core
          ctx.fillStyle = `rgba(250, 204, 21, ${opacity * 0.95})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#84ff00';
        } else {
          // Crisp radiant white for the probability paths
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.85})`;
          ctx.shadowBlur = 2;
          ctx.shadowColor = '#ffffff';
        }

        ctx.beginPath();
        ctx.arc(projX, projY, finalSize, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }

      update(projX, projY) {
         if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - projX;
          let dy = mouse.y - projY;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * this.density * 0.25;
            this.y -= (dy / distance) * force * this.density * 0.25;
            this.z -= force * this.density * 0.4;
          }
        }

        // Return forces
        this.x += (this.baseX - this.x) * 0.1;
        this.y += (this.baseY - this.y) * 0.1;
        this.z += (this.baseZ - this.z) * 0.1;
      }
    }

    let nucleusParticles = [];
    let cloudParticles = [];

    const initQuantumAtom = () => {
      nucleusParticles = [];
      cloudParticles = [];

      // 1. DENSE HARMONIC NUCLEUS
      const centralDensity = 500;
      for (let i = 0; i < centralDensity; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.pow(Math.random(), 0.6) * coreNucleusRadius; 

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        nucleusParticles.push(new QuantumParticle(x, y, z, '#facc15', 'nucleus'));
      }

      // 2. DENSE PROBABILITY SHELL INFRASTRUCTURE (5 Distinct Intersecting Planes)
      const totalCloudPoints = 1900; 
      const totalPlanes = 5;

      for (let i = 0; i < totalCloudPoints; i++) {
        // Assign particle to an index plane group
        const planeId = i % totalPlanes;
        
        // Distribution parameters across the ellipses
        const theta = (i / totalCloudPoints) * Math.PI * 2 * (totalCloudPoints / totalPlanes);
        
        // Base plane orientation offsets
        const planeRotY = (planeId * Math.PI) / totalPlanes;
        const planeRotZ = (planeId * Math.PI) / (totalPlanes * 1.5);

        // Map a classic eccentric elliptical trail profile
        let x0 = baseOrbitRadius * Math.cos(theta);
        let y0 = baseOrbitRadius * Math.sin(theta) * 0.95; 
        let z0 = baseOrbitRadius * Math.sin(theta) * 0.85;

        // Apply plane matrices configuration mapping
        let x1 = x0 * Math.cos(planeRotY) - z0 * Math.sin(planeRotY);
        let z1 = x0 * Math.sin(planeRotY) + z0 * Math.cos(planeRotY);
        let y1 = y0 * Math.cos(planeRotZ) - x1 * Math.sin(planeRotZ);
        let x2 = y0 * Math.sin(planeRotZ) + x1 * Math.cos(planeRotZ);

        const p = new QuantumParticle(x2, y1, z1, '#ffffff', 'cloud');
        
        // Store structural tracking properties directly on the node instance
        p.orbitTheta = theta;
        p.planeRotY = planeRotY;
        p.planeRotZ = planeRotZ;
        
        cloudParticles.push(p);
      }
    };

    initQuantumAtom();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update global time ticking trackers
      globalRotationTime += 0.0090; 
      const pulseTime = Date.now() * 0.004;

      const viewCenterX = canvas.width / 2;
      const viewCenterY = canvas.height / 2;
      const fov = 350; 

      nucleusParticles.forEach((p) => {
        const breath = 1 + Math.sin(pulseTime + p.phaseOffset) * 0.3;
        p.baseX = p.baseX * breath - (p.baseX * breath - p.baseX) * 0.9;
        p.baseY = p.baseY * breath - (p.baseY * breath - p.baseY) * 0.9;
      });

      cloudParticles.forEach((p) => {
        const currentTheta = p.orbitTheta + globalRotationTime * p.speedFactor * 15;
        
        const microJitterX = (Math.random() - 0.5) * 12; 
        const microJitterY = (Math.random() - 0.5) * 12;
        const microJitterZ = (Math.random() - 0.5) * 12;

        // Base elliptical math coordinates
        let x0 = baseOrbitRadius * Math.cos(currentTheta);
        let y0 = baseOrbitRadius * Math.sin(currentTheta) * 0.35; 
        let z0 = baseOrbitRadius * Math.sin(currentTheta) * 0.85;

        const activeRotY = p.planeRotY; 
        const activeRotZ = p.planeRotZ;

        // Run standard 3D projection matrix math
        let x1 = x0 * Math.cos(activeRotY) - z0 * Math.sin(activeRotY);
        let z1 = x0 * Math.sin(activeRotY) + z0 * Math.cos(activeRotY);
        let y1 = y0 * Math.cos(activeRotZ) - x1 * Math.sin(activeRotZ);
        let x2 = y0 * Math.sin(activeRotZ) + x1 * Math.cos(activeRotZ);

        // Apply the coordinate assignments plus the frantic micro-vibrations
        p.baseX = x2 + microJitterX;
        p.baseY = y1 + microJitterY;
        p.baseZ = z1 + microJitterZ;
      });

      // Combine arrays to sort and project them as one uniform scene
      const allParticles = [...nucleusParticles, ...cloudParticles];

      // Project, calculate mouse proximity effects, and package depth metrics
      const renderedNodes = allParticles.map((p) => {
        // Global viewing camera rotation tracking modifiers
        let x1 = p.x * Math.cos(0) - p.z * Math.sin(0);
        let z1 = p.x * Math.sin(0) + p.z * Math.cos(0);
        let y1 = p.y * Math.cos(0) - z1 * Math.sin(0);
        let z2 = p.y * Math.sin(0) + z1 * Math.cos(0);

        const scale = fov / (fov + z2);
        const projX = viewCenterX + x1 * scale;
        const projY = viewCenterY + y1 * scale;

        p.update(projX, projY);

        return { particle: p, projX, projY, scale, depth: z2 };
      });

      // Depth sort
      renderedNodes.sort((a, b) => b.depth - a.depth);

      // Render
      renderedNodes.forEach((node) => {
        node.particle.draw(node.projX, node.projY, node.scale);
      });

      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full h-full bg-transparent flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair max-h-[480px]" />
    </div>
  );
}