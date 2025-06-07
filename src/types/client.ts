export type Client = {
  clientId: string;
  clientName: string;
  clientIcon: string;
  address: string;
  emergencyContactPhone: string;
  supervisorName: string;
  serviceItemIds: string[];
};

export type Schedule = {
  clientId: string;
  clientName: string;
  serviceTime: ServiceTime[];
};

export type ServiceTime = {
  date: string;
  start: string;
  end: string;
};
