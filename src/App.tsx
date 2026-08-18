import { ClubJourney } from "./components/ClubJourney";
import { JourneyProvider } from "./state/JourneyContext";
import "./styles/journey.css";

export default function App() {
  return (
    <JourneyProvider>
      <ClubJourney />
    </JourneyProvider>
  );
}
