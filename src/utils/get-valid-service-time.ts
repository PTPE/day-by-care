export function getValidServiceTime({
  date,
  service_start_time,
  service_end_time,
}: {
  date: string;
  service_start_time: string;
  service_end_time: string;
}) {
  const start = new Date(`${date} ${service_start_time}`);
  const end = new Date(`${date} ${service_end_time}`);

  if (!service_start_time && !service_end_time) {
    return true;
  }

  return start < end;
}
