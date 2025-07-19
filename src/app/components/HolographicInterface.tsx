'use client';

import { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface HolographicInterfaceProps {
  activeSection: string;
}

const HolographicInterface = memo(function HolographicInterface({ activeSection }: HolographicInterfaceProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Create holographic data structures
    const createHologram = (geometry: THREE.BufferGeometry, position: THREE.Vector3, color: number) => {
      const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      scene.add(mesh);
      
      // Add glow effect
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide
      });
      const glowMesh = new THREE.Mesh(geometry, glowMaterial);
      glowMesh.scale.multiplyScalar(1.1);
      glowMesh.position.copy(position);
      scene.add(glowMesh);
      
      return mesh;
    };

    // Create various data structure holograms
    const geometries = [
      new THREE.IcosahedronGeometry(0.5, 1),
      new THREE.OctahedronGeometry(0.6, 0),
      new THREE.TetrahedronGeometry(0.4, 0),
      new THREE.DodecahedronGeometry(0.5, 0),
      new THREE.TorusGeometry(0.4, 0.1, 8, 16)
    ];

    const colors = [0x00f5ff, 0xff006e, 0x8b5cf6, 0x00ff41, 0xffd700];
    
    const meshes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[i % geometries.length];
      const color = colors[i % colors.length];
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4 - 2
      );
      
      const mesh = createHologram(geometry, position, color);
      meshes.push(mesh);
    }

    meshesRef.current = meshes;
    camera.position.z = 3;

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 + index * 0.001;
        mesh.rotation.y += 0.01 + index * 0.001;
        mesh.rotation.z += 0.005;
        
        // Floating animation
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
      });
      
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      meshes.forEach((mesh, index) => {
        const factor = (index + 1) * 0.1;
        gsap.to(mesh.rotation, {
          x: y * factor,
          y: x * factor,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    };

    // Resize handler
    const handleResize = () => {
      if (renderer && camera && mount) {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      }
    };

    mount.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      mount.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (renderer && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      }
      
      meshes.forEach(mesh => {
        scene.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(material => material.dispose());
        } else if (mesh.material) {
          mesh.material.dispose();
        }
      });
    };
  }, []);

  // React to section changes
  useEffect(() => {
    const meshes = meshesRef.current;
    if (!meshes.length) return;

    // Animate holograms based on active section
    const sectionColors = {
      home: 0x00f5ff,
      about: 0xff006e,
      projects: 0x8b5cf6,
      skills: 0x00ff41,
      contact: 0xffd700
    };

    const targetColor = sectionColors[activeSection as keyof typeof sectionColors] || 0x00f5ff;
    
    meshes.forEach((mesh, index) => {
      const delay = index * 0.1;
      
      gsap.to(mesh.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.5,
        delay: delay,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });

      // Change material color
      if (mesh.material && 'color' in mesh.material) {
        gsap.to(mesh.material.color, {
          r: ((targetColor >> 16) & 255) / 255,
          g: ((targetColor >> 8) & 255) / 255,
          b: (targetColor & 255) / 255,
          duration: 1,
          delay: delay,
          ease: "power2.inOut"
        });
      }
    });
  }, [activeSection]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-5 pointer-events-none"
      style={{ 
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)'
      }}
    />
  );
});

export default HolographicInterface;