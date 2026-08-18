import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { getTerritory } from "../../data/territories";
import { useJourney } from "../../state/JourneyContext";

const MAP_POS = new Vector3(0, 15.6, 12.4);
const MAP_LOOK = new Vector3(0, 0.05, 0.12);

export function CameraRig() {
  const { camera } = useThree();
  const { isMapView, selectedTerritoryId, reducedMotion, explorePulse } = useJourney();
  const look = useRef(MAP_LOOK.clone());
  const pulse = useRef(0);

  const goal = useMemo(() => {
    if (isMapView || !selectedTerritoryId) {
      return { pos: MAP_POS.clone(), look: MAP_LOOK.clone() };
    }
    const island = getTerritory(selectedTerritoryId);
    if (!island) return { pos: MAP_POS.clone(), look: MAP_LOOK.clone() };
    return {
      pos: new Vector3(0.1, 5.7, 6.55),
      look: new Vector3(0, 0.22, 0.02),
    };
  }, [isMapView, selectedTerritoryId]);

  useFrame((_, delta) => {
    const speed = reducedMotion ? 40 : 2.15;
    camera.position.x = MathUtils.damp(camera.position.x, goal.pos.x, speed, delta);
    camera.position.y = MathUtils.damp(camera.position.y, goal.pos.y, speed, delta);
    camera.position.z = MathUtils.damp(camera.position.z, goal.pos.z, speed, delta);
    look.current.x = MathUtils.damp(look.current.x, goal.look.x, speed, delta);
    look.current.y = MathUtils.damp(look.current.y, goal.look.y, speed, delta);
    look.current.z = MathUtils.damp(look.current.z, goal.look.z, speed, delta);

    if (explorePulse && isMapView) {
      pulse.current = Math.min(1, pulse.current + delta * 2);
      camera.position.y = goal.pos.y - Math.sin(pulse.current * Math.PI) * 0.35;
    } else {
      pulse.current = 0;
    }
    camera.lookAt(look.current);
  });

  return null;
}
