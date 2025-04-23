export const routes = {
  Homepage: () => '/',
  Dashboard: () => '/dashboard',
  Clients: () => '/dashboard/clients',
  Reports: () => '/dashboard/reports',
  NewClients: () => '/dashboard/clients/create',
  Client: ({ id }: { id: string }) => `/dashboard/clients/${id}`,
  CreateSchedule: () => '/dashboard/schedule/create',
  DownloadSchedule: () => '/dashboard/schedule/download',
  Schedule: ({ id }: { id: string }) => `/dashboard/schedule/${id}`,
  Settings: () => '/dashboard/settings',
};

export default routes;
