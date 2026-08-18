import { ArrowRight } from "lucide-react";
import { useJourney } from "../state/JourneyContext";

export function IntroPanel() {
  const { pulseExplore } = useJourney();
  return (
    <aside className="panel intro-panel" aria-label="Семейный Компас">
      <span className="brand-kicker">ГК НОВАРД</span>
      <h1 className="brand-title">
        Семейный
        <span>Компас</span>
      </h1>
      <p className="brand-subtitle">Путешествие по Родительскому клубу</p>
      <p className="lead">
        Выберите любую территорию и исследуйте темы, материалы и анонсы в удобном для вас темпе.
      </p>
      <p className="meta-line">6 территорий · материалы · встречи · записи · полезные подборки</p>
      <button type="button" className="cta" onClick={pulseExplore}>
        Исследовать клуб
        <ArrowRight size={16} />
      </button>
    </aside>
  );
}
