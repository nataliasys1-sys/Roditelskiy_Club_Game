import type { Material, MaterialType } from "../data/types";

const TYPE_LABEL: Record<MaterialType, string> = {
  event: "Событие",
  article: "Статья",
  checklist: "Чек-лист",
  recording: "Запись",
};

export function MaterialCard({ material }: { material: Material }) {
  const meta = [material.date, material.duration].filter(Boolean).join(" · ");
  return (
    <a className="material-card" href={material.href ?? "#"} onClick={(e) => e.preventDefault()}>
      <div className={`material-thumb thumb-${material.type}`}>
        <span>{TYPE_LABEL[material.type]}</span>
      </div>
      <div>
        <h3>{material.title}</h3>
        {meta && <p>{meta}</p>}
      </div>
    </a>
  );
}
