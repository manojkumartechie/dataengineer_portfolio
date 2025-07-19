'use client';

import { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';

interface PipelineNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  type: 'source' | 'transform' | 'sink';
  color: string;
  active: boolean;
}

interface DataPacket {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  path: PipelineNode[];
  currentNodeIndex: number;
  color: string;
}

const DataPipeline = memo(function DataPipeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<PipelineNode[]>([]);
  const packetsRef = useRef<DataPacket[]>([]);
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
      initPipeline();
    };

    const initPipeline = () => {
      const nodes: PipelineNode[] = [
        // Data Sources
        {
          id: 'kafka',
          x: 100,
          y: canvas.height / 2 - 100,
          width: 120,
          height: 60,
          label: 'KAFKA\nSTREAM',
          type: 'source',
          color: '#00f5ff',
          active: true
        },
        {
          id: 'database',
          x: 100,
          y: canvas.height / 2 + 40,
          width: 120,
          height: 60,
          label: 'DATABASE\nBATCH',
          type: 'source',
          color: '#00ff41',
          active: true
        },
        
        // Transform Layer
        {
          id: 'spark',
          x: canvas.width / 2 - 60,
          y: canvas.height / 2 - 80,
          width: 140,
          height: 80,
          label: 'SPARK\nPROCESSING',
          type: 'transform',
          color: '#ff006e',
          active: true
        },
        {
          id: 'flink',
          x: canvas.width / 2 - 60,
          y: canvas.height / 2 + 20,
          width: 140,
          height: 80,
          label: 'FLINK\nSTREAM',
          type: 'transform',
          color: '#8b5cf6',
          active: true
        },
        
        // Data Sinks
        {
          id: 'warehouse',
          x: canvas.width - 220,
          y: canvas.height / 2 - 100,
          width: 120,
          height: 60,
          label: 'DATA\nWAREHOUSE',
          type: 'sink',
          color: '#ffd700',
          active: true
        },
        {
          id: 'lake',
          x: canvas.width - 220,
          y: canvas.height / 2 + 40,
          width: 120,
          height: 60,
          label: 'DATA\nLAKE',
          type: 'sink',
          color: '#ff8c00',
          active: true
        }
      ];

      nodesRef.current = nodes;
      packetsRef.current = [];
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createDataPacket = () => {
      const sourceNodes = nodesRef.current.filter(n => n.type === 'source');
      const transformNodes = nodesRef.current.filter(n => n.type === 'transform');
      const sinkNodes = nodesRef.current.filter(n => n.type === 'sink');
      
      const source = sourceNodes[Math.floor(Math.random() * sourceNodes.length)];
      const transform = transformNodes[Math.floor(Math.random() * transformNodes.length)];
      const sink = sinkNodes[Math.floor(Math.random() * sinkNodes.length)];
      
      const path = [source, transform, sink];
      const colors = ['#00f5ff', '#ff006e', '#00ff41', '#8b5cf6', '#ffd700'];
      
      return {
        id: Date.now() + Math.random(),
        x: source.x + source.width / 2,
        y: source.y + source.height / 2,
        targetX: source.x + source.width / 2,
        targetY: source.y + source.height / 2,
        progress: 0,
        path,
        currentNodeIndex: 0,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    };

    const animate = () => {
      timeRef.current += 0.02;
      
      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const packets = packetsRef.current;

      // Create new data packets periodically
      if (Math.random() < 0.03) {
        packets.push(createDataPacket());
      }

      // Draw pipeline connections
      const connectionPairs = [
        ['kafka', 'spark'],
        ['database', 'flink'],
        ['spark', 'warehouse'],
        ['spark', 'lake'],
        ['flink', 'warehouse'],
        ['flink', 'lake']
      ];

      connectionPairs.forEach(([fromId, toId]) => {
        const fromNode = nodes.find(n => n.id === fromId);
        const toNode = nodes.find(n => n.id === toId);
        
        if (fromNode && toNode) {
          // Draw connection pipeline
          const gradient = ctx.createLinearGradient(
            fromNode.x + fromNode.width, fromNode.y + fromNode.height / 2,
            toNode.x, toNode.y + toNode.height / 2
          );
          gradient.addColorStop(0, fromNode.color + '40');
          gradient.addColorStop(1, toNode.color + '40');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 4;
          ctx.beginPath();
          
          // Draw curved pipeline
          const startX = fromNode.x + fromNode.width;
          const startY = fromNode.y + fromNode.height / 2;
          const endX = toNode.x;
          const endY = toNode.y + toNode.height / 2;
          
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
          
          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(midX, midY - 20, endX, endY);
          ctx.stroke();
          
          // Draw flow indicators
          const flowCount = 3;
          for (let i = 0; i < flowCount; i++) {
            const t = (timeRef.current + i / flowCount) % 1;
            const flowX = startX + (endX - startX) * t;
            const flowY = startY + (endY - startY) * t - 20 * Math.sin(Math.PI * t);
            
            ctx.beginPath();
            ctx.arc(flowX, flowY, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${1 - t})`;
            ctx.fill();
          }
        }
      });

      // Draw pipeline nodes
      nodes.forEach(node => {
        // Node activity pulse
        const pulse = Math.sin(timeRef.current * 2) * 0.1 + 0.9;
        
        // Draw node shadow/glow
        const shadowSize = 20;
        const gradient = ctx.createRadialGradient(
          node.x + node.width / 2, node.y + node.height / 2, 0,
          node.x + node.width / 2, node.y + node.height / 2, shadowSize
        );
        gradient.addColorStop(0, node.color + '40');
        gradient.addColorStop(1, node.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          node.x - shadowSize / 2,
          node.y - shadowSize / 2,
          node.width + shadowSize,
          node.height + shadowSize
        );

        // Draw node body
        ctx.fillStyle = `rgba(0, 0, 0, 0.8)`;
        ctx.fillRect(node.x, node.y, node.width, node.height);
        
        // Draw node border
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2 * pulse;
        ctx.strokeRect(node.x, node.y, node.width, node.height);
        
        // Draw node label
        ctx.fillStyle = node.color;
        ctx.font = '12px Courier New';
        ctx.textAlign = 'center';
        const lines = node.label.split('\n');
        lines.forEach((line, index) => {
          ctx.fillText(
            line,
            node.x + node.width / 2,
            node.y + node.height / 2 + (index - lines.length / 2 + 0.5) * 14
          );
        });

        // Draw activity indicators
        if (node.active) {
          const indicators = 4;
          for (let i = 0; i < indicators; i++) {
            const angle = (timeRef.current + i / indicators * Math.PI * 2) % (Math.PI * 2);
            const indicatorX = node.x + node.width / 2 + Math.cos(angle) * (node.width / 2 + 15);
            const indicatorY = node.y + node.height / 2 + Math.sin(angle) * (node.height / 2 + 15);
            
            ctx.beginPath();
            ctx.arc(indicatorX, indicatorY, 3, 0, Math.PI * 2);
            ctx.fillStyle = node.color + '80';
            ctx.fill();
          }
        }
      });

      // Update and draw data packets
      packets.forEach((packet, index) => {
        if (packet.currentNodeIndex >= packet.path.length - 1) {
          // Remove completed packets
          packets.splice(index, 1);
          return;
        }

        const currentNode = packet.path[packet.currentNodeIndex];
        const nextNode = packet.path[packet.currentNodeIndex + 1];
        
        if (nextNode) {
          // Update packet position
          packet.progress += 0.02;
          
          if (packet.progress >= 1) {
            packet.progress = 0;
            packet.currentNodeIndex++;
            packet.x = currentNode.x + currentNode.width / 2;
            packet.y = currentNode.y + currentNode.height / 2;
          } else {
            const startX = currentNode.x + currentNode.width;
            const startY = currentNode.y + currentNode.height / 2;
            const endX = nextNode.x;
            const endY = nextNode.y + nextNode.height / 2;
            
            packet.x = startX + (endX - startX) * packet.progress;
            packet.y = startY + (endY - startY) * packet.progress;
          }
          
          // Draw packet
          const size = 6;
          ctx.beginPath();
          ctx.arc(packet.x, packet.y, size, 0, Math.PI * 2);
          ctx.fillStyle = packet.color;
          ctx.fill();
          
          // Draw packet glow
          ctx.beginPath();
          ctx.arc(packet.x, packet.y, size * 2, 0, Math.PI * 2);
          ctx.fillStyle = packet.color + '40';
          ctx.fill();
          
          // Draw packet trail
          for (let i = 1; i <= 5; i++) {
            const trailProgress = Math.max(0, packet.progress - i * 0.1);
            const trailX = startX + (endX - startX) * trailProgress;
            const trailY = startY + (endY - startY) * trailProgress;
            
            ctx.beginPath();
            ctx.arc(trailX, trailY, size - i, 0, Math.PI * 2);
            ctx.fillStyle = packet.color + Math.floor(255 / (i + 1)).toString(16).padStart(2, '0');
            ctx.fill();
          }
        }
      });

      // Draw metrics and labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '14px Courier New';
      ctx.textAlign = 'left';
      ctx.fillText(`Active Packets: ${packets.length}`, 20, 40);
      ctx.fillText(`Throughput: ${(packets.length * 1000).toLocaleString()} events/sec`, 20, 60);
      ctx.fillText(`Latency: ${Math.floor(Math.random() * 50 + 10)}ms`, 20, 80);

      packetsRef.current = packets;
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
      className="fixed inset-0 z-5 pointer-events-none opacity-70"
    />
  );
});

export default DataPipeline;