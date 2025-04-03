export const routes = {
  Homepage: () => '/',
  Dashboard: () => '/dashboard',
  Clients: () => '/dashboard/clients',
  Reports: () => '/dashboard/reports',
  NewClients: () => '/dashboard/clients/create',
  Client: ({ id }: { id: string }) => `/dashboard/clients/${id}`,
  CreateSchedule: () => '/dashboard/schedule/create',
  Schedule: ({ id }: { id: string }) => `/dashboard/schedule/${id}`,
};

export default routes;
