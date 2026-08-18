import type { TerritoryVisualProps } from "../../data/types";
import { Bench, Book, Bush, Flower, Lantern, PathDisc, Tree } from "../scene/primitives";
import { TopicHotspot } from "../scene/TopicHotspot";

function ArchBridge() {
  return (
    <group>
      <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.7, 0.32]} />
        <meshStandardMaterial color="#7aa0b8" transparent opacity={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.52, 0.09, 10, 20, Math.PI]} />
        <meshStandardMaterial color="#c4b18a" roughness={0.88} />
      </mesh>
      <mesh position={[-0.52, 0.28, 0]}>
        <boxGeometry args={[0.16, 0.12, 0.28]} />
        <meshStandardMaterial color="#b89a6e" roughness={0.9} />
      </mesh>
      <mesh position={[0.52, 0.28, 0]}>
        <boxGeometry args={[0.16, 0.12, 0.28]} />
        <meshStandardMaterial color="#b89a6e" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function UnderstandingBridges({
  detailLevel,
  selectedTopicId,
  hoveredTopicId,
  onTopicHover,
  onTopicSelect,
}: TerritoryVisualProps) {
  const hot = (id: string) => ({
    active: selectedTopicId === id,
    hovered: hoveredTopicId === id,
    detailLevel,
    onHover: onTopicHover,
    onSelect: onTopicSelect,
  });

  return (
    <group>
      <Tree position={[-1.72, 0.2, -1.15]} />
      <Tree position={[1.62, 0.2, -1.05]} scale={0.88} />
      <Tree position={[-1.55, 0.2, 1.32]} scale={0.78} />
      <Bush position={[1.62, 0.26, 1.42]} />
      <Bush position={[-0.7, 0.26, 1.55]} />
      <Flower position={[0.85, 0.2, -1.45]} color="#e67a4a" />
      <Flower position={[-1.55, 0.2, 0.15]} color="#f2c38a" />
      <Lantern position={[-0.52, 0.2, -0.52]} />
      <Lantern position={[0.52, 0.2, 0.52]} />
      <Lantern position={[0.68, 0.2, -0.68]} />
      <PathDisc position={[-0.7, 0.205, -0.35]} radius={0.22} />
      <PathDisc position={[0.7, 0.205, 0.4]} radius={0.22} />

      <TopicHotspot id="bridges-trust" label="ДОВЕРИЕ" position={[0, 0, 0.1]} {...hot("bridges-trust")}>
        <ArchBridge />
      </TopicHotspot>

      <TopicHotspot id="bridges-emotions" label="ЭМОЦИИ РЕБЁНКА" position={[-1.15, 0, -0.85]} {...hot("bridges-emotions")}>
        <Bench position={[0, 0, 0]} />
        <Book position={[-0.12, 0.29, 0.04]} color="#e8d4b5" />
        <Book position={[0.1, 0.3, 0.02]} rotation={0.4} color="#c47b5a" />
      </TopicHotspot>

      <TopicHotspot id="bridges-conflicts" label="КОНФЛИКТЫ" position={[1.2, 0, 0.7]} {...hot("bridges-conflicts")}>
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.62, 0.07, 0.4]} />
          <meshStandardMaterial color="#b88955" roughness={0.85} />
        </mesh>
        <Book position={[-0.14, 0.3, 0.06]} />
        <Book position={[0.16, 0.3, -0.05]} rotation={0.5} color="#d9c7a4" />
      </TopicHotspot>

      <TopicHotspot id="bridges-boundaries" label="ГРАНИЦЫ" position={[1.05, 0, -0.9]} {...hot("bridges-boundaries")}>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.5, 0.22, 0.06]} />
          <meshStandardMaterial color="#d7c9a4" roughness={0.9} />
        </mesh>
        <mesh position={[-0.22, 0.22, 0.08]}>
          <boxGeometry args={[0.05, 0.28, 0.05]} />
          <meshStandardMaterial color="#8d6a45" />
        </mesh>
        <mesh position={[0.22, 0.22, 0.08]}>
          <boxGeometry args={[0.05, 0.28, 0.05]} />
          <meshStandardMaterial color="#8d6a45" />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="bridges-teens" label="ПОДРОСТКИ" position={[-1.15, 0, 0.75]} {...hot("bridges-teens")}>
        <PathDisc position={[0, 0.205, 0]} radius={0.38} color="#cbb48a" />
        <Lantern position={[0.28, 0.2, 0.12]} />
      </TopicHotspot>

      <TopicHotspot id="bridges-values" label="СЕМЕЙНЫЕ ЦЕННОСТИ" position={[0.15, 0, 1.35]} {...hot("bridges-values")}>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.055, 0.075, 0.22, 8]} />
          <meshStandardMaterial color="#f28a16" emissive="#ff9a2a" emissiveIntensity={0.55} />
        </mesh>
        <Flower position={[-0.18, 0.2, 0.12]} />
        <Flower position={[0.2, 0.2, -0.08]} color="#f4efe4" />
      </TopicHotspot>
    </group>
  );
}
