import { useJourney } from "../state/JourneyContext";

export function TerritoryInfo() {
  const { territory } = useJourney();
  if (!territory) return null;

  return (
    <section aria-labelledby="territory-title">
      <div className="territory-index">
        <span className="num">{territory.index + 1}</span>
        <div>
          <h2 id="territory-title" className="territory-name">
            {territory.title}
          </h2>
          <p className="territory-sub">{territory.subtitle}</p>
        </div>
      </div>
      <p className="lead">{territory.description}</p>
    </section>
  );
}
