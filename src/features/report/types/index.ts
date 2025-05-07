export type ClientServiceSummary = {
  clientId: string;
  clientName: string;
  clientIcon: string;
  totalServiceHours: number;
  serviceItemIds: string[];
  serviceItemIdDays: number;
};

export type ClientServiceLogPerDay = {
  clientId: string;
  clientName: string;
  scheduleId: string;
  date: string;
  serviceTotalHours: number;
  serviceTime: {
    startTime: string;
    endTime: string;
  }[];
};
