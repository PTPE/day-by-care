import { ServiceItem } from '@/features/client/types/service-items';

export type MonthlyClientSchedule = {
  schedule_id: string;
  client_name: string;
  address: string;
  service_items: ServiceItem[];
  year: number;
  month: number;
  time_slots: {
    date: number;
    day: number;
    start: {
      hours: number;
      minutes: number;
    };
    end: {
      hours: number;
      minutes: number;
    };
  }[];
};
