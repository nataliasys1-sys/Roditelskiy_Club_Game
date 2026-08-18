export type MaterialType = "event" | "article" | "checklist" | "recording";
export type Vec3 = [number, number, number];
export type DetailLevel = "map" | "territory";

export interface Material {
  id: string;
  type: MaterialType;
  title: string;
  description?: string;
  date?: string;
  duration?: string;
  image?: string;
  href?: string;
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  zoneOffset: Vec3;
}

export interface Territory {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  mapPosition: Vec3;
  topics: Topic[];
  /** Premium 2.5D illustration for the inner territory scene. */
  visualAsset?: string;
}

export interface TerritoryVisualProps {
  id: string;
  detailLevel: DetailLevel;
  selectedTopicId: string | null;
  hoveredTopicId: string | null;
  onTopicHover: (id: string | null) => void;
  onTopicSelect: (id: string) => void;
}

export const ISLAND_RADIUS = 2.18;
export const ORBIT_RADIUS = 4.72;

export function islandPosition(index: number): Vec3 {
  const angle = -Math.PI / 2 + index * (Math.PI / 3);
  return [Math.cos(angle) * ORBIT_RADIUS, 0, Math.sin(angle) * ORBIT_RADIUS];
}
