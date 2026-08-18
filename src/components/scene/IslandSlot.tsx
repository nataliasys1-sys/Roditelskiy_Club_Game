import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, type Group } from "three";
import type { Territory } from "../../data/types";
import { MapTerritoryVisual } from "../map/MapDioramas";
import { useJourney } from "../../state/JourneyContext";
import { TerritoryCloseup } from "./TerritoryCloseup";

export function IslandSlot({ territory }: { territory: Territory }) {
  const {
    isMapView,
    selectedTerritoryId,
    hoveredTerritoryId,
    selectTerritory,
    setHoveredTerritory,
  } = useJourney();

  const selected = selectedTerritoryId === territory.id;
  const highlighted = hoveredTerritoryId === territory.id || selected;
  const showLabel = isMapView && hoveredTerritoryId === territory.id;
  const lift = useRef<Group>(null);

  if (!isMapView && !selected) return null;

  useFrame((_, delta) => {
    if (!lift.current) return;
    const y = isMapView && highlighted ? 0.08 : 0;
    lift.current.position.y = MathUtils.damp(lift.current.position.y, y, 8, delta);
  });

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    selectTerritory(territory.id);
  };

  return (
    <group position={isMapView ? territory.mapPosition : [0, 0, 0]}>
      <group
        ref={lift}
        onClick={isMapView ? onClick : undefined}
        onPointerOver={
          isMapView
            ? (event) => {
                event.stopPropagation();
                setHoveredTerritory(territory.id);
                document.body.style.cursor = "pointer";
              }
            : undefined
        }
        onPointerOut={
          isMapView
            ? () => {
                setHoveredTerritory(null);
                document.body.style.cursor = "auto";
              }
            : undefined
        }
      >
        {isMapView ? (
          <MapTerritoryVisual id={territory.id} highlighted={highlighted} />
        ) : (
          <TerritoryCloseup territory={territory} />
        )}
      </group>
      {showLabel && (
        <Html position={[0, 2.05, 0]} center distanceFactor={18} zIndexRange={[20, 0]} occlude={false}>
          <div className="island-label">
            <b>
              {territory.index + 1} {territory.title}
            </b>
            <span>{territory.subtitle}</span>
          </div>
        </Html>
      )}
    </group>
  );
}
