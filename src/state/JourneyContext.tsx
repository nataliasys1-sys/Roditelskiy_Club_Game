import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getMaterials } from "../data/materials";
import { getTerritory, territories } from "../data/territories";
import type { Material, Territory, Topic } from "../data/types";

interface JourneyState {
  selectedTerritoryId: string | null;
  selectedTopicId: string | null;
  hoveredTerritoryId: string | null;
  hoveredTopicId: string | null;
  materialsPanelOpen: boolean;
  showAllMaterials: boolean;
  explorePulse: boolean;
  reducedMotion: boolean;
  isMapView: boolean;
  territory: Territory | undefined;
  topic: Topic | undefined;
  materials: Material[];
  selectTerritory: (id: string) => void;
  selectTopic: (id: string) => void;
  backToMap: () => void;
  setHoveredTerritory: (id: string | null) => void;
  setHoveredTopic: (id: string | null) => void;
  setMaterialsPanelOpen: (open: boolean) => void;
  setShowAllMaterials: (open: boolean) => void;
  pulseExplore: () => void;
}

const JourneyContext = createContext<JourneyState | null>(null);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [selectedTerritoryId, setSelectedTerritoryId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [hoveredTerritoryId, setHoveredTerritory] = useState<string | null>(null);
  const [hoveredTopicId, setHoveredTopic] = useState<string | null>(null);
  const [materialsPanelOpen, setMaterialsPanelOpen] = useState(false);
  const [showAllMaterials, setShowAllMaterials] = useState(false);
  const [explorePulse, setExplorePulse] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const territory = selectedTerritoryId ? getTerritory(selectedTerritoryId) : undefined;
  const topic =
    territory?.topics.find((item) => item.id === selectedTopicId) ?? territory?.topics[0];
  const materials = topic ? getMaterials(topic.id) : [];

  const selectTerritory = useCallback((id: string) => {
    const next = getTerritory(id);
    setSelectedTerritoryId(id);
    setSelectedTopicId(next?.topics[0]?.id ?? null);
    setHoveredTerritory(null);
    setShowAllMaterials(false);
    setMaterialsPanelOpen(true);
  }, []);

  const selectTopic = useCallback((id: string) => {
    setSelectedTopicId(id);
    setShowAllMaterials(false);
    setMaterialsPanelOpen(true);
  }, []);

  const backToMap = useCallback(() => {
    setSelectedTerritoryId(null);
    setSelectedTopicId(null);
    setHoveredTopic(null);
    setMaterialsPanelOpen(false);
    setShowAllMaterials(false);
  }, []);

  const pulseExplore = useCallback(() => {
    setExplorePulse(true);
    window.setTimeout(() => setExplorePulse(false), prefersReducedMotion() ? 80 : 1200);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") backToMap();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [backToMap]);

  const value = useMemo<JourneyState>(
    () => ({
      selectedTerritoryId,
      selectedTopicId: topic?.id ?? null,
      hoveredTerritoryId,
      hoveredTopicId,
      materialsPanelOpen,
      showAllMaterials,
      explorePulse,
      reducedMotion,
      isMapView: selectedTerritoryId === null,
      territory,
      topic,
      materials,
      selectTerritory,
      selectTopic,
      backToMap,
      setHoveredTerritory,
      setHoveredTopic,
      setMaterialsPanelOpen,
      setShowAllMaterials,
      pulseExplore,
    }),
    [
      selectedTerritoryId,
      topic,
      hoveredTerritoryId,
      hoveredTopicId,
      materialsPanelOpen,
      showAllMaterials,
      explorePulse,
      reducedMotion,
      territory,
      materials,
      selectTerritory,
      selectTopic,
      backToMap,
      pulseExplore,
    ],
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used within JourneyProvider");
  return ctx;
}

export { territories };
