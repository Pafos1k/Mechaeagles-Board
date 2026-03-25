import React, { useMemo, useEffect, useRef } from 'react';

interface NeonParticlesProps {
  count?: number;
  className?: string;
}

export const NeonParticles = React.memo(({ count = 100, className }: NeonParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const particles = useMemo(() => 
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 1.2 + 0.2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.6 + 0.4,
    })), [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
      drawParticles();
    };

    const drawParticles = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      particles.forEach((p) => {
        const x = (p.x / 100) * rect.width;
        const y = (p.y / 100) * rect.height;
        
        ctx.beginPath();
        ctx.arc(x, y, p.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 26, 26, ${p.opacity})`;
        
        if (p.size > 0.8) {
          ctx.shadowBlur = 3;
          ctx.shadowColor = '#ff1a1a';
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className || ''}`}
    />
  );
});

NeonParticles.displayName = 'NeonParticles';
