import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, MathUtils, type Group, type Mesh, type MeshStandardMaterial } from "three";
import { ISLAND_RADIUS } from "../../data/types";

const mat = {
  stone: "#cbb48a",
  stoneDark: "#b89a6e",
  grass: "#7d8f5a",
  grassDeep: "#6a7c4a",
  wood: "#8d6a45",
  cream: "#f4efe4",
};

export function Lights({ map = false }: { map?: boolean }) {
  if (map) {
    return (
      <>
        <color attach="background" args={["#fbf8f1"]} />
        <fog attach="fog" args={["#fbf8f1", 26, 52]} />
        <hemisphereLight args={["#fffaf2", "#e7dcc4", 1.05]} />
        <ambientLight intensity={0.58} />
        <directionalLight position={[8, 16, 6]} intensity={1.12} color="#ffe9c4" />
        <directionalLight position={[-6, 6, -5]} intensity={0.22} color="#d5e0c4" />
      </>
    );
  }
  return (
    <>
      <color attach="background" args={["#f6eee0"]} />
      <fog attach="fog" args={["#f6eee0", 14, 32]} />
      <hemisphereLight args={["#fffaf2", "#e7dcc4", 1.02]} />
      <ambientLight intensity={0.56} />
      <directionalLight position={[7, 14, 6]} intensity={1.08} color="#ffe9c4" />
      <directionalLight position={[-6, 6, -5]} intensity={0.2} color="#d5e0c4" />
    </>
  );
}

export function Ground({ map = false }: { map?: boolean }) {
  if (map) {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]}>
        <circleGeometry args={[16, 72]} />
        <meshStandardMaterial color="#f3ead8" roughness={1} />
      </mesh>
    );
  }
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]}>
        <circleGeometry args={[16, 72]} />
        <meshStandardMaterial color="#f3ead8" roughness={1} />
      </mesh>
    </group>
  );
}

export function IslandBase({
  highlighted,
  pulse,
  children,
}: {
  highlighted: boolean;
  pulse?: boolean;
  children?: ReactNode;
}) {
  const ring = useRef<Mesh>(null);
  const group = useRef<Group>(null);
  const highlight = useRef(new Color("#f28a16"));

  useFrame((_, delta) => {
    if (group.current && pulse) {
      const s = 1 + Math.sin(performance.now() / 180) * 0.02;
      group.current.scale.setScalar(s);
    } else if (group.current) {
      const t = MathUtils.damp(group.current.scale.x, 1, 6, delta);
      group.current.scale.setScalar(t);
    }
    if (ring.current) {
      const material = ring.current.material as MeshStandardMaterial;
      material.opacity = MathUtils.damp(material.opacity, highlighted ? 0.85 : 0, 8, delta);
      material.emissive = highlight.current;
      material.emissiveIntensity = highlighted ? 0.45 : 0.04;
    }
  });

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <circleGeometry args={[ISLAND_RADIUS * 1.18, 36]} />
        <meshBasicMaterial color="#c4b090" transparent opacity={0.28} />
      </mesh>
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[ISLAND_RADIUS, ISLAND_RADIUS + 0.16, 0.58, 48]} />
        <meshStandardMaterial color={mat.stoneDark} roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[ISLAND_RADIUS * 0.98, ISLAND_RADIUS, 0.16, 48]} />
        <meshStandardMaterial color={mat.stone} roughness={0.88} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[ISLAND_RADIUS * 0.955, ISLAND_RADIUS * 0.955, 0.1, 48]} />
        <meshStandardMaterial color={mat.grass} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.23, 0]}>
        <cylinderGeometry args={[ISLAND_RADIUS * 0.82, ISLAND_RADIUS * 0.82, 0.04, 40]} />
        <meshStandardMaterial color={mat.grassDeep} roughness={1} />
      </mesh>
      <mesh ref={ring} position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[ISLAND_RADIUS * 0.9, ISLAND_RADIUS * 1.06, 56]} />
        <meshStandardMaterial color="#f28a16" transparent opacity={0} emissive="#f28a16" roughness={0.45} />
      </mesh>
      {children}
    </group>
  );
}

export function Tree({
  position,
  scale = 1,
  color = "#5f7344",
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.045, 0.07, 0.4, 7]} />
        <meshStandardMaterial color="#7a5a3a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.26, 12, 12]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
      <mesh position={[0.12, 0.62, 0.06]}>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color="#6d8450" roughness={0.95} />
      </mesh>
      <mesh position={[-0.1, 0.66, -0.05]}>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshStandardMaterial color="#7a9258" roughness={0.95} />
      </mesh>
    </group>
  );
}

export function Bush({ position, color = "#6f8750" }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.15, 10, 10]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
      <mesh position={[0.08, 0.04, 0.04]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#7d9458" roughness={0.95} />
      </mesh>
    </group>
  );
}

export function Flower({ position, color = "#e67a4a" }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.01, 0.012, 0.14, 5]} />
        <meshStandardMaterial color="#6a7c4a" />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
    </group>
  );
}

export function Lantern({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.022, 0.028, 0.4, 6]} />
        <meshStandardMaterial color="#6b5340" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color="#ffb25a" emissive="#ff8a1a" emissiveIntensity={1.15} />
      </mesh>
    </group>
  );
}

export function Bench({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.24, 0]}>
        <boxGeometry args={[0.58, 0.06, 0.2]} />
        <meshStandardMaterial color={mat.wood} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.34, -0.08]}>
        <boxGeometry args={[0.58, 0.16, 0.04]} />
        <meshStandardMaterial color="#a67c52" roughness={0.85} />
      </mesh>
      <mesh position={[-0.22, 0.16, 0.04]}>
        <boxGeometry args={[0.05, 0.16, 0.05]} />
        <meshStandardMaterial color="#6b5340" />
      </mesh>
      <mesh position={[0.22, 0.16, 0.04]}>
        <boxGeometry args={[0.05, 0.16, 0.05]} />
        <meshStandardMaterial color="#6b5340" />
      </mesh>
    </group>
  );
}

export function RoundTable({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.06, 16]} />
        <meshStandardMaterial color={mat.wood} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.16, 8]} />
        <meshStandardMaterial color="#6b5340" />
      </mesh>
    </group>
  );
}

export function Book({ position, rotation = 0, color = "#f4efe4" }: { position: [number, number, number]; rotation?: number; color?: string }) {
  return (
    <mesh position={position} rotation={[0.08, rotation, 0.04]}>
      <boxGeometry args={[0.12, 0.025, 0.16]} />
      <meshStandardMaterial color={color} roughness={0.75} />
    </mesh>
  );
}

export function PathDisc({
  position,
  radius = 0.28,
  color = "#d7c9a4",
}: {
  position: [number, number, number];
  radius?: number;
  color?: string;
}) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[radius, 16]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}
