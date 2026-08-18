import { Compass as CompassIcon } from "lucide-react";
import { BackToMap } from "./BackToMap";
import { TerritoryInfo } from "./TerritoryInfo";
import { TopicSelector } from "./TopicSelector";
import { MaterialsPanel } from "./MaterialsPanel";
import { useJourney } from "../state/JourneyContext";

export function TerritoryView() {
  const { territory, topic, materialsPanelOpen, setMaterialsPanelOpen } = useJourney();
  if (!territory) return null;

  return (
    <>
      <div className="top-nav">
        <div className="top-nav-left">
          <BackToMap />
          <span className="brand-kicker">ГК НОВАРД</span>
        </div>
      </div>
      <nav className="breadcrumb" aria-label="Навигация">
        <CompassIcon className="compass-mini" size={18} />
        <span>Карта</span>
        <span>/</span>
        <strong>{territory.title}</strong>
        {topic && (
          <>
            <span>/</span>
            <span>{topic.title}</span>
          </>
        )}
      </nav>
      <aside className="panel territory-panel">
        <h1 className="brand-title">
          Семейный Компас
        </h1>
        <p className="brand-subtitle">Путешествие по Родительскому клубу</p>
        <TerritoryInfo />
        <TopicSelector />
      </aside>
      <div className="desktop-materials">
        <MaterialsPanel />
      </div>
      {materialsPanelOpen && (
        <>
          <button
            type="button"
            className="sheet-scrim mobile-only"
            aria-label="Закрыть каталог"
            onClick={() => setMaterialsPanelOpen(false)}
          />
          <div className="mobile-only">
            <MaterialsPanel asSheet />
          </div>
        </>
      )}
    </>
  );
}
