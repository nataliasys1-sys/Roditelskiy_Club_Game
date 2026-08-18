import { ArrowLeft } from "lucide-react";
import { useJourney } from "../state/JourneyContext";

export function BackToMap() {
  const { backToMap } = useJourney();
  return (
    <button type="button" className="back-btn" onClick={backToMap} aria-label="Вернуться к карте">
      <ArrowLeft size={16} />
      К карте
    </button>
  );
}
