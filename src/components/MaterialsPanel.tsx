import { X } from "lucide-react";
import { TopicIcon } from "./TopicIcon";
import { MaterialCard } from "./MaterialCard";
import { useJourney } from "../state/JourneyContext";

export function MaterialsPanel({ asSheet = false }: { asSheet?: boolean }) {
  const { topic, materials, showAllMaterials, setShowAllMaterials, setMaterialsPanelOpen } =
    useJourney();
  if (!topic) return null;
  const visible = showAllMaterials ? materials : materials.slice(0, 4);

  return (
    <aside className={`panel materials-panel${asSheet ? " is-sheet" : ""}`} aria-label="Материалы и анонсы">
      <div className="materials-head">
        <div className="icon-chip">
          <TopicIcon name={topic.icon} />
        </div>
        <div style={{ flex: 1 }}>
          <h2>{topic.title}</h2>
          <p>Материалы и анонсы</p>
        </div>
        {asSheet && (
          <button
            type="button"
            className="back-btn"
            aria-label="Закрыть каталог"
            onClick={() => setMaterialsPanelOpen(false)}
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="material-list">
        {visible.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
      {!showAllMaterials && (
        <button type="button" className="cta" onClick={() => setShowAllMaterials(true)}>
          Смотреть все материалы
        </button>
      )}
    </aside>
  );
}
