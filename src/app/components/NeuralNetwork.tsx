'use client';

import { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';

interface Node {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  connections: number[];
  pulse: number;
}

interface Connection {
  from: Node;
  to: Node;
  strength: number;
  active: boolean;
}

const NeuralNetwork = memo(function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationIdRef = useRef<number>();
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNetwork();
    };

    const initNetwork = () => {
      const nodes: Node[] = [];
      const colors = ['#00f5ff', '#ff006e', '#8b5cf6', '#00ff41', '#ffd700'];
      
      // Create nodes in a neural network pattern
      const layers = 4;
      const nodesPerLayer = [6, 8, 6, 4];
      
      let nodeId = 0;
      for (let layer = 0; layer < layers; layer++) {
        const layerNodes = nodesPerLayer[layer];
        const startY = (canvas.height - (layerNodes - 1) * 80) / 2;
        const x = (layer + 1) * (canvas.width / (layers + 1));
        
        for (let i = 0; i < layerNodes; i++) {
          nodes.push({
            id: nodeId++,
            x: x,
            y: startY + i * 80,
            radius: Math.random() * 8 + 12,
            color: colors[Math.floor(Math.random() * colors.length)],
            connections: [],
            pulse: Math.random()
          });
        }
      }

      // Create connections between layers
      const connections: Connection[] = [];
      for (let layer = 0; layer < layers - 1; layer++) {
        const currentLayerNodes = nodes.filter(n => {
          const layerIndex = Math.floor(n.x / (canvas.width / (layers + 1)));
          return layerIndex === layer + 1;
        });
        
        const nextLayerNodes = nodes.filter(n => {
          const layerIndex = Math.floor(n.x / (canvas.width / (layers + 1)));
          return layerIndex === layer + 2;
        });

        currentLayerNodes.forEach(from => {
          nextLayerNodes.forEach(to => {
            if (Math.random() > 0.3) { // 70% connection probability
              connections.push({
                from,
                to,
                strength: Math.random(),
                active: Math.random() > 0.5
              });
              from.connections.push(to.id);
            }
          });
        });
      }

      nodesRef.current = nodes;
      connectionsRef.current = connections;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      timeRef.current += 0.02;
      
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const connections = connectionsRef.current;

      // Draw connections with data flow animation
      connections.forEach((connection, index) => {
        const { from, to } = connection;
        const alpha = connection.active ? 0.6 : 0.2;
        
        // Animate connection activation
        if (Math.random() < 0.01) {
          connection.active = !connection.active;
        }

        // Draw connection line
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, `rgba(0, 245, 255, ${alpha})`);
        gradient.addColorStop(1, `rgba(138, 92, 246, ${alpha})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = connection.strength * 3 + 1;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        // Draw data packets traveling along connections
        if (connection.active) {
          const progress = (Math.sin(timeRef.current * 2 + index * 0.5) + 1) / 2;
          const packetX = from.x + (to.x - from.x) * progress;
          const packetY = from.y + (to.y - from.y) * progress;
          
          ctx.beginPath();
          ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, 0.8)`;
          ctx.fill();
          
          // Trailing effect
          for (let i = 1; i <= 5; i++) {
            const trailProgress = Math.max(0, progress - i * 0.05);
            const trailX = from.x + (to.x - from.x) * trailProgress;
            const trailY = from.y + (to.y - from.y) * trailProgress;
            const trailAlpha = 0.8 / i;
            
            ctx.beginPath();
            ctx.arc(trailX, trailY, 3 - i * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${trailAlpha})`;
            ctx.fill();
          }
        }
      });

      // Draw nodes
      nodes.forEach((node, index) => {
        // Pulse animation
        node.pulse += 0.05;
        const pulseScale = 1 + Math.sin(node.pulse) * 0.2;
        const radius = node.radius * pulseScale;

        // Draw node glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2);
        gradient.addColorStop(0, node.color + '40');
        gradient.addColorStop(1, node.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Draw node inner glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff40';
        ctx.fill();

        // Draw activity indicators
        if (node.connections.length > 0) {
          const activityLevel = Math.sin(timeRef.current + index) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2 * activityLevel);
          ctx.strokeStyle = node.color + '60';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Draw data labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '12px Courier New';
      ctx.textAlign = 'center';
      
      const labels = ['INPUT', 'PROCESSING', 'ANALYSIS', 'OUTPUT'];
      labels.forEach((label, index) => {
        const x = (index + 1) * (canvas.width / (labels.length + 1));
        ctx.fillText(label, x, 30);
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
      className="fixed inset-0 z-5 pointer-events-none opacity-60"
    />
  );
});

export default NeuralNetwork;