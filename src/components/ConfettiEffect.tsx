import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  targetX: number;
  targetY: number;
  shape: 'square' | 'circle' | 'strip';
}

export const ConfettiEffect: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = ['#ECC94B', '#48BB78', '#4299E1', '#ED8936', '#9F7AEA', '#F56565', '#38B2AC'];
    const shapes: ('square' | 'circle' | 'strip')[] = ['square', 'circle', 'strip'];
    const newPieces: ConfettiPiece[] = [];

    for (let i = 0; i < 45; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const velocity = Math.random() * 220 + 80;
      newPieces.push({
        id: i,
        x: 0,
        y: 0,
        targetX: Math.cos(angle) * velocity,
        targetY: Math.sin(angle) * velocity - (Math.random() * 80),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 720 - 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }

    setPieces(newPieces);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-20">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            opacity: 1, 
            scale: 0, 
            x: 0, 
            y: 0, 
            rotate: 0 
          }}
          animate={{ 
            opacity: [1, 1, 0], 
            scale: [0, 1.2, 0.8], 
            x: p.targetX, 
            y: p.targetY + 80, 
            rotate: p.rotation 
          }}
          transition={{ 
            duration: 1.4, 
            ease: [0.25, 1, 0.5, 1],
            times: [0, 0.7, 1]
          }}
          style={{
            position: 'absolute',
            width: p.shape === 'strip' ? p.size * 2 : p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'strip' ? '2px' : '3px'
          }}
        />
      ))}
    </div>
  );
};
