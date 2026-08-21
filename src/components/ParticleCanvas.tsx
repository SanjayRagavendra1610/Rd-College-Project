import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  density?: number;
  className?: string;
  variant?: 'dark' | 'light';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  symbol?: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  color: string;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  density = 35,
  className = '',
  variant = 'dark'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const symbols = ['₹', '$', '%', '∑', '📈', '⚖️', '🎓', '🏛️', '•', '◆', '▲'];
    const colors = variant === 'dark' 
      ? ['#F6E05E', '#90CDF4', '#68D391', '#ECC94B', '#CBD5E1']
      : ['#B7791F', '#3182CE', '#38A169', '#D69E2E', '#64748B'];

    // Generate particles
    const particles: Particle[] = [];
    const count = Math.min(density, Math.floor((width * height) / 25000));

    for (let i = 0; i < count; i++) {
      const isSymbol = Math.random() < 0.35;
      const baseAlpha = Math.random() * 0.4 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isSymbol ? 12 : Math.random() * 2.5 + 1.2,
        symbol: isSymbol ? symbols[Math.floor(Math.random() * symbols.length)] : undefined,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw constellation connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = variant === 'dark' 
              ? `rgba(214, 158, 46, ${lineAlpha})`
              : `rgba(183, 121, 31, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw particles & symbols
      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Alpha pulse
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 100) * 0.1;

        // Mouse interaction: subtle repulsion/attraction
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const mdx = mouseRef.current.x - p.x;
          const mdy = mouseRef.current.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const force = (1 - mdist / 140) * 0.6;
            p.x -= (mdx / mdist) * force;
            p.y -= (mdy / mdist) * force;
          }
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0.05, Math.min(0.8, p.alpha));

        if (p.symbol) {
          ctx.font = '11px sans-serif';
          ctx.fillStyle = p.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.symbol, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Subtle glowing halo around larger dots
          if (p.radius > 2) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * 0.25;
            ctx.fill();
          }
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
};
