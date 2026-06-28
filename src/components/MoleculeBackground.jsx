import React, { useState, useEffect, useRef } from "react";

export default function MoleculeBackground() {
  const canvasRef = useRef(null);
  const thermometerRef = useRef(null);

  // State for UI readouts
  const [temperature, setTemperature] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Core references to prevent canvas loop destruction during phase changes
  const targetTempRef = useRef(0);
  const currentTempRef = useRef(0);

  // 1. SCROLL SYNC PIPELINE
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return; // Allow manual thermometer control to take priority

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPct = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      const computedTemp = scrollPct * 100;

      setTemperature(computedTemp);
      targetTempRef.current = computedTemp;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDragging]);

  // 2. THERMOMETER DRAG / INTERACTION LOGIC
  const handleThermometerInteraction = (clientY) => {
    if (!thermometerRef.current) return;
    const rect = thermometerRef.current.getBoundingClientRect();
    const height = rect.height;
    const relativeY = rect.bottom - clientY;
    const pct = Math.min(Math.max(relativeY / height, 0), 1);
    const newTemp = pct * 100;

    setTemperature(newTemp);
    targetTempRef.current = newTemp;

    // Scroll page dynamically to mirror manual thermometer input
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      window.scrollTo({
        top: pct * docHeight,
        behavior: "auto",
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleThermometerInteraction(e.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      handleThermometerInteraction(e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // 3. SEAMLESS PHYSICS ENGINE (Runs continuously on an empty dependency array)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const particleCount = 80;
    const particles = [];

    // Instantiate basic particle parameters
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        anchorX: Math.random() * window.innerWidth,
        anchorY: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1.5,
        seed: Math.random() * 100,
      });
    }

    // Build fixed structured coordinate mappings for Solid Lattice State
    const cols = Math.ceil(
      Math.sqrt(particleCount * (window.innerWidth / window.innerHeight)),
    );
    const rows = Math.ceil(particleCount / cols);
    let pIdx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pIdx >= particleCount) break;
        particles[pIdx].anchorX =
          (window.innerWidth / (cols + 1)) * (c + 1) +
          (Math.random() - 0.5) * 30;
        particles[pIdx].anchorY =
          (window.innerHeight / (rows + 1)) * (r + 1) +
          (Math.random() - 0.5) * 30;
        pIdx++;
      }
    }

    const render = () => {
      // Smoothly approach target temperature values for non-abrupt rendering changes
      currentTempRef.current +=
        (targetTempRef.current - currentTempRef.current) * 0.08;
      const temp = currentTempRef.current;

      ctx.fillStyle = "rgba(3, 22, 22, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let speedFactor = 0.2;
      let maxLineDist = 0;
      let lineOpacity = 0;
      let logicPhase = "solid";

      // Live phase boundary logic definitions
      if (temp < 35) {
        logicPhase = "solid";
        const factor = temp / 35;
        speedFactor = 0.2 + factor * 0.4;
        maxLineDist = 130 - factor * 30;
        lineOpacity = 0.4 - factor * 0.15;
      } else if (temp >= 35 && temp < 75) {
        logicPhase = "liquid";
        const factor = (temp - 35) / 40;
        speedFactor = 0.6 + factor * 1.4;
        maxLineDist = 100 - factor * 75;
        lineOpacity = 0.25 - factor * 0.25;
      } else {
        logicPhase = "gas";
        const factor = (temp - 75) / 25;
        speedFactor = 2.0 + factor * 2.5;
        maxLineDist = 25 * (1 - factor);
        lineOpacity = 0.05 * (1 - factor);
      }

      // Render bonding web vectors between molecules
      if (maxLineDist > 1) {
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxLineDist) {
              const alpha = (1 - dist / maxLineDist) * lineOpacity;
              ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Vector modifications based on active chemical state
      particles.forEach((p) => {
        if (logicPhase === "solid") {
          // Micro-vibrational tracking near localized lattice slots
          const ax = p.anchorX - p.x;
          const ay = p.anchorY - p.y;
          p.vx += ax * 0.01;
          p.vy += ay * 0.01;
          p.vx = Math.min(Math.max(p.vx, -speedFactor), speedFactor);
          p.vy = Math.min(Math.max(p.vy, -speedFactor), speedFactor);
        } else if (logicPhase === "liquid") {
          // Fluid wavy path modulation matrices
          let angle = Math.atan2(p.vy, p.vx);
          angle += Math.sin(p.x * 0.01 + Date.now() * 0.002 + p.seed) * 0.05;
          p.vx = Math.cos(angle) * speedFactor;
          p.vy = Math.sin(angle) * speedFactor;
        } else if (logicPhase === "gas") {
          // Upward free convection gas escape
          p.vy -= 0.08;
          const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (currentSpeed > speedFactor) {
            p.vx = (p.vx / currentSpeed) * speedFactor;
            p.vy = (p.vy / currentSpeed) * speedFactor;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Container margin boundary constraints
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0) {
          if (logicPhase === "gas")
            p.y = canvas.height; // Gas wraps cleanly from bottom up
          else p.vy *= -1;
        } else if (p.y > canvas.height) {
          if (logicPhase === "gas") p.y = 0;
          else p.vy *= -1;
        }

        // Color shifts corresponding to kinetic values
        let particleColor = `rgba(13, 148, 136, 0.85)`; // Teal Solid
        if (logicPhase === "liquid") particleColor = `rgba(34, 211, 238, 0.9)`; // Cyan Liquid
        if (logicPhase === "gas") particleColor = `rgba(244, 63, 94, 0.95)`; // Rose Gas

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.radius + (logicPhase === "gas" ? 0.5 : 0),
          0,
          Math.PI * 2,
        );
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Leaving this dependency array completely empty keeps the physics animation persistent!

  const getPhaseLabel = () => {
    if (temperature < 35) return "SOLID (LOW KE)";
    if (temperature >= 35 && temperature < 75) return "LIQUID (FLUIDITY)";
    return "GAS (EVAPORATION)";
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none bg-[#020c0d]"
      />

      {/* FIXED HIGH-TECH THERMOMETER OVERLAY GRID */}
      <div className="side-temperature-bar fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center select-none group">
        <div className="mb-4 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 rounded-md py-1 px-2 text-[9px] font-mono tracking-widest text-cyan-400 text-center opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          {getPhaseLabel()}
        </div>
        <div className="relative w-7 h-64 bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700/80 rounded-full flex flex-col items-center justify-end p-1 shadow-2xl">
          <div
            ref={thermometerRef}
            onMouseDown={handleMouseDown}
            className="relative w-full h-full rounded-full bg-slate-950/40 cursor-row-resize overflow-hidden flex flex-col justify-end"
          >
            <div
              className="w-full rounded-b-full transition-all duration-75 ease-out"
              style={{
                height: `${temperature}%`,
                background: `linear-gradient(to top, #06b6d4, #14b8a6, #f43f5e)`,
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-4 px-1 opacity-40 text-[8px] font-mono text-slate-400">
              <div className="flex items-center justify-between">
                <span>—</span>
                <span>G</span>
              </div>
              <div className="flex items-center justify-between">
                <span>—</span>
                <span>L</span>
              </div>
              <div className="flex items-center justify-between">
                <span>—</span>
                <span>S</span>
              </div>
            </div>
          </div>
          <div
            className="w-6 h-6 rounded-full -mt-2 z-10 transition-colors duration-300 shadow-lg border border-slate-700/50"
            style={{
              backgroundColor:
                temperature < 35
                  ? "#06b6d4"
                  : temperature < 75
                    ? "#14b8a6"
                    : "#f43f5e",
            }}
          />
        </div>
        <span className="mt-3 font-mono text-[10px] text-slate-400 tracking-wider">
          {Math.round(temperature)}°C
        </span>
      </div>
      <Styles />
    </>
  );
}

function Styles() {
  return (
    <style>
      {`
    @media screen and (max-width : 1000px){
      .side-temperature-bar{
        display : none;
      }
    }
      `}
    </style>
  );
}
