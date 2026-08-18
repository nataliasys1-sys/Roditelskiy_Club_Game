import type { TerritoryVisualProps } from "../../data/types";
import { Bench, Book, Bush, Flower, Lantern, PathDisc, Tree } from "../scene/primitives";
import { TopicHotspot } from "../scene/TopicHotspot";

function Cottage() {
  return (
    <group>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.82, 0.62, 0.68]} />
        <meshStandardMaterial color="#efe0c8" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.82, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.7, 0.42, 4]} />
        <meshStandardMaterial color="#6f8a4e" roughness={0.88} />
      </mesh>
      <mesh position={[0.42, 0.38, 0]}>
        <boxGeometry args={[0.03, 0.28, 0.22]} />
        <meshStandardMaterial color="#d7c09a" />
      </mesh>
      <mesh position={[0, 0.36, 0.35]}>
        <boxGeometry args={[0.18, 0.16, 0.02]} />
        <meshStandardMaterial color="#c9e0ee" emissive="#dceef6" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0.2, 0.24, 0.28]}>
        <boxGeometry args={[0.28, 0.08, 0.22]} />
        <meshStandardMaterial color="#e8d4b5" />
      </mesh>
    </group>
  );
}

export function HealthTerritory({
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
      <Tree position={[-1.78, 0.2, 0.08]} />
      <Tree position={[1.7, 0.2, 0.18]} scale={0.84} />
      <Tree position={[0.18, 0.2, 1.72]} scale={0.7} />
      <Bush position={[-0.68, 0.26, -1.62]} />
      <Bush position={[1.62, 0.26, 1.32]} />
      <Flower position={[-0.4, 0.2, 0.9]} />
      <Flower position={[0.55, 0.2, -0.2]} color="#e8c14a" />
      <Lantern position={[-0.48, 0.2, 0.12]} />
      <Lantern position={[0.52, 0.2, 0.38]} />
      <PathDisc position={[0, 0.205, 0.15]} radius={0.32} />

      <TopicHotspot id="health-sleep" label="СОН" position={[-1.15, 0, -0.85]} {...hot("health-sleep")}>
        <Cottage />
        <mesh position={[0.52, 0.98, -0.08]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#f4e3b0" emissive="#ffe7a0" emissiveIntensity={0.45} />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="health-nutrition" label="ПИТАНИЕ" position={[1.05, 0, -0.9]} {...hot("health-nutrition")}>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.68, 0.07, 0.68]} />
          <meshStandardMaterial color="#b88955" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.12, 10]} />
          <meshStandardMaterial color="#d7ecf4" roughness={0.35} />
        </mesh>
        <mesh position={[0.16, 0.3, 0.12]}>
          <sphereGeometry args={[0.065, 10, 10]} />
          <meshStandardMaterial color="#e25b4a" />
        </mesh>
        <mesh position={[-0.16, 0.3, -0.1]}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshStandardMaterial color="#e8c14a" />
        </mesh>
        <mesh position={[0.12, 0.3, -0.14]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color="#879b68" />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="health-movement" label="ДВИЖЕНИЕ" position={[1.2, 0, 0.75]} {...hot("health-movement")}>
        <PathDisc position={[0, 0.205, 0]} radius={0.42} color="#8faf68" />
        <mesh position={[0.18, 0.28, 0.05]}>
          <sphereGeometry args={[0.085, 12, 12]} />
          <meshStandardMaterial color="#f28a16" roughness={0.6} />
        </mesh>
        <mesh position={[-0.18, 0.3, -0.05]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.022, 8, 16]} />
          <meshStandardMaterial color="#514536" />
        </mesh>
      </TopicHotspot>

      <TopicHotspot
        id="health-emotion"
        label="ЭМОЦИОНАЛЬНОЕ СОСТОЯНИЕ"
        position={[-0.15, 0, 1.25]}
        {...hot("health-emotion")}
      >
        <Bench position={[0, 0, 0]} />
        <Book position={[-0.1, 0.29, 0.03]} color="#e8d4b5" />
      </TopicHotspot>

      <TopicHotspot id="health-digital" label="ЦИФРОВАЯ СРЕДА" position={[-1.2, 0, 0.55]} {...hot("health-digital")}>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.5, 0.07, 0.32]} />
          <meshStandardMaterial color="#c9a36a" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.38, -0.04]}>
          <boxGeometry args={[0.26, 0.18, 0.03]} />
          <meshStandardMaterial color="#8ea4b5" emissive="#c5dce8" emissiveIntensity={0.2} roughness={0.4} />
        </mesh>
      </TopicHotspot>

      <TopicHotspot id="health-routine" label="РЕЖИМ ДНЯ" position={[0.2, 0, -1.35]} {...hot("health-routine")}>
        <mesh position={[0, 0.42, 0]} rotation={[0.12, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.045, 20]} />
          <meshStandardMaterial color="#f4efe4" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.46, 0]}>
          <boxGeometry args={[0.018, 0.13, 0.018]} />
          <meshStandardMaterial color="#514536" />
        </mesh>
        <mesh position={[0.28, 0.32, 0.08]}>
          <boxGeometry args={[0.16, 0.22, 0.03]} />
          <meshStandardMaterial color="#efe0c8" />
        </mesh>
      </TopicHotspot>
    </group>
  );
}
