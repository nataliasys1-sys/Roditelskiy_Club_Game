import { territories } from "../../data/territories";
import { useJourney } from "../../state/JourneyContext";

const CX = 48.8;
const CY = 49.6;
const RX = 30.3;
const RY = 33.4;

function islandPoint(index: number) {
  const angle = -Math.PI / 2 + index * (Math.PI / 3);
  return {
    x: CX + Math.cos(angle) * RX,
    y: CY + Math.sin(angle) * RY,
  };
}

export function IllustratedMap() {
  const { hoveredTerritoryId, setHoveredTerritory, selectTerritory, explorePulse } = useJourney();

  return (
    <div className={`journey-canvas illustrated-map${explorePulse ? " is-pulse" : ""}`}>
      <div className="illustrated-map__stage">
        <img
          className="illustrated-map__art"
          src="/map/world-map.png?v=tabfix"
          alt=""
          draggable={false}
        />

        <svg className="illustrated-map__routes" viewBox="0 0 100 100" aria-hidden="true">
          {territories.map((territory) => {
            const point = islandPoint(territory.index);
            const active = hoveredTerritoryId === territory.id;
            return (
              <line
                key={territory.id}
                x1={CX}
                y1={CY}
                x2={point.x}
                y2={point.y}
                className={`illustrated-route${active ? " is-on" : ""}`}
              />
            );
          })}
        </svg>

        {territories.map((territory) => {
          const point = islandPoint(territory.index);
          const active = hoveredTerritoryId === territory.id;
          return (
            <button
              key={territory.id}
              type="button"
              className={`illu-hotspot${active ? " is-on" : ""}`}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              aria-label={`${territory.title}. ${territory.subtitle}`}
              onClick={() => selectTerritory(territory.id)}
              onMouseEnter={() => setHoveredTerritory(territory.id)}
              onMouseLeave={() => setHoveredTerritory(null)}
              onFocus={() => setHoveredTerritory(territory.id)}
              onBlur={() => setHoveredTerritory(null)}
            >
              <span className="illu-hotspot__lift" />
              <span className="illu-hotspot__glow" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
