
export interface Session {
  id: string;
  name: string;
  model: string;
  startedAt: Date;
  duration: string;
  status: "active" | "completed" | "failed" | "pending";
  user: string;
  changes: number;
}
