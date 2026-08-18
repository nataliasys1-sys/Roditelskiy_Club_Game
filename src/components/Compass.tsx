import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group } from "three";
import { getTerritory } from "../data/territories";
import { useJourney } from "../state/JourneyContext";

export function Compass() {
  const group = useRef<Group>(null);
  const { hoveredTerritoryId, isMapView, reducedMotion } = useJourney();
  const island = hoveredTerritoryId ? getTerritory(hoveredTerritoryId) : undefined;

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = island ? Math.atan2(island.mapPosition[0], island.mapPosition[2]) : 0;
    if (reducedMotion) {
      group.current.rotation.y = isMapView ? target : 0;
      return;
    }
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, target, 4.5, delta);
  });

  if (!isMapView) return null;

  return (
    <group ref={group} position={[0, 0.18, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]}>
        <circleGeometry args={[1.55, 40]} />
        <meshBasicMaterial color="#c4b08a" transparent opacity={0.22} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[1.28, 1.36, 0.16, 48]} />
        <meshStandardMaterial color="#c8883a" roughness={0.45} metalness={0.22} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[1.18, 1.22, 0.08, 48]} />
        <meshStandardMaterial color="#f0d7a4" roughness={0.4} metalness={0.18} emissive="#f28a16" emissiveIntensity={0.12} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.17, 0]}>
        <circleGeometry args={[1.08, 48]} />
        <meshStandardMaterial color="#fff6e4" roughness={0.55} emissive="#ffe0a8" emissiveIntensity={0.18} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.175, 0]}>
        <ringGeometry args={[0.96, 1.08, 48]} />
        <meshStandardMaterial color="#e39b3a" emissive="#f28a16" emissiveIntensity={0.28} roughness={0.4} />
      </mesh>
      {Array.from({ length: 72 }).map((_, i) => {
        const a = (i / 72) * Math.PI * 2;
        const major = i % 6 === 0;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.88, 0.19, Math.cos(a) * 0.88]} rotation={[0, a, 0]}>
            <boxGeometry args={[major ? 0.035 : 0.018, 0.02, major ? 0.14 : 0.07]} />
            <meshStandardMaterial color={major ? "#c56a18" : "#e8d2a4"} roughness={0.5} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.28, 0.22]} rotation={[0.55, 0, 0]}>
        <coneGeometry args={[0.13, 0.52, 4]} />
        <meshStandardMaterial color="#f28a16" emissive="#ff8a16" emissiveIntensity={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.28, -0.22]} rotation={[Math.PI - 0.55, 0, 0]}>
        <coneGeometry args={[0.13, 0.52, 4]} />
        <meshStandardMaterial color="#fff8ea" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.12, 16]} />
        <meshStandardMaterial color="#f0d7a4" roughness={0.35} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.34, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#f28a16" emissive="#ffb25a" emissiveIntensity={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
}
