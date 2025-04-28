import { useQuery } from '@tanstack/react-query';

import {
  getMonthlyClientsScheduleAction,
  ParamsGetMonthlyClientsSchedule,
} from '@/features/schedule/actions/get-monthly-clients-schedule-action';

export default function useGetMonthlySchedules(
  props: ParamsGetMonthlyClientsSchedule
) {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getMonthlyClientsScheduleAction(props),
    queryKey: ['monthly-schedules', props],
  });

  return { data, error, isLoading };
}
