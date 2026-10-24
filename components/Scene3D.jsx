"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";

function Orbiter({ radius, speed, offset, color }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.3) * 0.7, Math.sin(t) * radius);
    ref.current.rotation.x = ref.current.rotation.y = t;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.2]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.25} />
    </mesh>
  );
}

function Rig() {
  const group = useRef(), ring = useRef(), cage = useRef();
  useFrame((state, dt) => {
    // the whole group leans toward the mouse (parallax)
    group.current.rotation.y += (state.pointer.x * 0.7 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-state.pointer.y * 0.5 - group.current.rotation.x) * 0.05;
    ring.current.rotation.z += dt * 0.4;
    cage.current.rotation.y -= dt * 0.18;
    cage.current.rotation.x += dt * 0.1;
  });
  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.25, 12]} />
          <MeshDistortMaterial color="#FFB43B" distort={0.42} speed={2.2} roughness={0.15} metalness={0.55} />
        </mesh>
      </Float>
      <mesh ref={cage}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#6C7CFF" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh ref={ring} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[2.9, 0.03, 16, 120]} />
        <meshBasicMaterial color="#FFB43B" />
      </mesh>
      <Orbiter radius={2.5} speed={0.8} offset={0} color="#FF6B8B" />
      <Orbiter radius={3.1} speed={0.55} offset={2} color="#3DDC97" />
      <Orbiter radius={2.8} speed={0.7} offset={4} color="#61DAFB" />
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={2} />
      <pointLight position={[-5, -3, 2]} intensity={30} color="#6C7CFF" />
      <Stars radius={40} depth={30} count={900} factor={3} fade speed={1} />
      <Rig />
    </Canvas>
  );
}
