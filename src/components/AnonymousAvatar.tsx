import React from 'react';

interface AnonymousAvatarProps {
  seed: number;
  size?: 'small' | 'medium' | 'large';
  trustLevel?: number;
  className?: string;
}

const shapes = ['circle', 'triangle', 'square', 'diamond', 'hexagon', 'star'];
const colors = ['#E0E0E0', '#4A90D9', '#4CAF50', '#FFA726', '#AB47BC', '#EF5350'];

export function AnonymousAvatar({ seed, size = 'medium', trustLevel = 0, className = '' }: AnonymousAvatarProps) {
  const shapeIndex = seed % shapes.length;
  const colorIndex = trustLevel > 0 ? (seed % (colors.length - 1)) + 1 : 0;
  const shape = shapes[shapeIndex];
  const color = colors[colorIndex];

  const sizeMap = {
    small: 40,
    medium: 60,
    large: 100
  };

  const dimension = sizeMap[size];

  const renderShape = () => {
    const half = dimension / 2;
    
    switch (shape) {
      case 'circle':
        return <circle cx={half} cy={half} r={half * 0.7} fill={color} />;
      
      case 'triangle':
        return (
          <polygon
            points={`${half},${half * 0.4} ${half * 0.3},${half * 1.6} ${half * 1.7},${half * 1.6}`}
            fill={color}
          />
        );
      
      case 'square':
        return <rect x={half * 0.3} y={half * 0.3} width={half * 1.4} height={half * 1.4} fill={color} />;
      
      case 'diamond':
        return (
          <polygon
            points={`${half},${half * 0.3} ${half * 1.7},${half} ${half},${half * 1.7} ${half * 0.3},${half}`}
            fill={color}
          />
        );
      
      case 'hexagon':
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 2;
          const x = half + half * 0.7 * Math.cos(angle);
          const y = half + half * 0.7 * Math.sin(angle);
          hexPoints.push(`${x},${y}`);
        }
        return <polygon points={hexPoints.join(' ')} fill={color} />;
      
      case 'star':
        const starPoints = [];
        for (let i = 0; i < 10; i++) {
          const angle = (Math.PI / 5) * i - Math.PI / 2;
          const radius = i % 2 === 0 ? half * 0.7 : half * 0.35;
          const x = half + radius * Math.cos(angle);
          const y = half + radius * Math.sin(angle);
          starPoints.push(`${x},${y}`);
        }
        return <polygon points={starPoints.join(' ')} fill={color} />;
      
      default:
        return <circle cx={half} cy={half} r={half * 0.7} fill={color} />;
    }
  };

  return (
    <div className={className}>
      <svg width={dimension} height={dimension} viewBox={`0 0 ${dimension} ${dimension}`}>
        {renderShape()}
      </svg>
    </div>
  );
}
