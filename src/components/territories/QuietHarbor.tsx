import type { TerritoryVisualProps } from "../../data/types";
import { Bench, Book, Bush, Flower, Lantern, PathDisc, Tree } from "../scene/primitives";
import { TopicHotspot } from "../scene/TopicHotspot";

function Lighthouse() {
  return (
    <group>
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.15, 0.21, 1.18, 14]} />
        <meshStandardMaterial color="#f7f2e8" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.12, 14]} />
        <meshStandardMaterial color="#c56a18" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.1, 12]} />
        <meshStandardMaterial color="#c56a18" />
      </mesh>
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.18, 10]} />
        <meshStandardMaterial color="#ffe7a0" emissive="#ffb25a" emissiveIntensity={1.35} />
      </mesh>
      <mesh position={[0, 1.56, 0]}>
        <coneGeometry args={[0.15, 0.16, 8]} />
        <meshStandardMaterial color="#514536" roughness={0.8} />
      </mesh>
    </group>
  );
}

export function QuietHarbor({
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
      <mesh position={[0.88, 0.16, 1.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.82, 24]} />
        <meshStandardMaterial color="#7aa0b8" transparent opacity={0.72} roughness={0.25} />
      </mesh>
      <Tree position={[-1.65, 0.2, -1.18]} scale={0.74} />
      <Bush position={[1.52, 0.26, -1.32]} />
      <Flower position={[-0.72, 0.2, -1.35]} color="#d9c7a4" />
      <Lantern position={[-0.52, 0.2, 0.32]} />
      <Lantern position={[0.68, 0.2, -0.38]} />
      <PathDisc position={[0.35, 0.205, 0.55]} radius={0.18} />

      <TopicHotspot id="harbor-balance" label="ВНУТРЕННЕЕ РАВНОВЕСИЕ" position={[0, 0, -0.15]} {...hot("harbor-balance")}>
        <Lighthouse />
      </TopicHotspot>

      <TopicHotspot id="harbor-burnout" label="УСТАЛОСТЬ" position={[-1.15, 0, 0.7]} {...hot("harbor-burnout")}>
        <mesh position={[0, 0.32, 0]}>
          <boxGeometry args={[0.52, 0.38, 0.42]} />
          <meshStandardMaterial color="#efe0c8" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.56, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.44, 0.26, 4]} />
          <meshStandardMaterial color="#8d6a45" roughness={0.88} />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="harbor-me-time" label="ВРЕМЯ ДЛЯ СЕБЯ" position={[1.2, 0, 0.55]} {...hot("harbor-me-time")}>
        <Bench position={[0, 0, 0]} rotation={0.4} />
        <Book position={[0.12, 0.29, 0.02]} />
        <mesh position={[-0.14, 0.3, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.07, 10]} />
          <meshStandardMaterial color="#d7ecf4" roughness={0.3} />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="harbor-roles" label="БАЛАНС РОЛЕЙ" position={[1.05, 0, -0.85]} {...hot("harbor-roles")}>
        <PathDisc position={[0, 0.205, 0]} radius={0.32} color="#cbb48a" />
      </TopicHotspot>

      <TopicHotspot id="harbor-stress" label="СТРЕСС" position={[-1.1, 0, -0.8]} {...hot("harbor-stress")}>
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[0.34, 0.1, 0.2]} />
          <meshStandardMaterial color="#b88955" roughness={0.85} />
        </mesh>
        <Book position={[0.08, 0.33, 0]} color="#f7f2e8" />
      </TopicHotspot>

      <TopicHotspot id="harbor-help" label="ПОМОЩЬ" position={[0.2, 0, 1.3]} {...hot("harbor-help")}>
        <mesh position={[0, 0.21, 0.04]}>
          <boxGeometry args={[0.68, 0.05, 0.16]} />
          <meshStandardMaterial color="#8d6a45" roughness={0.85} />
        </mesh>
        <mesh position={[0.32, 0.23, -0.08]} rotation={[0.08, 0.55, 0.12]}>
          <boxGeometry args={[0.26, 0.05, 0.09]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
      </TopicHotspot>
    </group>
  );
}
