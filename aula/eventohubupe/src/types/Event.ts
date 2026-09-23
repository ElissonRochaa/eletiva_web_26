export interface Event {
  id: number;
  title: string;
  day: string;
  month: string;
  location: string;
  campus: "Recife" | "Garanhuns";
  description: string;
  startTime: string;
  endTime: string;
  totalSpots: number;
  availableSpots: number;
}

export interface Registration {
  eventId: number;
  registeredAt: string;
}