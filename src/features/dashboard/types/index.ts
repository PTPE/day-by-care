export type ClientList = {
  clientId: string;
  clientName: string;
}[];

export type ClientsInfo = {
  [clientId: string]: {
    clientName: string;
    clientIcon: string;
    address: string;
    emergencyContactPhone: string;
    supervisorName: string;
    serviceItemIds: string[];
  };
};

export type ServiceTime = {
  [clientId: string]: {
    [date: string]: {
      startTime: string;
      endTime: string;
    }[];
  };
};

export type ThisWeekServiceClients = {
  clientList: ClientList;
  clientInfo: ClientsInfo;
  serviceTime: ServiceTime[];
};

export type Attendance = {
  startTime: string;
  endTime: string;
}[];
