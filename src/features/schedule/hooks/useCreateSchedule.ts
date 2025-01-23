import { useMutation } from '@tanstack/react-query';

import createScheduleAction, {
  ParamsCreateSchedule,
} from '@/features/schedule/actions/create-schedule-action';

async function createMultipleSchedules(formData: ParamsCreateSchedule[]) {
  return Promise.all(formData.map((data) => createScheduleAction(data)));
}

export default function useCreateSchedule() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: createMultipleSchedules,
  });

  return { mutate, isPending, error };
}
