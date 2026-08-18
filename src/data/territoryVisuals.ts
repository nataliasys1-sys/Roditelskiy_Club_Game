export interface TerritoryHotspot {
  id: string;
  topicId: string;
  x: number;
  y: number;
  shortLabel: string;
  glowW?: number;
  glowH?: number;
}

export interface TerritoryVisual {
  aspectWidth: number;
  aspectHeight: number;
  hotspots: TerritoryHotspot[];
}

/**
 * Layout for illustrated inner territories.
 * Coordinates are percentages of the visual asset, so the image can be
 * swapped without changing app logic.
 */
export const territoryVisuals: Record<string, TerritoryVisual> = {
  harbor: {
    aspectWidth: 1536,
    aspectHeight: 1024,
    hotspots: [
      {
        id: "harbor-spot-burnout",
        topicId: "harbor-burnout",
        x: 36.4,
        y: 51.2,
        shortLabel: "Усталость",
        glowW: 16,
        glowH: 16,
      },
      {
        id: "harbor-spot-me-time",
        topicId: "harbor-me-time",
        x: 51.8,
        y: 56.4,
        shortLabel: "Время для себя",
        glowW: 14,
        glowH: 13,
      },
      {
        id: "harbor-spot-roles",
        topicId: "harbor-roles",
        x: 47.2,
        y: 48.6,
        shortLabel: "Баланс ролей",
        glowW: 18,
        glowH: 14,
      },
      {
        id: "harbor-spot-stress",
        topicId: "harbor-stress",
        x: 35.8,
        y: 17.6,
        shortLabel: "Стресс",
        glowW: 12,
        glowH: 18,
      },
      {
        id: "harbor-spot-help",
        topicId: "harbor-help",
        x: 60.4,
        y: 71.2,
        shortLabel: "Помощь",
        glowW: 18,
        glowH: 16,
      },
      {
        id: "harbor-spot-balance",
        topicId: "harbor-balance",
        x: 73.2,
        y: 71.8,
        shortLabel: "Равновесие",
        glowW: 20,
        glowH: 16,
      },
    ],
  },
};

export function getTerritoryVisual(territoryId: string) {
  return territoryVisuals[territoryId];
}
