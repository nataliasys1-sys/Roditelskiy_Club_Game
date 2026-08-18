import type { TerritoryVisualProps } from "../../data/types";
import { Bench, Book, Bush, Flower, Lantern, PathDisc, RoundTable, Tree } from "../scene/primitives";
import { TopicHotspot } from "../scene/TopicHotspot";

function GrandTree() {
  return (
    <group>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.11, 0.17, 0.72, 8]} />
        <meshStandardMaterial color="#7a5a3a" roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.98, 0]}>
        <sphereGeometry args={[0.7, 14, 14]} />
        <meshStandardMaterial color="#5f7344" roughness={0.95} />
      </mesh>
      <mesh position={[0.34, 1.08, 0.18]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial color="#6d8450" roughness={0.95} />
      </mesh>
      <mesh position={[-0.28, 1.12, -0.14]}>
        <sphereGeometry args={[0.36, 12, 12]} />
        <meshStandardMaterial color="#708a52" roughness={0.95} />
      </mesh>
    </group>
  );
}

export function TraditionGarden({
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
      <Tree position={[-1.78, 0.2, -0.18]} scale={0.8} />
      <Tree position={[1.7, 0.2, 0.12]} scale={0.74} />
      <Bush position={[-1.55, 0.26, 1.42]} />
      <Bush position={[1.58, 0.26, -1.38]} />
      <Flower position={[-0.7, 0.2, 1.15]} color="#e67a4a" />
      <Flower position={[0.82, 0.2, 1.05]} color="#f2c38a" />
      <Flower position={[0.4, 0.2, -0.55]} />
      <Lantern position={[-0.42, 0.2, 0.68]} />
      <Lantern position={[0.52, 0.2, 0.62]} />
      <Lantern position={[0.68, 0.2, -0.52]} />
      <PathDisc position={[0.55, 0.205, 0.05]} radius={0.2} />

      <TopicHotspot id="traditions-holidays" label="ПРАЗДНИКИ" position={[0.1, 0, 0.15]} {...hot("traditions-holidays")}>
        <GrandTree />
        <RoundTable position={[0, 0, 0.55]} />
        <mesh position={[-0.12, 0.28, 0.5]}>
          <cylinderGeometry args={[0.04, 0.04, 0.05, 8]} />
          <meshStandardMaterial color="#f4efe4" />
        </mesh>
        <mesh position={[0.14, 0.28, 0.62]}>
          <cylinderGeometry args={[0.035, 0.035, 0.05, 8]} />
          <meshStandardMaterial color="#e8d4b5" />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="traditions-leisure" label="ДОСУГ" position={[1.2, 0, -0.7]} {...hot("traditions-leisure")}>
        <Bench position={[0, 0, 0]} rotation={-0.4} />
        <Book position={[0.08, 0.29, 0.02]} />
        <mesh position={[0.32, 0.32, -0.12]}>
          <boxGeometry args={[0.14, 0.26, 0.06]} />
          <meshStandardMaterial color="#d9c7a4" roughness={0.85} />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="traditions-rituals" label="РИТУАЛЫ" position={[-1.15, 0, -0.55]} {...hot("traditions-rituals")}>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.36, 0.07, 0.36]} />
          <meshStandardMaterial color="#a67c52" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.028, 0.036, 0.14, 8]} />
          <meshStandardMaterial color="#f4efe4" emissive="#ffe0a0" emissiveIntensity={0.65} />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="traditions-generations" label="ПОКОЛЕНИЯ" position={[-1.1, 0, 0.85]} {...hot("traditions-generations")}>
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[0.48, 0.14, 0.2]} />
          <meshStandardMaterial color="#c4a07a" roughness={0.88} />
        </mesh>
        <Book position={[-0.08, 0.35, 0.02]} color="#efe0c8" />
        <Book position={[0.1, 0.36, -0.02]} rotation={0.3} color="#d9c7a4" />
      </TopicHotspot>

      <TopicHotspot id="traditions-deeds" label="ДОБРЫЕ ДЕЛА" position={[1.15, 0, 0.9]} {...hot("traditions-deeds")}>
        <mesh position={[0, 0.32, 0]}>
          <boxGeometry args={[0.07, 0.38, 0.07]} />
          <meshStandardMaterial color="#8d6a45" />
        </mesh>
        <mesh position={[0, 0.54, 0.02]}>
          <boxGeometry args={[0.26, 0.14, 0.02]} />
          <meshStandardMaterial color="#f4efe4" />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="traditions-dads" label="ПАПИН ДЕНЬ" position={[0.15, 0, -1.3]} {...hot("traditions-dads")}>
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.5, 0.09, 0.28]} />
          <meshStandardMaterial color="#8d6a45" roughness={0.85} />
        </mesh>
        <mesh position={[0.1, 0.34, 0]}>
          <boxGeometry args={[0.14, 0.12, 0.12]} />
          <meshStandardMaterial color="#d9c7a4" />
        </mesh>
      </TopicHotspot>
    </group>
  );
}
