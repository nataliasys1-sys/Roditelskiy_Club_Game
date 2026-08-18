import { Canvas } from "@react-three/fiber";
import { WorldMap } from "./WorldMap";
import { IllustratedMap } from "./map/IllustratedMap";
import { IllustratedTerritory } from "./territories/IllustratedTerritory";
import { IntroPanel } from "./IntroPanel";
import { TerritoryView } from "./TerritoryView";
import { territories } from "../data/territories";
import { useJourney } from "../state/JourneyContext";

export function ClubJourney() {
  const { isMapView, selectTerritory, selectedTerritoryId } = useJourney();
  const illustratedInner = selectedTerritoryId === "harbor";

  return (
    <div className={`journey ${isMapView ? "is-map" : "is-territory"}`}>
      {isMapView ? (
        <IllustratedMap />
      ) : illustratedInner ? (
        <IllustratedTerritory />
      ) : (
        <div className="journey-canvas">
          <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: true }}
            camera={{ position: [0, 15.6, 12.4], fov: 30, near: 0.1, far: 90 }}
          >
            <WorldMap />
          </Canvas>
        </div>
      )}
      <div className="journey-overlay">
        {isMapView ? <IntroPanel /> : <TerritoryView />}
      </div>
      <ul className="sr-only">
        {territories.map((territory) => (
          <li key={territory.id}>
            <button
              type="button"
              aria-label={`${territory.title}. ${territory.subtitle}`}
              aria-current={selectedTerritoryId === territory.id ? "true" : undefined}
              onClick={() => selectTerritory(territory.id)}
            >
              {territory.title}
            </button>
            {!isMapView && selectedTerritoryId === territory.id && (
              <ul>
                {territory.topics.map((topic) => (
                  <li key={topic.id}>{topic.title}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
