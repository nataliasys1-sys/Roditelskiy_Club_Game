import { islandPosition, type Territory } from "./types";

export const territories: Territory[] = [
  {
    id: "bridges",
    index: 0,
    title: "Мосты понимания",
    subtitle: "Общение, доверие и понимание",
    description:
      "Эта территория помогает выстраивать тёплый диалог в семье: слышать эмоции ребёнка, бережно держать границы и сохранять доверие даже в сложные моменты.",
    accentColor: "#f28a16",
    mapPosition: islandPosition(0),
    topics: [
      { id: "bridges-emotions", title: "Эмоции ребёнка", icon: "heart", zoneOffset: [-1.15, 0, -0.85] },
      { id: "bridges-trust", title: "Доверие", icon: "handshake", zoneOffset: [0, 0, 0.1] },
      { id: "bridges-conflicts", title: "Конфликты", icon: "message-circle", zoneOffset: [1.2, 0, 0.7] },
      { id: "bridges-boundaries", title: "Границы", icon: "shield", zoneOffset: [1.05, 0, -0.9] },
      { id: "bridges-teens", title: "Подростки", icon: "users", zoneOffset: [-1.15, 0, 0.75] },
      { id: "bridges-values", title: "Семейные ценности", icon: "gem", zoneOffset: [0.15, 0, 1.35] },
    ],
  },
  {
    id: "health",
    index: 1,
    title: "Территория здоровья",
    subtitle: "Здоровье детей и полезные привычки",
    description:
      "Светлая и живая территория о здоровье детей: сон, питание, движение, эмоциональное состояние, цифровая среда и понятный ритм дня.",
    accentColor: "#879b68",
    mapPosition: islandPosition(1),
    topics: [
      { id: "health-sleep", title: "Сон", icon: "moon", zoneOffset: [-1.15, 0, -0.85] },
      { id: "health-nutrition", title: "Питание", icon: "apple", zoneOffset: [1.05, 0, -0.9] },
      { id: "health-movement", title: "Движение", icon: "bike", zoneOffset: [1.2, 0, 0.75] },
      { id: "health-emotion", title: "Эмоциональное состояние", icon: "heart-pulse", zoneOffset: [-0.15, 0, 1.25] },
      { id: "health-digital", title: "Цифровая среда", icon: "laptop", zoneOffset: [-1.2, 0, 0.55] },
      { id: "health-routine", title: "Режим дня", icon: "clock", zoneOffset: [0.2, 0, -1.35] },
    ],
  },
  {
    id: "traditions",
    index: 2,
    title: "Сад традиций",
    subtitle: "Семейные традиции и совместный досуг",
    description:
      "Сад помогает родителям создавать и беречь тёплые семейные моменты: праздники, ритуалы, связь поколений, совместный досуг и добрые дела.",
    accentColor: "#7d8150",
    mapPosition: islandPosition(2),
    topics: [
      { id: "traditions-holidays", title: "Семейные праздники", icon: "party-popper", zoneOffset: [0.1, 0, 0.15] },
      { id: "traditions-leisure", title: "Совместный досуг", icon: "book-open", zoneOffset: [1.2, 0, -0.7] },
      { id: "traditions-rituals", title: "Семейные ритуалы", icon: "flame", zoneOffset: [-1.15, 0, -0.55] },
      { id: "traditions-generations", title: "Связь поколений", icon: "users", zoneOffset: [-1.1, 0, 0.85] },
      { id: "traditions-deeds", title: "Добрые дела", icon: "heart-handshake", zoneOffset: [1.15, 0, 0.9] },
      { id: "traditions-dads", title: "Папин день", icon: "hammer", zoneOffset: [0.15, 0, -1.3] },
    ],
  },
  {
    id: "knowledge",
    index: 3,
    title: "Лабиринты знаний",
    subtitle: "Познание, игры и развитие",
    description:
      "Самостоятельный сад-лабиринт о любознательности, учёбе без давления, творчестве, школе и аккуратном знакомстве с технологиями.",
    accentColor: "#a66b2b",
    mapPosition: islandPosition(3),
    topics: [
      { id: "knowledge-motivation", title: "Мотивация к учёбе", icon: "sparkles", zoneOffset: [0.95, 0, -0.95] },
      { id: "knowledge-curiosity", title: "Любознательность", icon: "search", zoneOffset: [-1.05, 0, -0.7] },
      { id: "knowledge-mistakes", title: "Ошибки и самостоятельность", icon: "refresh-cw", zoneOffset: [1.15, 0, 0.55] },
      { id: "knowledge-creativity", title: "Творчество", icon: "palette", zoneOffset: [-0.2, 0, 1.2] },
      { id: "knowledge-school", title: "Школа", icon: "school", zoneOffset: [-1.15, 0, 0.65] },
      { id: "knowledge-ai", title: "Технологии и ИИ", icon: "cpu", zoneOffset: [0.2, 0, -1.35] },
    ],
  },
  {
    id: "masters",
    index: 4,
    title: "Город мастеров",
    subtitle: "Самоопределение и способности детей",
    description:
      "Миниатюрный город, где у каждого здания своё имя и смысл: лаборатория, мастерская, студия, сцена, технопарк и деловой квартал.",
    accentColor: "#c48a3a",
    mapPosition: islandPosition(4),
    topics: [
      { id: "masters-lab", title: "Лаборатория", icon: "flask-conical", zoneOffset: [-1.15, 0, -0.7] },
      { id: "masters-workshop", title: "Мастерская", icon: "hammer", zoneOffset: [1.15, 0, -0.7] },
      { id: "masters-studio", title: "Студия", icon: "paintbrush", zoneOffset: [-1.15, 0, 0.75] },
      { id: "masters-stage", title: "Сцена", icon: "drama", zoneOffset: [0.1, 0, 1.2] },
      { id: "masters-tech", title: "Технопарк", icon: "cpu", zoneOffset: [1.15, 0, 0.75] },
      { id: "masters-business", title: "Деловой квартал", icon: "briefcase", zoneOffset: [0.05, 0, -1.25] },
    ],
  },
  {
    id: "harbor",
    index: 5,
    title: "Тихая гавань",
    subtitle: "Ресурс родителя и время для себя",
    description:
      "Спокойная гавань с маяком — место, где родитель может остановиться, восстановить силы, распределить нагрузку и найти внутреннее равновесие.",
    accentColor: "#6a7d8f",
    mapPosition: islandPosition(5),
    visualAsset: "/territories/quiet-harbor.png",
    topics: [
      { id: "harbor-burnout", title: "Усталость и выгорание", icon: "battery-low", zoneOffset: [-1.15, 0, 0.7] },
      { id: "harbor-me-time", title: "Время для себя", icon: "book-open", zoneOffset: [1.2, 0, 0.55] },
      { id: "harbor-roles", title: "Баланс ролей", icon: "scale", zoneOffset: [1.05, 0, -0.85] },
      { id: "harbor-stress", title: "Стресс", icon: "cloud-rain", zoneOffset: [-1.1, 0, -0.8] },
      { id: "harbor-help", title: "Помощь и распределение ответственности", icon: "hand-helping", zoneOffset: [0.2, 0, 1.3] },
      { id: "harbor-balance", title: "Внутреннее равновесие", icon: "waves", zoneOffset: [0, 0, -0.15] },
    ],
  },
];

export function getTerritory(id: string) {
  return territories.find((item) => item.id === id);
}
