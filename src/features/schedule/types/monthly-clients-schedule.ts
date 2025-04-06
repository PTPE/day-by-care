export type MonthlyClientsSchedule = {
  year: number;
  month: number;
  schedules: {
    client_id: string;
    time_slots: {
      day: number;
      time_range: {
        start: {
          hour: number;
          minute: number;
        };
        end: {
          hour: number;
          minute: number;
        };
      }[];
    }[];
  }[];
};
