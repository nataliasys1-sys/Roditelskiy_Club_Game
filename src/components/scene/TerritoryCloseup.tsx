import type { Territory } from "../../data/types";
import { MapTerritoryVisual } from "../map/MapDioramas";
import { TopicHotspot } from "./TopicHotspot";
import { useJourney } from "../../state/JourneyContext";

const CLOSEUP_SCALE = 1.58;

const TOPIC_POINTS: Record<string, Record<string, [number, number, number]>> = {
  bridges: {
    "bridges-trust": [0, 0, 0],
    "bridges-emotions": [-0.72, 0, -0.55],
    "bridges-conflicts": [0.7, 0, 0.55],
    "bridges-boundaries": [1.05, 0, -0.7],
    "bridges-teens": [-0.95, 0, 0.85],
    "bridges-values": [0.35, 0, 0.72],
  },
  health: {
    "health-sleep": [-0.45, 0, -0.35],
    "health-nutrition": [0.55, 0, -0.55],
    "health-movement": [0.7, 0, 0.55],
    "health-emotion": [0.1, 0, 1.05],
    "health-digital": [-0.85, 0, 0.7],
    "health-routine": [0.15, 0, -1.05],
  },
  traditions: {
    "traditions-holidays": [0, 0, 0.62],
    "traditions-leisure": [1.12, 0, -0.35],
    "traditions-rituals": [-0.45, 0, 0.85],
    "traditions-generations": [-1.15, 0, 0.35],
    "traditions-deeds": [0.95, 0, 0.85],
    "traditions-dads": [0.85, 0, -0.7],
  },
  knowledge: {
    "knowledge-creativity": [0, 0, 0],
    "knowledge-school": [0, 0, 1.48],
    "knowledge-motivation": [0.95, 0, -0.55],
    "knowledge-curiosity": [-0.85, 0, -0.55],
    "knowledge-mistakes": [0.82, 0, 0.55],
    "knowledge-ai": [0.12, 0, 1.22],
  },
  masters: {
    "masters-lab": [-0.85, 0, -0.55],
    "masters-workshop": [0.88, 0, -0.52],
    "masters-studio": [-0.88, 0, 0.62],
    "masters-stage": [0.05, 0, 0.95],
    "masters-tech": [0.9, 0, 0.58],
    "masters-business": [0.08, 0, -1.05],
  },
  harbor: {
    "harbor-balance": [-0.15, 0, -0.2],
    "harbor-burnout": [-0.95, 0, 0.45],
    "harbor-me-time": [0.55, 0, 0.95],
    "harbor-roles": [0.72, 0, -0.55],
    "harbor-stress": [-1.15, 0, -0.75],
    "harbor-help": [0.82, 0, 0.45],
  },
};

export function TerritoryCloseup({ territory }: { territory: Territory }) {
  const { selectedTopicId, hoveredTopicId, setHoveredTopic, selectTopic } = useJourney();
  const points = TOPIC_POINTS[territory.id] ?? {};

  return (
    <group scale={CLOSEUP_SCALE}>
      <MapTerritoryVisual id={territory.id} highlighted={false} />
      {territory.topics.map((topic) => {
        const point = points[topic.id] ?? topic.zoneOffset;
        return (
          <TopicHotspot
            key={topic.id}
            id={topic.id}
            label={topic.title}
            position={point}
            active={selectedTopicId === topic.id}
            hovered={hoveredTopicId === topic.id}
            detailLevel="territory"
            onHover={setHoveredTopic}
            onSelect={selectTopic}
          >
            <mesh position={[0, 0.32, 0]}>
              <sphereGeometry args={[0.32, 10, 10]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
          </TopicHotspot>
        );
      })}
    </group>
  );
}
