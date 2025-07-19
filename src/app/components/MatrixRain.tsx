'use client';

import { useRef, useEffect, memo } from 'react';

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

const MatrixRain = memo(function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const animationIdRef = useRef<number>();

  // Matrix characters for data engineering theme
  const characters = [
    '0', '1', 'SELECT', 'FROM', 'WHERE', 'JOIN', 'INSERT', 'UPDATE', 'DELETE',
    'KAFKA', 'SPARK', 'HADOOP', 'PYTHON', 'SQL', 'ETL', 'API', 'JSON', 'CSV',
    'AWS', 'AZURE', 'GCP', 'DOCKER', 'K8S', 'FLINK', 'STORM', 'AIRFLOW',
    'REDIS', 'MONGO', 'POSTGRES', 'ELASTIC', 'KIBANA', 'GRAFANA',
    '{', '}', '[', ']', '(', ')', '<', '>', '/', '\\', '|', '-', '_', '=',
    'DATA', 'PIPELINE', 'STREAM', 'BATCH', 'REAL-TIME', 'ANALYTICS'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize drops
    const numDrops = Math.floor(canvas.width / 30);
    dropsRef.current = Array.from({ length: numDrops }, (_, i) => ({
      x: i * 30,
      y: Math.random() * canvas.height,
      speed: Math.random() * 3 + 1,
      length: Math.random() * 20 + 10,
      opacity: Math.random() * 0.8 + 0.2
    }));

    const animate = () => {
      // Create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw drops
      dropsRef.current.forEach((drop) => {
        const charactersInDrop = Math.floor(drop.length);
        
        for (let i = 0; i < charactersInDrop; i++) {
          const char = characters[Math.floor(Math.random() * characters.length)];
          const y = drop.y - i * 20;
          
          // Skip if outside canvas
          if (y < 0 || y > canvas.height) continue;

          // Calculate opacity based on position in drop (brightest at front)
          const alpha = drop.opacity * (1 - i / charactersInDrop);
          
          // Different colors for different types of data
          let color;
          if (char.length > 3) {
            // Keywords get special colors
            if (['SELECT', 'FROM', 'WHERE', 'JOIN', 'INSERT', 'UPDATE', 'DELETE'].includes(char)) {
              color = `rgba(0, 255, 65, ${alpha})`; // Green for SQL
            } else if (['KAFKA', 'SPARK', 'HADOOP', 'FLINK', 'STORM'].includes(char)) {
              color = `rgba(0, 245, 255, ${alpha})`; // Cyan for big data tools
            } else if (['AWS', 'AZURE', 'GCP', 'DOCKER', 'K8S'].includes(char)) {
              color = `rgba(138, 92, 246, ${alpha})`; // Purple for cloud/containers
            } else {
              color = `rgba(255, 0, 110, ${alpha})`; // Pink for other keywords
            }
          } else {
            color = `rgba(0, 255, 65, ${alpha})`; // Green for symbols/numbers
          }

          ctx.fillStyle = color;
          ctx.font = `${Math.min(16, char.length > 3 ? 10 : 16)}px 'Courier New', monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(char, drop.x, y);
        }

        // Update drop position
        drop.y += drop.speed;

        // Reset drop when it goes off screen
        if (drop.y > canvas.height + drop.length * 20) {
          drop.y = -drop.length * 20;
          drop.x = Math.random() * canvas.width;
          drop.speed = Math.random() * 3 + 1;
        }
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'rgba(0, 0, 0, 0.95)' }}
    />
  );
});

export default MatrixRain;