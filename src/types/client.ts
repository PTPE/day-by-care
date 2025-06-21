export type ServiceItemIds =
  | 'BA01'
  | 'BA02'
  | 'BA03'
  | 'BA04'
  | 'BA05'
  | 'BA07'
  | 'BA10'
  | 'BA11'
  | 'BA12'
  | 'BA13'
  | 'BA14'
  | 'BA15-1'
  | 'BA15-2'
  | 'BA16-1'
  | 'BA16-2'
  | 'BA17'
  | 'BA18'
  | 'BA20'
  | 'BA22'
  | 'BA23'
  | 'BA24';

export type IncomeCategory = 'low' | 'mid-low' | 'general';

export type CMS = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

export type Client = {
  clientId: string;
  clientName: string;
  clientIcon: string;
  birthday: string;
  address: string;
  emergencyContact: string;
  emergencyContactPhone: string;
  supervisorName: string;
  supervisorPhone: string;
  serviceItemIds: ServiceItemIds[];
  officePhone: string;
  incomeCategory: IncomeCategory;
  cms: CMS;
  isHighRisk: boolean;
};

export type Schedule = {
  clientId: string;
  clientName: string;
  serviceTime: ServiceTime[];
};

export type ServiceTime = {
  date: string;
  start: string | null;
  end: string | null;
};
