import { useQuery } from '@tanstack/react-query';

import getClientsSchedulesAction, {
  ParamsGetClientsSchedules,
} from '@/features/download-schedule/actions/get-clients-schedule';

export default function useGetClientsMonthluSchedule(
  props: ParamsGetClientsSchedules
) {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getClientsSchedulesAction(props),
    queryKey: ['get-clients-schedules', props],
  });

  return { data, error, isLoading };
}
