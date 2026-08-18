import type { TerritoryVisualProps } from "../../data/types";
import { Flower, Lantern, PathDisc, Tree } from "../scene/primitives";
import { GlowPath, TopicHotspot } from "../scene/TopicHotspot";

const PATHS: Record<string, [number, number, number][]> = {
  "knowledge-motivation": [
    [0, 0.22, 1.7],
    [0.25, 0.22, 0.7],
    [0.7, 0.22, -0.1],
    [0.95, 0.22, -0.95],
  ],
  "knowledge-curiosity": [
    [0, 0.22, 1.7],
    [-0.4, 0.22, 0.6],
    [-0.85, 0.22, -0.1],
    [-1.05, 0.22, -0.7],
  ],
  "knowledge-mistakes": [
    [0, 0.22, 1.7],
    [0.45, 0.22, 0.85],
    [0.95, 0.22, 0.2],
    [1.15, 0.22, 0.55],
  ],
  "knowledge-creativity": [
    [0, 0.22, 1.7],
    [0.1, 0.22, 1.35],
    [-0.1, 0.22, 1.25],
    [-0.2, 0.22, 1.2],
  ],
  "knowledge-school": [
    [0, 0.22, 1.7],
    [-0.55, 0.22, 1.1],
    [-0.95, 0.22, 0.7],
    [-1.15, 0.22, 0.65],
  ],
  "knowledge-ai": [
    [0, 0.22, 1.7],
    [0.15, 0.22, 0.4],
    [0.2, 0.22, -0.6],
    [0.2, 0.22, -1.35],
  ],
};

function HedgeRing({ radius, y = 0.34 }: { radius: number; y?: number }) {
  const count = 28;
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * radius, y, Math.sin(a) * radius]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color={i % 2 ? "#6d8450" : "#587044"} roughness={0.95} />
          </mesh>
        );
      })}
    </group>
  );
}

export function KnowledgeMaze({
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
  const activePath = hoveredTopicId ?? selectedTopicId;

  return (
    <group>
      <HedgeRing radius={1.82} />
      {detailLevel === "territory" && <HedgeRing radius={1.12} y={0.32} />}
      <Tree position={[0, 0.2, 0]} scale={0.62} color="#4f6a3a" />
      <Lantern position={[0.14, 0.2, 1.5]} />
      <Flower position={[-1.55, 0.2, 0]} color="#e8c14a" />
      <Flower position={[1.5, 0.2, 0.2]} />
      <mesh position={[0, 0.3, 1.82]}>
        <boxGeometry args={[0.5, 0.32, 0.07]} />
        <meshStandardMaterial color="#b88955" roughness={0.85} />
      </mesh>
      <PathDisc position={[0, 0.205, 1.45]} radius={0.22} />

      {detailLevel === "territory" && activePath && PATHS[activePath] && (
        <GlowPath points={PATHS[activePath]} visible />
      )}

      <TopicHotspot id="knowledge-motivation" label="МОТИВАЦИЯ" position={[0.95, 0, -0.95]} {...hot("knowledge-motivation")}>
        <mesh position={[0, 0.28, 0]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial color="#f28a16" emissive="#ff9a2a" emissiveIntensity={0.35} />
        </mesh>
      </TopicHotspot>
      <TopicHotspot id="knowledge-curiosity" label="ЛЮБОЗНАТЕЛЬНОСТЬ" position={[-1.05, 0, -0.7]} {...hot("knowledge-curiosity")}>
        <mesh position={[0, 0.26, 0]}>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial color="#d9c7a4" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 0.1, 8]} />
          <meshStandardMaterial color="#8d6a45" />
        </mesh>
      </TopicHotspot>
      <TopicHotspot id="knowledge-mistakes" label="ОШИБКИ" position={[1.15, 0, 0.55]} {...hot("knowledge-mistakes")}>
        <mesh position={[0, 0.28, 0]} rotation={[0.25, 0.4, 0]}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#c48a3a" roughness={0.85} />
        </mesh>
      </TopicHotspot>
      <TopicHotspot id="knowledge-creativity" label="ТВОРЧЕСТВО" position={[-0.2, 0, 1.2]} {...hot("knowledge-creativity")}>
        <mesh position={[0, 0.28, 0]}>
          <coneGeometry args={[0.12, 0.24, 5]} />
          <meshStandardMaterial color="#d9795c" roughness={0.8} />
        </mesh>
      </TopicHotspot>
      <TopicHotspot id="knowledge-school" label="ШКОЛА" position={[-1.15, 0, 0.65]} {...hot("knowledge-school")}>
        <mesh position={[0, 0.32, 0]}>
          <boxGeometry args={[0.26, 0.2, 0.05]} />
          <meshStandardMaterial color="#f4efe4" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.04, 0.16, 0.04]} />
          <meshStandardMaterial color="#8d6a45" />
        </mesh>
      </TopicHotspot>
      <TopicHotspot id="knowledge-ai" label="ТЕХНОЛОГИИ И ИИ" position={[0.2, 0, -1.35]} {...hot("knowledge-ai")}>
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[0.2, 0.14, 0.2]} />
          <meshStandardMaterial color="#8ea4b5" emissive="#c5dce8" emissiveIntensity={0.22} />
        </mesh>
      </TopicHotspot>
    </group>
  );
}
