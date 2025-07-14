'use client';

import { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Memoized component to prevent unnecessary re-renders
const ThreeScene = memo(function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | undefined>(undefined);
  const rendererRef = useRef<THREE.WebGLRenderer | undefined>(undefined);
  const meshRef = useRef<THREE.Mesh | undefined>(undefined);
  const animationIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup with optimized settings
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Disabled for better performance
      powerPreference: "high-performance"
    });
    
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Create optimized geometry
    const geometry = new THREE.IcosahedronGeometry(1, 0); // Reduced detail level
    const material = new THREE.MeshPhongMaterial({
      color: 0x4fd1c5,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Optimized lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 3;

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    meshRef.current = mesh;

    // Optimized animation loop with frame rate limiting
    let lastTime = 0;
    const targetFPS = 30; // Reduced FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (currentTime - lastTime >= frameInterval) {
        if (meshRef.current) {
          meshRef.current.rotation.x += 0.005; // Reduced rotation speed
          meshRef.current.rotation.y += 0.005;
        }
        
        renderer.render(scene, camera);
        lastTime = currentTime;
      }
    };
    animate(0);

    // Simplified GSAP animations
    gsap.to(mesh.rotation, {
      y: Math.PI * 2,
      duration: 15, // Slower rotation
      repeat: -1,
      ease: "none"
    });

    // Optimized scroll-triggered animations
    ScrollTrigger.create({
      trigger: mount,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        if (meshRef.current) {
          meshRef.current.scale.setScalar(0.7 + progress * 0.3);
          meshRef.current.rotation.z = progress * Math.PI * 0.5;
        }
      }
    });

    // Throttled mouse interaction
    let mouseTween: gsap.core.Tween | null = null;
    let isMouseMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseMoving) return;
      isMouseMoving = true;

      requestAnimationFrame(() => {
        const rect = mount.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        
        if (meshRef.current && !mouseTween) {
          mouseTween = gsap.to(meshRef.current.rotation, {
            x: y * 0.3, // Reduced intensity
            y: x * 0.3,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              mouseTween = null;
            }
          });
        }
        
        isMouseMoving = false;
      });
    };

    // Optimized resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (renderer && camera && mount) {
          camera.aspect = mount.clientWidth / mount.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mount.clientWidth, mount.clientHeight);
        }
      }, 100);
    };

    mount.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      // Cleanup
      mount.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mouseTween) {
        mouseTween.kill();
      }
      
      if (renderer && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      }
      
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === mount) trigger.kill();
      });
      
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative z-10"
      style={{ minHeight: '100vh' }}
    />
  );
});

export default ThreeScene;