import { ServiceItem } from './service-items';

export type Client = {
  id: string;
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
  birthday: string;
};

export type ClientPreview = Pick<
  Client,
  'id' | 'clientName' | 'supervisorName' | 'clientIcon'
>;
