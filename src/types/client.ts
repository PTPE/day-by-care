export type Client = {
  [clientId: string]: {
    clientName: string;
    clientIcon: string;
    address: string;
    emergencyContactPhone: string;
    supervisorName: string;
    serviceItemIds: string[];
  };
};
