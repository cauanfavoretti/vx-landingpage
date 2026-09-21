"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

const ORANGE = new THREE.Color("#ff8a3d");
const DEEP = new THREE.Color("#b83f09");
const BLUE = new THREE.Color("#3b87ff");

/** PRNG determinístico — mesma nuvem de partículas em todo render/SSR. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleField({ count = 1400 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    const rand = mulberry32(0x5f3759d);

    for (let i = 0; i < count; i++) {
      // Distribuição em disco com profundidade — sensação de "campo de dados"
      const radius = 1.6 + Math.pow(rand(), 0.6) * 6.4;
      const angle = rand() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (rand() - 0.5) * 5.2;
      pos[i * 3 + 2] = Math.sin(angle) * radius * 0.7 - 1.2;

      // 82% laranja (marca), 18% azul como contraponto frio
      const t = rand();
      if (t > 0.82) c.copy(BLUE).lerp(ORANGE, rand() * 0.3);
      else c.copy(DEEP).lerp(ORANGE, rand());
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    p.rotation.y += delta * 0.055;
    const { x, y } = state.pointer;
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, -y * 0.14, 0.04);
    p.position.x = THREE.MathUtils.lerp(p.position.x, x * 0.4, 0.04);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.92}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CoreOrb(props: ThreeElements["mesh"]) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.16;
    mesh.current.rotation.z += delta * 0.05;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.035;
    mesh.current.scale.setScalar(s);
  });
  return (
    <mesh ref={mesh} {...props}>
      <icosahedronGeometry args={[1.65, 2]} />
      <meshBasicMaterial
        color="#ff6b1a"
        wireframe
        transparent
        opacity={0.14}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroField() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 52 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <ParticleField />
      <CoreOrb position={[0, 0, -1]} />
    </Canvas>
  );
}
