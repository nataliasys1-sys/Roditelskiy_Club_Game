import { ContactShadows, Line } from "@react-three/drei";
import { Compass } from "./Compass";
import { CameraRig } from "./scene/CameraRig";
import { Ground, Lights } from "./scene/primitives";
import { IslandSlot } from "./scene/IslandSlot";
import { territories } from "../data/territories";
import { useJourney } from "../state/JourneyContext";

export function WorldMap() {
  const { hoveredTerritoryId, isMapView } = useJourney();
  const hovered = territories.find((item) => item.id === hoveredTerritoryId);

  return (
    <>
      <Lights map={isMapView} />
      <Ground map={isMapView} />
      <CameraRig />
      <Compass />
      {isMapView && (
        <ContactShadows position={[0, -0.46, 0]} opacity={0.18} scale={18} blur={2.4} far={3} color="#b89a6e" />
      )}
      {isMapView && hovered && (
        <Line
          points={[
            [0, 0.42, 0],
            [hovered.mapPosition[0] * 0.28, 0.48, hovered.mapPosition[2] * 0.28],
            hovered.mapPosition,
          ]}
          color="#f28a16"
          lineWidth={1.8}
          transparent
          opacity={0.8}
        />
      )}
      {territories.map((territory) => (
        <IslandSlot key={territory.id} territory={territory} />
      ))}
    </>
  );
}
