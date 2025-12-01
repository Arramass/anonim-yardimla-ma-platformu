import React, { useEffect, useRef } from 'react';

interface Bottle {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  bobOffset: number;
}

interface BeachAnimationProps {
  bottles?: number;
  onBottleClick?: (index: number) => void;
}

export function BeachAnimation({ bottles = 0, onBottleClick }: BeachAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bottlesRef = useRef<Bottle[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains('dark');
    const strokeColor = isDark ? '#F5F5F5' : '#1A1A1A';
    const sandColor = isDark ? '#2A2A2A' : '#F5F5F5';
    
    // Initialize bottles
    while (bottlesRef.current.length < bottles) {
      bottlesRef.current.push({
        x: Math.random() * canvas.width,
        y: -50,
        rotation: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
        bobOffset: Math.random() * Math.PI * 2,
      });
    }

    const drawSketchLine = (startX: number, startY: number, endX: number, endY: number, segments = 20) => {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const x = startX + (endX - startX) * t + (Math.random() - 0.5) * 2;
        const y = startY + (endY - startY) * t + (Math.random() - 0.5) * 2;
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
    };

    const drawBeach = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.fillStyle = isDark ? '#0A0A0A' : '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Draw sky (upper half)
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;

      // Horizon line (sketchy)
      const horizonY = height * 0.4;
      drawSketchLine(0, horizonY, width, horizonY, 30);

      // Draw waves in the sea
      for (let i = 0; i < 4; i++) {
        const waveY = horizonY + 20 + i * 15;
        const offset = Math.sin(time * 0.001 + i * 0.5) * 10;
        
        ctx.beginPath();
        for (let x = 0; x < width; x += 10) {
          const y = waveY + Math.sin(x * 0.05 + time * 0.002 + i * 0.3) * 3 + offset;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x + (Math.random() - 0.5), y + (Math.random() - 0.5));
          }
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw sand
      const sandY = height * 0.65;
      ctx.fillStyle = sandColor;
      ctx.beginPath();
      ctx.moveTo(0, sandY);
      for (let x = 0; x < width; x += 5) {
        const y = sandY + Math.sin(x * 0.1) * 2 + (Math.random() - 0.5) * 2;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Draw sand texture (sketch style)
      ctx.strokeStyle = strokeColor;
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * width;
        const y = sandY + Math.random() * (height - sandY);
        const length = 5 + Math.random() * 10;
        drawSketchLine(x, y, x + length, y, 3);
      }
      ctx.globalAlpha = 1;

      // Draw waterline (where water meets sand)
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = sandY + Math.sin(x * 0.1 + time * 0.003) * 5;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
        }
      }
      ctx.stroke();

      // Draw some pebbles
      ctx.fillStyle = strokeColor;
      ctx.globalAlpha = 0.2;
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * width;
        const y = sandY + 10 + Math.random() * (height - sandY - 10);
        const radius = 2 + Math.random() * 4;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawBottle = (bottle: Bottle, index: number, time: number) => {
      const bobbing = Math.sin(time * 0.003 + bottle.bobOffset) * 8;
      const currentY = bottle.y + bobbing;
      
      ctx.save();
      ctx.translate(bottle.x, currentY);
      ctx.rotate(bottle.rotation + Math.sin(time * 0.002) * 0.1);
      
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      
      // Bottle body (sketch style)
      ctx.beginPath();
      ctx.moveTo(-8, -15);
      ctx.lineTo(-8 + (Math.random() - 0.5), 10 + (Math.random() - 0.5));
      ctx.lineTo(8 + (Math.random() - 0.5), 10 + (Math.random() - 0.5));
      ctx.lineTo(8, -15);
      ctx.closePath();
      ctx.stroke();
      
      // Bottle neck
      ctx.beginPath();
      ctx.moveTo(-4, -15);
      ctx.lineTo(-4, -22);
      ctx.lineTo(4, -22);
      ctx.lineTo(4, -15);
      ctx.stroke();
      
      // Cork
      ctx.fillStyle = strokeColor;
      ctx.fillRect(-3, -24, 6, 3);
      
      // Message inside (wavy line)
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(-5, -5);
      for (let i = 0; i < 3; i++) {
        ctx.lineTo(-5 + i * 3, -5 + (i % 2) * 4);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
      
      ctx.restore();

      // Store clickable area
      return {
        x: bottle.x - 15,
        y: currentY - 30,
        width: 30,
        height: 45,
        index,
      };
    };

    const clickableAreas: Array<{x: number, y: number, width: number, height: number, index: number}> = [];

    const animate = () => {
      const time = timeRef.current;
      timeRef.current += 16;

      drawBeach(time);

      // Update and draw bottles
      clickableAreas.length = 0;
      const waterlineY = canvas.height * 0.65;
      
      bottlesRef.current.forEach((bottle, index) => {
        // Move bottles down until they reach the beach
        if (bottle.y < waterlineY - 30) {
          bottle.y += bottle.speed;
          bottle.rotation += 0.01;
        } else {
          bottle.y = waterlineY - 30;
          bottle.rotation = (Math.random() - 0.5) * 0.3;
        }

        const area = drawBottle(bottle, index, time);
        clickableAreas.push(area);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle clicks
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      for (const area of clickableAreas) {
        if (
          x >= area.x &&
          x <= area.x + area.width &&
          y >= area.y &&
          y <= area.y + area.height
        ) {
          onBottleClick?.(area.index);
          break;
        }
      }
    };

    canvas.addEventListener('click', handleClick);
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('click', handleClick);
    };
  }, [bottles, onBottleClick]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      className="w-full h-full cursor-pointer"
      style={{ maxWidth: '600px', maxHeight: '400px' }}
    />
  );
}
