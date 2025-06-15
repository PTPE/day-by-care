export type ClientServiceSummary = {
  clientId: string;
  clientName: string;
  clientIcon: string;
  totalServiceHours: number;
  serviceItemIds: string[];
  serviceItemIdDays: number;
};

export type ServiceLog = {
  clientId: string;
  clientName: string;
  date: string;
  serviceTotalHours: number;
  serviceTime: {
    startTime: string;
    endTime: string;
  }[];
};
