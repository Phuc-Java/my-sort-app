import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Box, Torus, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Main central sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#14b8a6"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Orbiting elements */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <Box args={[0.4, 0.4, 0.4]} position={[-2.5, 1, 0]}>
          <meshStandardMaterial color="#a855f7" metalness={0.9} roughness={0.1} />
        </Box>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Torus args={[0.5, 0.2, 16, 32]} position={[2.5, -0.5, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial color="#22d3ee" metalness={0.9} roughness={0.1} />
        </Torus>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.3, 32, 32]} position={[-1.5, -1.5, 1]}>
          <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
        </Sphere>
      </Float>

      <Float speed={2.2} rotationIntensity={2} floatIntensity={1}>
        <Box args={[0.25, 0.25, 0.25]} position={[1.8, 1.8, -0.5]}>
          <meshStandardMaterial color="#22c55e" metalness={0.9} roughness={0.1} />
        </Box>
      </Float>

      {/* Array visualization cubes */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) => (
        <Float key={i} speed={1.5 + i * 0.2} floatIntensity={0.5}>
          <Box args={[0.15, 0.15, 0.15]} position={[x, -2.2, 0]}>
            <meshStandardMaterial 
              color={`hsl(${175 + i * 20}, 80%, 50%)`} 
              metalness={0.7} 
              roughness={0.3} 
            />
          </Box>
        </Float>
      ))}
    </group>
  );
}

function Particles() {
  const count = 100;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#14b8a6" transparent opacity={0.6} />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#14b8a6" />
        
        <FloatingShapes />
        <Particles />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
