import { ServiceItem } from './service-items';

export type Client = {
  client_id: string;
  userId: string;
  clientName: string;
  supervisorName: string;
  address: string;
  serviceItems: ServiceItem[];
  createdAt: string;
  supervisorPhone: string;
  officePhone: string;
  emergencyContact: string;
  emergencyContactPhone: string;
  clientIcon: string;
  birthday: string | null;
};

export type ClientPreview = Pick<
  Client,
  'client_id' | 'clientName' | 'supervisorName' | 'clientIcon'
>;
