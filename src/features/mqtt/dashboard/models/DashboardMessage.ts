export type DashboardStatus =
  | "требуется вмешательство"
  | "удовлетворительно"
  | "хорошо"
  | "вмешательств не требуется";

export type DashboardIntervention = "температура" | "влажность";

export interface DashboardMessage {
  id: string;
  status: DashboardStatus;
  value: number;
  intervention: DashboardIntervention;
  interventionMinutes: number;
  createdAt: Date;
}
