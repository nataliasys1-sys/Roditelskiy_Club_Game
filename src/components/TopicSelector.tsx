import { TopicIcon } from "./TopicIcon";
import { useJourney } from "../state/JourneyContext";

export function TopicSelector() {
  const { territory, selectedTopicId, selectTopic } = useJourney();
  if (!territory) return null;

  return (
    <div>
      <p className="section-label">Темы территории</p>
      <div className="topic-grid" role="list">
        {territory.topics.map((topic) => {
          const active = topic.id === selectedTopicId;
          return (
            <button
              key={topic.id}
              type="button"
              role="listitem"
              className={`topic-btn${active ? " is-active" : ""}`}
              aria-pressed={active}
              aria-label={topic.title}
              onClick={() => selectTopic(topic.id)}
            >
              <TopicIcon name={topic.icon} size={16} />
              {topic.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
