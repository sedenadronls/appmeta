import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export function Background3D({ darkMode = false }: { darkMode?: boolean }) {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  const bgColor = darkMode ? "#2A251D" : "#DED2B6";
  const sparkleColor = darkMode ? "#DED2B6" : "#A79277";

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={darkMode ? 0.3 : 0.5} />
      <directionalLight position={[10, 10, 5]} intensity={darkMode ? 0.5 : 1} castShadow />
      <Environment preset={darkMode ? "night" : "city"} />
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={sphereRef} scale={1.8}>
          <icosahedronGeometry args={[1, 64]} />
          <MeshDistortMaterial
            color={bgColor}
            envMapIntensity={darkMode ? 0.3 : 0.8}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
            metalness={0.2}
            roughness={0.4}
            distort={0.4}
            speed={1.5}
          />
        </mesh>
      </Float>

      <Sparkles count={80} scale={12} size={2} speed={0.4} opacity={0.3} color={bgColor} />
      <Sparkles count={40} scale={8} size={4} speed={0.2} opacity={0.1} color={sparkleColor} />
    </>
  );
}
