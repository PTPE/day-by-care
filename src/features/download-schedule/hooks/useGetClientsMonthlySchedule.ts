import { useQuery } from '@tanstack/react-query';

import getClientsSchedulesAction from '@/features/download-schedule/actions/get-clients-schedule';

type Props = {
  scheduleIds: string[];
  enabled?: boolean;
};

export default function useGetClientsMonthluSchedule({
  scheduleIds,
  enabled,
}: Props) {
  const { data, error, isLoading, refetch } = useQuery({
    queryFn: () => getClientsSchedulesAction({ scheduleIds }),
    queryKey: ['get-clients-schedules', scheduleIds, enabled],
    enabled: enabled && scheduleIds.length > 0,
  });

  return { data, error, isLoading, refetch };
}
