import type { TerritoryVisualProps } from "../../data/types";
import { Lantern, PathDisc } from "../scene/primitives";
import { TopicHotspot } from "../scene/TopicHotspot";

function Building({
  color,
  w = 0.52,
  h = 0.68,
  d = 0.42,
}: {
  color: string;
  w?: number;
  h?: number;
  d?: number;
}) {
  return (
    <group>
      <mesh position={[0, h / 2 + 0.2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.82} />
      </mesh>
      <mesh position={[0, h + 0.26, 0]}>
        <boxGeometry args={[w + 0.05, 0.08, d + 0.05]} />
        <meshStandardMaterial color="#8d6a45" roughness={0.88} />
      </mesh>
      <mesh position={[0.12, h * 0.55, d / 2 + 0.005]}>
        <boxGeometry args={[0.08, 0.1, 0.01]} />
        <meshStandardMaterial color="#c9e0ee" emissive="#dceef6" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

export function MastersCity({
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
      <PathDisc position={[0, 0.205, 0]} radius={0.42} color="#d9c7a4" />
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.07, 0.11, 0.16, 12]} />
        <meshStandardMaterial color="#b9c8d4" roughness={0.55} />
      </mesh>
      <Lantern position={[0.38, 0.2, 0.32]} />
      <Lantern position={[-0.38, 0.2, -0.28]} />
      <PathDisc position={[0.55, 0.205, 0]} radius={0.14} />
      <PathDisc position={[-0.55, 0.205, 0]} radius={0.14} />

      <TopicHotspot id="masters-lab" label="ЛАБОРАТОРИЯ" position={[-1.15, 0, -0.7]} {...hot("masters-lab")}>
        <Building color="#e6eef2" h={0.7} />
        <mesh position={[0.16, 0.92, 0]}>
          <cylinderGeometry args={[0.035, 0.045, 0.2, 8]} />
          <meshStandardMaterial color="#8ea4b5" />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="masters-workshop" label="МАСТЕРСКАЯ" position={[1.15, 0, -0.7]} {...hot("masters-workshop")}>
        <Building color="#c48a3a" h={0.52} w={0.58} />
        <mesh position={[0.26, 0.4, 0.12]} rotation={[0, 0, Math.PI / 5]}>
          <boxGeometry args={[0.05, 0.24, 0.05]} />
          <meshStandardMaterial color="#6b5340" />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="masters-studio" label="СТУДИЯ" position={[-1.15, 0, 0.75]} {...hot("masters-studio")}>
        <Building color="#efe0c8" h={0.58} />
        <mesh position={[0, 0.92, 0]}>
          <coneGeometry args={[0.1, 0.16, 4]} />
          <meshStandardMaterial color="#d9795c" />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="masters-stage" label="СЦЕНА" position={[0.1, 0, 1.2]} {...hot("masters-stage")}>
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.08, 16]} />
          <meshStandardMaterial color="#d9c7a4" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.4, -0.2]}>
          <boxGeometry args={[0.5, 0.24, 0.05]} />
          <meshStandardMaterial color="#7d8150" roughness={0.85} />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="masters-tech" label="ТЕХНОПАРК" position={[1.15, 0, 0.75]} {...hot("masters-tech")}>
        <Building color="#8ea4b5" h={0.78} w={0.48} />
        <mesh position={[0, 1.08, 0]}>
          <boxGeometry args={[0.16, 0.1, 0.16]} />
          <meshStandardMaterial color="#b7d4e6" emissive="#9fd0ea" emissiveIntensity={0.3} />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="masters-business" label="ДЕЛОВОЙ КВАРТАЛ" position={[0.05, 0, -1.25]} {...hot("masters-business")}>
        <Building color="#cbb48a" h={0.86} w={0.46} d={0.38} />
        <mesh position={[0.2, 0.52, 0.1]}>
          <boxGeometry args={[0.2, 0.46, 0.2]} />
          <meshStandardMaterial color="#b88955" roughness={0.85} />
        </mesh>
      </TopicHotspot>
    </group>
  );
}
