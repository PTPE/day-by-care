import Attendance from '@/features/dashboard/components/attendance';
import ClientInformation from '@/features/dashboard/components/client-information';
import ClientList from '@/features/dashboard/components/client-list';
import WeekSchedule from '@/features/dashboard/components/week-schedule';

export default function Dashboard() {
  return (
    <div className="space-y-5 pb-5 lg:mt-5">
      <ClientList />
      <ClientInformation />
      <WeekSchedule />
      <Attendance />
    </div>
  );
}
