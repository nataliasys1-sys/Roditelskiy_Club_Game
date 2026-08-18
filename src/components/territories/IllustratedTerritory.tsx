import { useMemo, useState, type MouseEvent } from "react";
import { getTerritoryVisual } from "../../data/territoryVisuals";
import { useJourney } from "../../state/JourneyContext";

const ZOOM = 1.055;

export function IllustratedTerritory() {
  const {
    territory,
    selectedTopicId,
    hoveredTopicId,
    setHoveredTopic,
    selectTopic,
    reducedMotion,
  } = useJourney();
  const visual = territory ? getTerritoryVisual(territory.id) : undefined;
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [artFailed, setArtFailed] = useState(false);

  const topics = territory?.topics ?? [];
  const focusId = hoveredTopicId ?? selectedTopicId;
  const focus = visual?.hotspots.find((spot) => spot.topicId === focusId);
  const showArt = Boolean(territory?.visualAsset) && !artFailed;

  const moverStyle = useMemo(() => {
    const originX = focus ? `${focus.x}%` : "50%";
    const originY = focus ? `${focus.y}%` : "46%";
    const scale = !reducedMotion && focus ? ZOOM : 1;
    const px = reducedMotion ? 0 : parallax.x;
    const py = reducedMotion ? 0 : parallax.y;
    return {
      transform: `translate(${px}px, ${py}px) scale(${scale})`,
      transformOrigin: `${originX} ${originY}`,
    };
  }, [focus, parallax.x, parallax.y, reducedMotion]);

  if (!territory) return null;

  const aspect = visual
    ? `${visual.aspectWidth} / ${visual.aspectHeight}`
    : "3 / 2";

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const box = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - box.left) / box.width - 0.5;
    const ny = (event.clientY - box.top) / box.height - 0.5;
    setParallax({ x: nx * 8, y: ny * 6 });
  };

  return (
    <div className="journey-canvas illustrated-territory">
      <div
        className="illustrated-territory__frame"
        onMouseMove={onMove}
        onMouseLeave={() => setParallax({ x: 0, y: 0 })}
      >
        <div className="illustrated-territory__stage" style={{ aspectRatio: aspect }}>
          <div className="illustrated-territory__mover" style={moverStyle}>
            {showArt ? (
              <img
                className="illustrated-territory__art"
                src={`${territory.visualAsset}?v=diorama1`}
                alt=""
                draggable={false}
                onError={() => setArtFailed(true)}
              />
            ) : (
              <div className="illustrated-territory__placeholder" aria-hidden="true">
                <span>Тихая гавань</span>
                <small>Здесь появится иллюстрация территории</small>
              </div>
            )}

            {visual?.hotspots.map((spot) => {
              const on = spot.topicId === selectedTopicId || spot.topicId === hoveredTopicId;
              return (
                <span
                  key={`${spot.id}-glow`}
                  className={`diorama-zone${on ? " is-on" : ""}`}
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    width: `${spot.glowW ?? 16}%`,
                    height: `${spot.glowH ?? 16}%`,
                  }}
                />
              );
            })}

            {visual?.hotspots.map((spot) => {
              const index = topics.findIndex((topic) => topic.id === spot.topicId) + 1;
              const active = spot.topicId === selectedTopicId;
              const hovered = spot.topicId === hoveredTopicId;
              const open = active || hovered;
              const topic = topics.find((item) => item.id === spot.topicId);
              const labelSide = spot.x > 58 ? "left" : "right";

              return (
                <button
                  key={spot.id}
                  type="button"
                  className={`diorama-hotspot${active ? " is-active" : ""}${hovered ? " is-hover" : ""}`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  aria-label={topic?.title ?? spot.shortLabel}
                  aria-pressed={active}
                  onClick={() => selectTopic(spot.topicId)}
                  onMouseEnter={() => setHoveredTopic(spot.topicId)}
                  onMouseLeave={() => setHoveredTopic(null)}
                  onFocus={() => setHoveredTopic(spot.topicId)}
                  onBlur={() => setHoveredTopic(null)}
                >
                  <span className="diorama-hotspot__dot">{index || "·"}</span>
                  <span className={`diorama-hotspot__label is-${labelSide}${open ? " is-open" : ""}`}>
                    {spot.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
