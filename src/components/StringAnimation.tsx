import React, { useEffect, useRef } from 'react';

interface StringAnimationProps {
  state?: 'idle' | 'sending' | 'receiving' | 'connected';
  speed?: number;
}

export function StringAnimation({ state = 'idle', speed = 2 }: StringAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const isDark = document.documentElement.classList.contains('dark');

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      ctx.strokeStyle = isDark ? '#F5F5F5' : '#1A1A1A';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      ctx.beginPath();
      
      const centerY = height / 2;
      const amplitude = state === 'idle' ? 5 : state === 'sending' ? 15 : state === 'receiving' ? 20 : 3;
      const frequency = state === 'sending' ? 0.03 : state === 'receiving' ? 0.02 : 0.01;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * frequency + time * speed) * amplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      time += 0.05;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [state, speed]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={100}
      className="w-full h-full"
      style={{ maxWidth: '400px', maxHeight: '100px' }}
    />
  );
}
