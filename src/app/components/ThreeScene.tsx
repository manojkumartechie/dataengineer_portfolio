'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const meshRef = useRef<THREE.Mesh>();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Create geometry
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4fd1c5,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting
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

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // GSAP animations
    gsap.to(mesh.rotation, {
      y: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: "none"
    });

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: mount,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        if (meshRef.current) {
          meshRef.current.scale.setScalar(0.5 + progress * 0.5);
          meshRef.current.rotation.z = progress * Math.PI;
        }
      }
    });

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      if (meshRef.current) {
        gsap.to(meshRef.current.rotation, {
          x: y * 0.5,
          y: x * 0.5,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    };

    mount.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (renderer && camera) {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      mount.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-64 relative z-10"
      style={{ minHeight: '300px' }}
    />
  );
}