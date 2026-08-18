import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, MathUtils, type Mesh, type MeshStandardMaterial } from "three";

const R = 1.62;

function Stone({ color = "#c4b08a", roughness = 0.9 }: { color?: string; roughness?: number }) {
  return <meshStandardMaterial color={color} roughness={roughness} />;
}

export function OrganicBase({
  highlighted,
  grass = "#7d8f58",
  sand = "#dcc9a4",
}: {
  highlighted: boolean;
  grass?: string;
  sand?: string;
}) {
  const ring = useRef<Mesh>(null);
  const glow = useRef(new Color("#f28a16"));

  useFrame((_, delta) => {
    if (!ring.current) return;
    const material = ring.current.material as MeshStandardMaterial;
    material.opacity = MathUtils.damp(material.opacity, highlighted ? 0.72 : 0, 8, delta);
    material.emissive = glow.current;
    material.emissiveIntensity = highlighted ? 0.4 : 0.03;
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.42, 0]}>
        <circleGeometry args={[R * 1.22, 32]} />
        <meshBasicMaterial color="#cbb896" transparent opacity={0.22} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[R * 0.96, R * 1.08, 0.62, 48]} />
        <Stone color="#b89a6e" roughness={0.94} />
      </mesh>
      <mesh position={[0.22, -0.14, -0.18]}>
        <cylinderGeometry args={[R * 0.42, R * 0.5, 0.5, 8]} />
        <Stone color="#c4b08a" roughness={0.93} />
      </mesh>
      <mesh position={[-0.28, -0.16, 0.22]}>
        <cylinderGeometry args={[R * 0.38, R * 0.46, 0.48, 8]} />
        <Stone color="#bca47a" roughness={0.93} />
      </mesh>
      <mesh position={[0.08, 0.16, 0.06]}>
        <cylinderGeometry args={[R * 0.92, R * 0.98, 0.12, 48]} />
        <meshStandardMaterial color={sand} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[R * 0.88, R * 0.9, 0.1, 48]} />
        <meshStandardMaterial color={grass} roughness={0.98} />
      </mesh>
      <mesh position={[-0.35, 0.24, -0.3]}>
        <cylinderGeometry args={[0.42, 0.48, 0.08, 8]} />
        <meshStandardMaterial color="#6f864c" roughness={0.98} />
      </mesh>
      <mesh position={[0.4, 0.24, 0.28]}>
        <cylinderGeometry args={[0.36, 0.4, 0.07, 8]} />
        <meshStandardMaterial color="#879b68" roughness={0.98} />
      </mesh>
      <mesh ref={ring} position={[0, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[R * 0.86, R * 1.08, 40]} />
        <meshStandardMaterial color="#f28a16" transparent opacity={0} emissive="#f28a16" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Canopy({
  position,
  scale = 1,
  color = "#5e7343",
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.045, 0.07, 0.44, 6]} />
        <meshStandardMaterial color="#7a5a3a" roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <sphereGeometry args={[0.28, 14, 14]} />
        <meshStandardMaterial color={color} roughness={0.97} />
      </mesh>
      <mesh position={[0.14, 0.62, 0.08]}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color="#6d8450" roughness={0.97} />
      </mesh>
      <mesh position={[-0.12, 0.68, -0.06]}>
        <sphereGeometry args={[0.17, 12, 12]} />
        <meshStandardMaterial color="#7a9258" roughness={0.97} />
      </mesh>
    </group>
  );
}

function Shrub({ position, color = "#6f8750" }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.13, 10, 10]} />
        <meshStandardMaterial color={color} roughness={0.97} />
      </mesh>
      <mesh position={[0.07, 0.04, 0.03]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#7d9458" roughness={0.97} />
      </mesh>
    </group>
  );
}

function Lamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.02, 0.026, 0.44, 6]} />
        <meshStandardMaterial color="#6b5340" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.46, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color="#ffc27a" emissive="#f28a16" emissiveIntensity={0.85} roughness={0.4} />
      </mesh>
    </group>
  );
}

export function MapBridges({ highlighted }: { highlighted: boolean }) {
  return (
    <group>
      <OrganicBase highlighted={highlighted} grass="#748a56" />
      <mesh position={[0, 0.14, 0]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.42, 0.06, 2.2]} />
        <meshStandardMaterial color="#6f9aaa" transparent opacity={0.55} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.34, 0]} rotation={[0, 0.15, Math.PI / 2]}>
        <torusGeometry args={[0.46, 0.08, 10, 22, Math.PI]} />
        <meshStandardMaterial color="#c9b089" roughness={0.86} />
      </mesh>
      <mesh position={[-0.48, 0.36, -0.08]}>
        <boxGeometry args={[0.18, 0.14, 0.3]} />
        <Stone color="#b89a6e" />
      </mesh>
      <mesh position={[0.48, 0.36, 0.08]}>
        <boxGeometry args={[0.18, 0.14, 0.3]} />
        <Stone color="#b89a6e" />
      </mesh>
      <mesh position={[-0.72, 0.26, -0.55]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <circleGeometry args={[0.32, 12]} />
        <meshStandardMaterial color="#d7c9a4" roughness={1} />
      </mesh>
      <mesh position={[0.7, 0.26, 0.55]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <circleGeometry args={[0.3, 12]} />
        <meshStandardMaterial color="#d2c09a" roughness={1} />
      </mesh>
      <Canopy position={[-1.05, 0.22, -0.85]} />
      <Canopy position={[1.02, 0.22, 0.9]} scale={0.85} color="#6a8048" />
      <Canopy position={[-0.95, 0.22, 0.85]} scale={0.7} />
      <Shrub position={[1.05, 0.28, -0.7]} />
      <Shrub position={[-1.15, 0.28, 0.15]} />
      <Lamp position={[-0.55, 0.22, -0.42]} />
      <Lamp position={[0.55, 0.22, 0.42]} />
      <Lamp position={[0.35, 0.22, -0.7]} />
      <Lamp position={[-0.32, 0.22, 0.72]} />
    </group>
  );
}

export function MapHealth({ highlighted }: { highlighted: boolean }) {
  return (
    <group>
      <OrganicBase highlighted={highlighted} grass="#88a066" sand="#e4d4b2" />
      <group position={[-0.45, 0, -0.35]}>
        <mesh position={[0, 0.48, 0]}>
          <boxGeometry args={[0.72, 0.58, 0.58]} />
          <meshStandardMaterial color="#f3e6d0" roughness={0.88} />
        </mesh>
        <mesh position={[0, 0.86, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.62, 0.38, 4]} />
          <meshStandardMaterial color="#7d9a5c" roughness={0.86} />
        </mesh>
        <mesh position={[0.37, 0.46, 0.08]}>
          <boxGeometry args={[0.04, 0.22, 0.16]} />
          <meshStandardMaterial color="#d7c09a" />
        </mesh>
        <mesh position={[0.12, 0.48, 0.3]}>
          <boxGeometry args={[0.16, 0.14, 0.02]} />
          <meshStandardMaterial color="#c9e4f0" emissive="#dceef6" emissiveIntensity={0.18} />
        </mesh>
        <mesh position={[0.42, 0.92, -0.12]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#f7e7b8" emissive="#ffe7a0" emissiveIntensity={0.4} />
        </mesh>
      </group>
      <mesh position={[0.55, 0.26, -0.55]}>
        <boxGeometry args={[0.55, 0.08, 0.55]} />
        <meshStandardMaterial color="#c4965c" roughness={0.82} />
      </mesh>
      <mesh position={[0.48, 0.34, -0.48]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color="#d45b45" />
      </mesh>
      <mesh position={[0.66, 0.33, -0.62]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#e8c14a" />
      </mesh>
      <mesh position={[0.58, 0.34, -0.42]}>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 10]} />
        <meshStandardMaterial color="#d7ecf4" roughness={0.3} />
      </mesh>
      <mesh position={[0.7, 0.24, 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 16]} />
        <meshStandardMaterial color="#8faf68" roughness={1} />
      </mesh>
      <mesh position={[0.82, 0.32, 0.58]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#f28a16" roughness={0.55} />
      </mesh>
      <mesh position={[0.52, 0.32, 0.48]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.09, 0.02, 8, 16]} />
        <meshStandardMaterial color="#514536" />
      </mesh>
      <mesh position={[0.15, 0.5, -1.05]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 20]} />
        <meshStandardMaterial color="#f7f2e8" roughness={0.65} />
      </mesh>
      <mesh position={[0.15, 0.54, -1.05]}>
        <boxGeometry args={[0.015, 0.12, 0.015]} />
        <meshStandardMaterial color="#514536" />
      </mesh>
      <mesh position={[-0.85, 0.28, 0.7]}>
        <boxGeometry args={[0.42, 0.08, 0.26]} />
        <meshStandardMaterial color="#c9a36a" roughness={0.84} />
      </mesh>
      <mesh position={[-0.85, 0.42, 0.66]}>
        <boxGeometry args={[0.22, 0.16, 0.03]} />
        <meshStandardMaterial color="#9bb4c4" emissive="#c5dce8" emissiveIntensity={0.18} />
      </mesh>
      <Canopy position={[1.15, 0.22, -0.05]} scale={0.8} />
      <Canopy position={[-1.12, 0.22, 0.15]} scale={0.72} color="#6a8048" />
      <Shrub position={[0.1, 0.28, 1.05]} />
      <Lamp position={[0.05, 0.22, 0.15]} />
      <Lamp position={[0.75, 0.22, -0.05]} />
    </group>
  );
}

export function MapGarden({ highlighted }: { highlighted: boolean }) {
  return (
    <group>
      <OrganicBase highlighted={highlighted} grass="#6f864c" />
      <mesh position={[0, 0.55, 0.05]}>
        <cylinderGeometry args={[0.12, 0.18, 0.9, 8]} />
        <meshStandardMaterial color="#7a5a3a" roughness={0.92} />
      </mesh>
      <mesh position={[0, 1.15, 0.05]}>
        <sphereGeometry args={[0.78, 16, 16]} />
        <meshStandardMaterial color="#4f6a38" roughness={0.97} />
      </mesh>
      <mesh position={[0.38, 1.22, 0.22]}>
        <sphereGeometry args={[0.46, 14, 14]} />
        <meshStandardMaterial color="#5f7844" roughness={0.97} />
      </mesh>
      <mesh position={[-0.34, 1.28, -0.16]}>
        <sphereGeometry args={[0.42, 14, 14]} />
        <meshStandardMaterial color="#6d8450" roughness={0.97} />
      </mesh>
      <mesh position={[0.05, 1.42, 0.05]}>
        <sphereGeometry args={[0.32, 12, 12]} />
        <meshStandardMaterial color="#7a9258" roughness={0.97} />
      </mesh>
      <mesh position={[0, 0.28, 0.62]}>
        <boxGeometry args={[1.15, 0.07, 0.38]} />
        <meshStandardMaterial color="#a67c52" roughness={0.82} />
      </mesh>
      {[-0.4, -0.13, 0.13, 0.4].map((x) => (
        <mesh key={x} position={[x, 0.34, 0.55]}>
          <cylinderGeometry args={[0.04, 0.04, 0.05, 8]} />
          <meshStandardMaterial color="#f4efe4" roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[-0.7, 0.26, -0.7]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.28, 12]} />
        <meshStandardMaterial color="#8a9d62" roughness={1} />
      </mesh>
      {[
        [-0.8, -0.62],
        [-0.62, -0.82],
        [0.85, -0.7],
        [1.0, 0.55],
        [-1.05, 0.5],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.32, z]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={i % 2 ? "#e67a4a" : "#f2c38a"} roughness={0.7} />
        </mesh>
      ))}
      <Canopy position={[1.12, 0.22, -0.35]} scale={0.62} />
      <Canopy position={[-1.15, 0.22, 0.35]} scale={0.58} />
      <Shrub position={[0.95, 0.28, 0.85]} />
      <Lamp position={[-0.45, 0.22, 0.85]} />
      <Lamp position={[0.48, 0.22, 0.85]} />
      <Lamp position={[0.7, 0.22, -0.35]} />
    </group>
  );
}

export function MapMaze({ highlighted }: { highlighted: boolean }) {
  const outer = Array.from({ length: 18 }, (_, i) => {
    if (i === 0 || i === 1) return null;
    const a = (i / 18) * Math.PI * 2 + 0.2;
    return (
      <mesh key={`o${i}`} position={[Math.cos(a) * 1.38, 0.42, Math.sin(a) * 1.38]} rotation={[0, -a, 0]}>
        <boxGeometry args={[0.5, 0.46, 0.14]} />
        <meshStandardMaterial color={i % 2 ? "#5f7844" : "#4e6a38"} roughness={0.96} />
      </mesh>
    );
  });
  const inner = Array.from({ length: 12 }, (_, i) => {
    if (i === 2 || i === 8) return null;
    const a = (i / 12) * Math.PI * 2 + 0.8;
    return (
      <mesh key={`i${i}`} position={[Math.cos(a) * 0.82, 0.4, Math.sin(a) * 0.82]} rotation={[0, -a, 0]}>
        <boxGeometry args={[0.42, 0.4, 0.13]} />
        <meshStandardMaterial color="#6d8450" roughness={0.96} />
      </mesh>
    );
  });

  return (
    <group>
      <OrganicBase highlighted={highlighted} grass="#6a7f48" sand="#d4c39a" />
      {outer}
      {inner}
      <mesh position={[0.55, 0.38, 0]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.14, 0.38, 0.7]} />
        <meshStandardMaterial color="#587244" roughness={0.96} />
      </mesh>
      <mesh position={[-0.2, 0.38, -0.35]} rotation={[0, 1.1, 0]}>
        <boxGeometry args={[0.14, 0.38, 0.55]} />
        <meshStandardMaterial color="#5f7844" roughness={0.96} />
      </mesh>
      <mesh position={[0, 0.36, 1.48]}>
        <boxGeometry args={[0.42, 0.38, 0.1]} />
        <meshStandardMaterial color="#b88955" roughness={0.84} />
      </mesh>
      <mesh position={[-0.22, 0.5, 1.48]}>
        <boxGeometry args={[0.06, 0.28, 0.06]} />
        <meshStandardMaterial color="#8d6a45" />
      </mesh>
      <mesh position={[0.22, 0.5, 1.48]}>
        <boxGeometry args={[0.06, 0.28, 0.06]} />
        <meshStandardMaterial color="#8d6a45" />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 12]} />
        <meshStandardMaterial color="#d9c7a4" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color="#f28a16" emissive="#ff9a2a" emissiveIntensity={0.28} roughness={0.45} />
      </mesh>
      <Lamp position={[0.12, 0.22, 1.22]} />
    </group>
  );
}

function TownBuilding({
  position,
  color,
  w,
  h,
  d,
  roof = "#8d6a45",
  roofKind = "box",
}: {
  position: [number, number, number];
  color: string;
  w: number;
  h: number;
  d: number;
  roof?: string;
  roofKind?: "box" | "cone" | "hip";
}) {
  return (
    <group position={position}>
      <mesh position={[0, h / 2 + 0.22, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.82} />
      </mesh>
      {roofKind === "cone" ? (
        <mesh position={[0, h + 0.38, 0]}>
          <coneGeometry args={[Math.max(w, d) * 0.55, 0.22, 4]} />
          <meshStandardMaterial color={roof} roughness={0.86} />
        </mesh>
      ) : roofKind === "hip" ? (
        <mesh position={[0, h + 0.36, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[Math.max(w, d) * 0.62, 0.26, 4]} />
          <meshStandardMaterial color={roof} roughness={0.86} />
        </mesh>
      ) : (
        <mesh position={[0, h + 0.28, 0]}>
          <boxGeometry args={[w + 0.06, 0.08, d + 0.06]} />
          <meshStandardMaterial color={roof} roughness={0.86} />
        </mesh>
      )}
      <mesh position={[0.08, h * 0.55, d / 2 + 0.01]}>
        <boxGeometry args={[0.07, 0.09, 0.01]} />
        <meshStandardMaterial color="#cfe4ee" emissive="#dceef6" emissiveIntensity={0.16} />
      </mesh>
    </group>
  );
}

export function MapCity({ highlighted }: { highlighted: boolean }) {
  return (
    <group>
      <OrganicBase highlighted={highlighted} grass="#7a8c5c" sand="#d7c4a0" />
      <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.32, 16]} />
        <meshStandardMaterial color="#d9c7a4" roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.07, 0.1, 0.16, 12]} />
        <meshStandardMaterial color="#b7c6d2" roughness={0.5} />
      </mesh>
      <TownBuilding position={[-0.85, 0, -0.55]} color="#e7eef2" w={0.48} h={0.62} d={0.4} roof="#9aa8b4" roofKind="box" />
      <mesh position={[-0.7, 0.95, -0.55]}>
        <cylinderGeometry args={[0.03, 0.04, 0.18, 8]} />
        <meshStandardMaterial color="#8ea4b5" />
      </mesh>
      <TownBuilding position={[0.88, 0, -0.52]} color="#c48a3a" w={0.55} h={0.42} d={0.46} roof="#8d6a45" roofKind="hip" />
      <TownBuilding position={[-0.88, 0, 0.62]} color="#efe0c8" w={0.46} h={0.5} d={0.4} roof="#d9795c" roofKind="cone" />
      <mesh position={[0.05, 0.26, 0.95]}>
        <cylinderGeometry args={[0.32, 0.32, 0.08, 16]} />
        <meshStandardMaterial color="#d9c7a4" roughness={0.86} />
      </mesh>
      <mesh position={[0.05, 0.42, 0.78]}>
        <boxGeometry args={[0.46, 0.22, 0.05]} />
        <meshStandardMaterial color="#7d8150" roughness={0.84} />
      </mesh>
      <TownBuilding position={[0.9, 0, 0.58]} color="#8ea4b5" w={0.42} h={0.72} d={0.38} roof="#b7d4e6" />
      <mesh position={[0.9, 1.08, 0.58]}>
        <boxGeometry args={[0.16, 0.1, 0.16]} />
        <meshStandardMaterial color="#b7d4e6" emissive="#9fd0ea" emissiveIntensity={0.25} />
      </mesh>
      <TownBuilding position={[0.08, 0, -1.05]} color="#cbb48a" w={0.4} h={0.78} d={0.34} roof="#b88955" />
      <mesh position={[0.26, 0.55, -0.95]}>
        <boxGeometry args={[0.18, 0.42, 0.18]} />
        <meshStandardMaterial color="#b88955" roughness={0.84} />
      </mesh>
      <Lamp position={[0.32, 0.22, 0.28]} />
      <Lamp position={[-0.32, 0.22, -0.22]} />
    </group>
  );
}

export function MapHarbor({ highlighted }: { highlighted: boolean }) {
  return (
    <group>
      <OrganicBase highlighted={highlighted} grass="#7d8b62" sand="#e2d3b4" />
      <mesh position={[0.55, 0.16, 0.55]} rotation={[-Math.PI / 2, 0, 0.3]} scale={[1.15, 1, 1]}>
        <circleGeometry args={[0.82, 24]} />
        <meshStandardMaterial color="#7da4b6" transparent opacity={0.78} roughness={0.22} />
      </mesh>
      <group position={[-0.15, 0, -0.2]}>
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.14, 0.2, 1.28, 14]} />
          <meshStandardMaterial color="#f7f2e8" roughness={0.84} />
        </mesh>
        <mesh position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.155, 0.155, 0.12, 14]} />
          <meshStandardMaterial color="#c56a18" roughness={0.78} />
        </mesh>
        <mesh position={[0, 1.38, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 12]} />
          <meshStandardMaterial color="#c56a18" />
        </mesh>
        <mesh position={[0, 1.52, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 10]} />
          <meshStandardMaterial color="#ffe7a0" emissive="#ffb25a" emissiveIntensity={1.2} roughness={0.35} />
        </mesh>
        <mesh position={[0, 1.68, 0]}>
          <coneGeometry args={[0.14, 0.16, 8]} />
          <meshStandardMaterial color="#514536" roughness={0.8} />
        </mesh>
      </group>
      <mesh position={[-0.95, 0.36, 0.45]}>
        <boxGeometry args={[0.48, 0.32, 0.4]} />
        <meshStandardMaterial color="#efe0c8" roughness={0.88} />
      </mesh>
      <mesh position={[-0.95, 0.58, 0.45]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.4, 0.22, 4]} />
        <meshStandardMaterial color="#8d6a45" roughness={0.86} />
      </mesh>
      <mesh position={[0.55, 0.24, 0.95]}>
        <boxGeometry args={[0.7, 0.06, 0.16]} />
        <meshStandardMaterial color="#8d6a45" roughness={0.84} />
      </mesh>
      <mesh position={[0.82, 0.22, 0.55]} rotation={[0.05, 0.6, 0.12]}>
        <boxGeometry args={[0.34, 0.08, 0.14]} />
        <meshStandardMaterial color="#a67c52" roughness={0.8} />
      </mesh>
      <mesh position={[0.95, 0.28, 0.42]}>
        <boxGeometry args={[0.08, 0.16, 0.08]} />
        <meshStandardMaterial color="#efe0c8" />
      </mesh>
      <mesh position={[0.72, 0.3, -0.55]}>
        <boxGeometry args={[0.42, 0.08, 0.16]} />
        <meshStandardMaterial color="#8d6a45" />
      </mesh>
      <Canopy position={[-1.15, 0.22, -0.75]} scale={0.7} />
      <Shrub position={[1.12, 0.28, -0.85]} />
      <Lamp position={[-0.55, 0.22, 0.15]} />
      <Lamp position={[0.35, 0.22, -0.55]} />
    </group>
  );
}

const MAP_VISUALS = {
  bridges: MapBridges,
  health: MapHealth,
  traditions: MapGarden,
  knowledge: MapMaze,
  masters: MapCity,
  harbor: MapHarbor,
} as const;

export function MapTerritoryVisual({
  id,
  highlighted,
}: {
  id: string;
  highlighted: boolean;
}) {
  const Visual = MAP_VISUALS[id as keyof typeof MAP_VISUALS];
  if (!Visual) return null;
  return <Visual highlighted={highlighted} />;
}
